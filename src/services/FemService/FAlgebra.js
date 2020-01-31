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
      if (j == 1 && elems[i].nodes[0].joint) s++;

      if (j == 0 && elems[i].nodes[0].def[1]) defs.add(s);
      if (j == 1 && elems[i].nodes[0].def[2]) defs.add(s);
      if (j == 2 && elems[i].nodes[1].def[1]) defs.add(s);
      if (j == 3 && elems[i].nodes[1].def[2]) defs.add(s);

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
    vector[indexs[i][0]] += elems[i].fdist[0] + elems[i].nodes[0].load;
    vector[indexs[i][1]] += elems[i].fdist[1] + elems[i].nodes[0].moment;
    vector[indexs[i][2]] += elems[i].fdist[2];
    vector[indexs[i][3]] += elems[i].fdist[3];
  }
  i--;
  vector[indexs[i][2]] += elems[i].nodes[1].load;
  vector[indexs[i][3]] += elems[i].nodes[1].moment;

  return vector;
}

function defF(v, { defs }) {
  v = [...v];

  for (let j of [...defs]) v[j] = 0;
  return v;
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
    ).map((el, ind) => el - elems[i].fdist[ind]);
  }
  return elems.map(e => e.reaction);
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

function SLAU(M, f) {
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
      // Убираем число неравное 1
      let aii = a[i][i];
      for (let j = i - 4 > 0 ? i - 4 : 0; j < n + 1; j++) {
        a[i][j] /= aii;
      }
    }
    // Изменяем строки
    for (let j = 0; j < (i + 5 < n ? i + 5 : n); j++) {
      if (j == i || a[j][i] == 0) {
        continue;
      }
      let aji = a[j][i];
      for (let k = i; k < n + 1; k++) {
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

//export { indexM, globalM, globalF, defM, defF, solve, reaction };
module.exports = {
  indexM,
  globalM,
  globalF,
  defM,
  defF,
  solve,
  SLAU,
  reaction
};
