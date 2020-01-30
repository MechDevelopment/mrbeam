function point(x, def = [0, 0, 0], load = 0, moment = 0, joint = false) {
    return { x, def, load, moment, joint };
  }
  
  function element(points, distload = null, mat = { E: 1, J: 1, A: 1 }) {
    const len = length(points);
    const loc = local(len, mat);
    const f = rightPart(len, distload);
    return { points, distload, mat, len, loc, f };
  }
  
  function length(points) {
    return points[1].x - points[0].x;
  }
  
  function local(l, mat) {
    const EJ = mat.E * mat.J;
    return [
      [
        (1 / l ** 3) * (EJ * 12),
        (1 / l ** 2) * (EJ * 6),
        (1 / l ** 3) * (EJ * -12),
        (1 / l ** 2) * (EJ * 6)
      ],
      [
        (1 / l ** 2) * (EJ * 6),
        (1 / l ** 1) * (EJ * 4),
        (1 / l ** 2) * (EJ * -6),
        (1 / l ** 1) * (EJ * 2)
      ],
      [
        (1 / l ** 3) * (EJ * -12),
        (1 / l ** 2) * (EJ * -6),
        (1 / l ** 3) * (EJ * 12),
        (1 / l ** 2) * (EJ * -6)
      ],
      [
        (1 / l ** 2) * (EJ * 6),
        (1 / l ** 1) * (EJ * 2),
        (1 / l ** 2) * (EJ * -6),
        (1 / l ** 1) * (EJ * 4)
      ]
    ];
  }
  
  function rightPart(l, q) {
    const dist = [0, 0, 0, 0];
    if (q) {
      if (q[0] == q[1]) {
        dist[0] = (q[0] * l ** 1) / 2;
        dist[1] = (q[0] * l ** 2) / 12;
        dist[2] = (q[0] * l ** 1) / 2;
        dist[3] = (q[0] * l ** 2) / -12;
      } else {
        dist[0] = (l / 2) * ((2 / 3) * q[0] + (1 / 3) * q[1]);
        dist[2] = (l / 2) * ((1 / 3) * q[0] + (2 / 3) * q[1]);
      }
    }
    return dist;
  }
  
  // zeros, ones alternative
  function fillArray(list, value) {
    // list: [n] - vector, [n, m] - matrix
    let result = [];
    for (let i = 0; i < list[0]; i++) {
      if (list.length > 1) result.push(fillArray([list[1]], value));
      else result.push(value);
    }
    return result;
  }
  
  function indexM(elems) {
    let indexs = [];
    let vector = [];
    let defs = new Set();
    let s = 0;
    for (let i = 0; i < elems.length; i++) {
      for (let j = 0; j < 4; j++) {
        if (j == 1 && elems[i].points[0].joint) s++;
  
        if (j == 0 && elems[i].points[0].def[1]) defs.add(s);
        if (j == 1 && elems[i].points[0].def[2]) defs.add(s);
        if (j == 2 && elems[i].points[1].def[1]) defs.add(s);
        if (j == 3 && elems[i].points[1].def[2]) defs.add(s);
  
        vector[j] = s;
        s++;
      }
      indexs[i] = [...vector];
      s -= 2;
    }
  
    s += 2;
    return { indexs, s, defs };
  }
  
  function globalM(elems, { indexs, s }) {
    let matrix = fillArray([s, s], 0);
    for (let i = 0; i < elems.length; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          matrix[indexs[i][j]][indexs[i][k]] += elems[i].loc[j][k];
        }
      }
    }
  
    return matrix;
  }
  
  function defM(a, { s, defs }) {
    // Clone
    let matrix = [];
    for (let i = 0; i < a.length; i++) {
      matrix[i] = [...a[i]];
    }
  
    for (let j of [...defs]) {
      for (let k = 0; k < s; k++) {
        matrix[k][j] = 0;
        matrix[j][k] = 0;
      }
      matrix[j][j] = 1;
    }
    return matrix;
  }
  
  function globalF(elems, { indexs, s }) {
    let vector = fillArray([s], 0);
    let i;
    for (i = 0; i < elems.length; i++) {
      vector[indexs[i][0]] += elems[i].f[0] + elems[i].points[0].load;
      vector[indexs[i][1]] += elems[i].f[1] + elems[i].points[0].moment;
      vector[indexs[i][2]] += elems[i].f[2];
      vector[indexs[i][3]] += elems[i].f[3];
    }
    i--;
    vector[indexs[i][2]] += elems[i].points[1].load;
    vector[indexs[i][3]] += elems[i].points[1].moment;
  
    return vector;
  }
  
  function defF(v, { defs }) {
    v = [...v];
  
    for (let j of [...defs]) v[j] = 0;
    return v;
  }
  
  function solve(M, f) {
    // Константы
    let a = [];
    for (let i = 0; i < M.length; i++) {
      a[i] = [...M[i]];
    }
  
    let n = a.length;
    let flag;
  
    // Составляем СЛАУ
    for (let i = 0; i < n; i++) {
      a[i].push(f[i]);
    }
  
    // Вычисления
    for (let i = 0; i < n; i++) {
      // Идем по диагонали
      if (a[i][i] != 1) {
        // Убираем 0
        if (a[i][i] == 0) {
          flag = true;
          for (let j = i + 1; j < n - 1; j++) {
            if (a[j][i] != 0) {
              let ai = a[i];
              a[i] = a[j];
              a[j] = ai;
              flag = false;
            }
          }
          // Выводим null, если нельзя убрать 0
          if (flag) {
            return null;
          }
        }
        // Убираем число неравное 1
        let aii = a[i][i];
        for (let j = 0; j < n + 1; j++) {
          a[i][j] /= aii;
        }
      }
      // Изменяем строки
      for (let j = 0; j < n; j++) {
        if (j == i || a[j][i] == 0) {
          continue;
        }
        let aji = a[j][i];
        for (let k = 0; k < n + 1; k++) {
          a[j][k] -= a[i][k] * aji;
        }
      }
    }
    // Возвращаем результат
    let result = [];
    for (let i = 0; i < n; i++) {
      result.push(a[i][n]);
    }
    return result;
  }
  
  /** Умножение матрицы на вектор */
  function multiply(v, M) {
    if (M[0].length != v.length) console.log("incorrect size matrix");
    let sum;
    let result = [];
    for (let i = 0; i < M.length; i++) {
      sum = 0;
      for (let j = 0; j < M[0].length; j++) {
        sum += M[i][j] * v[j];
      }
      result.push(sum);
    }
    return result;
  }
  
  function reaction(elems, sol, { indexs }) {
    for (let i in elems) {
      elems[i].reaction = multiply(
        [
          sol[indexs[i][0]],
          sol[indexs[i][1]],
          sol[indexs[i][2]],
          sol[indexs[i][3]]
        ],
        elems[i].loc
      ).map((el,ind) => el - elems[i].f[ind]);
    }
    return elems.map(e => e.reaction);
  }
  
  const p1 = point(0, [1, 1, 1]);
  const p2 = point(6, [0, 0, 0], -8, 0, true);
  const p3 = point(11, [0, 1, 0]);
  const p4 = point(15, [0, 1, 0]);
  
  const e1 = element([p1, p2], [-4, -4], { E: 3, J: 1, A: 1 });
  const e2 = element([p2, p3], [-4, -4], { E: 1, J: 1, A: 1 });
  const e3 = element([p3, p4], [-4, -4], { E: 2, J: 1, A: 1 });
  
  const elems = [e1, e2, e3];
  const index = indexM(elems);
  const GM = globalM(elems, index);
  const GV = globalF(elems, index);
  const DGM = defM(GM, index);
  const DGV = defF(GV, index);
  const sol = solve(DGM, DGV);
  
  console.log("Example 1", reaction(elems, sol, index));