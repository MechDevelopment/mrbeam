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
    ).map((el, ind) => el - elems[i].f[ind]);
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

//////////////////////////////////////////////////////////////
const p21 = point(0, [1, 1, 1]);
const p22 = point(10, [0, 0, 0]);

const e21 = element([p21, p22], [10, 10], { E: 12.0e6, J: 0.04909, A: 0.7854 });

const elems2 = [e21];
const index2 = indexM(elems2);
const GM2 = globalM(elems2, index2);
const GV2 = globalF(elems2, index2);
const DGM2 = defM(GM2, index2);
const DGV2 = defF(GV2, index2);

const sol2 = solve(DGM2, DGV2);
console.log("Example 2", solve(DGM2, DGV2));
console.log("Example 2", reaction(elems2, sol2, index2));

//////////////////////////////////////////////////////////////
const p31 = point(0, [1, 1, 0]);
const p32 = point(5, [0, 0, 0], -100);
const p33 = point(10, [0, 1, 0]);

const e31 = element([p31, p32], [-60, -60], { E: 1, J: 1, A: 1 });
const e32 = element([p32, p33]);

const elems3 = [e31, e32];
const index3 = indexM(elems3);
const GM3 = globalM(elems3, index3);
const GV3 = globalF(elems3, index3);
const DGM3 = defM(GM3, index3);
const DGV3 = defF(GV3, index3);

const sol3 = solve(DGM3, DGV3);
console.log("Example 3", solve(DGM3, DGV3));
console.log("Example 3", reaction(elems3, sol3, index3));

// КОСАЯ НАГРУЗКА
//////////////////////////////////////////////////////////////
const p41 = point(0, [1, 1, 1]);
const p42 = point(10);

const e41 = element([p41, p42], [0, -10], { E: 1, J: 1, A: 1 });

const elems4 = [e41];
const index4 = indexM(elems4);
const GM4 = globalM(elems4, index4);
const GV4 = globalF(elems4, index4);
const DGM4 = defM(GM4, index4);
const DGV4 = defF(GV4, index4);

const sol4 = solve(DGM4, DGV4);
console.log("Example 4", solve(DGM4, DGV4));
console.log("Example 4", reaction(elems4, sol4, index4));

// СЛОЖНАЯ БАЛКА
//////////////////////////////////////////////////////////////
const p51 = point(0, [1, 1, 0]);
const p52 = point(2, [0, 0, 0], 0, 20);
const p53 = point(3, [0, 1, 0]);
const p54 = point(4.5, [0, 0, 0], -10);

const e51 = element([p51, p52], [-10, -10], { E: 1, J: 1, A: 1 });
const e52 = element([p52, p53], [-10, -10], { E: 1, J: 1, A: 1 });
const e53 = element([p53, p54], [0, 0], { E: 1, J: 1, A: 1 });

const elems5 = [e51, e52, e53];
const index5 = indexM(elems5);
const GM5 = globalM(elems5, index5);
const GV5 = globalF(elems5, index5);
const DGM5 = defM(GM5, index5);
const DGV5 = defF(GV5, index5);

const sol5 = solve(DGM5, DGV5);
console.log("Example 5", solve(DGM5, DGV5));
console.log("Example 5", reaction(elems5, sol5, index5));

// СЛОЖНАЯ БАЛКА С ШАРНИРОМ
//////////////////////////////////////////////////////////////
const p61 = point(0, [1, 1, 1]);
const p62 = point(4, [0, 0, 0], 0, 0, true);
const p63 = point(6, [0, 1, 0], 0, -5);

const e61 = element([p61, p62], [-2, -2], { E: 1, J: 1, A: 1 });
const e62 = element([p62, p63]);

const elems6 = [e61, e62];
const index6 = indexM(elems6);
const GM6 = globalM(elems6, index6);
const GV6 = globalF(elems6, index6);
const DGM6 = defM(GM6, index6);
const DGV6 = defF(GV6, index6);

const sol6 = solve(DGM6, DGV6);
console.log("Example 6", solve(DGM6, DGV6));
console.log("Example 6", reaction(elems6, sol6, index6));

// СУПЕР СЛОЖНАЯ БАЛКА С ШАРНИРОМ
//////////////////////////////////////////////////////////////
const p71 = point(0, [0, 0, 0], -10);
const p72 = point(2, [0, 1, 0]);
const p73 = point(4, [0, 0, 0], 0, 0, true);
const p74 = point(6, [1, 1, 0], 0, -4);
const p75 = point(8, [0, 0, 0]);
const p76 = point(10, [0, 1, 0]);

const e71 = element([p71, p72]);
const e72 = element([p72, p73]);
const e73 = element([p73, p74]);
const e74 = element([p74, p75], [-2, -2]);
const e75 = element([p75, p76], [-2, -2]);

const elems7 = [e71, e72, e73, e74, e75];
const index7 = indexM(elems7);
const GM7 = globalM(elems7, index7);
const GV7 = globalF(elems7, index7);
const DGM7 = defM(GM7, index7);
const DGV7 = defF(GV7, index7);

const sol7 = solve(DGM7, DGV7);
console.log("Example 7", solve(DGM7, DGV7));
console.log("Example 7", reaction(elems7, sol7, index7));
