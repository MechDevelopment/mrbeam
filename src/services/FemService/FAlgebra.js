/** Computational functions
 *
 * Abbreviation and terms:
 *  elems    - array of finite elements       / массив конечных элементов
 *  indexM   - index matrix (local to global) / матрица индексов
 *  defV     - definition index vector        / вектор индексов закреплений
 *  s        - size of global matrix          / размер глобальной матрицы
 *  globalM  - global matrix (size: [s, s])   / глобальная матрица
 *  globalV  - global vector (size: [s])      / глобальный грузовой вектор
 * 
 *  solve    - SLAU solution (matrix,vector)  / решение СЛАУ, возвращает вектор
 *  reaction - add support reactions (R, M)   / добавляет реакции опор
 *  
 *  multiply - matrix vector multiplication   / умножение матрицы на вектор
 *  filled   - creating a filled array        / создание заполненного массива
 */

function supporting(elems) {
  // variables
  let indexM = [];
  let defV = new Set();
  let temp = [];
  let s = 0;

  for (let i = 0; i < elems.length; i++) {
    for (let j = 0; j < 4; j++) {
      // definition vector building
      if (j == 0 && elems[i].nodes[0].def[1]) defV.add(s);
      if (j == 1 && elems[i].nodes[0].def[2]) defV.add(s);
      if (j == 2 && elems[i].nodes[1].def[1]) defV.add(s);
      if (j == 3 && elems[i].nodes[1].def[2]) defV.add(s);

      // index matrix building
      if (j == 1 && elems[i].nodes[0].joint) s++;
      temp[j] = s;
      s++;
    }
    indexM[i] = [...temp];
    s -= 2;
  }
  return { indexM, defV: [...defV], s: s + 2 };
}

function globalM(elems, { indexM, defV, s }) {
  // create zeros matrix size: [s, s]
  let matrix = filled([s, s], 0);

  for (let i = 0; i < elems.length; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        matrix[indexM[i][j]][indexM[i][k]] += elems[i].loc[j][k];
      }
    }
  }

  // registrate definitions:
  for (let j of defV) {
    for (let k = 0; k < s; k++) {
      matrix[k][j] = 0;
      matrix[j][k] = 0;
    }
    matrix[j][j] = 1;
  }

  return matrix;
}

function globalV(elems, { indexM, defV, s }) {
  // create zeros vector size: [s]
  let vector = filled([s], 0);

  let i;
  for (i = 0; i < elems.length; i++) {
    vector[indexM[i][0]] += elems[i].fdist[0] + elems[i].nodes[0].load;
    vector[indexM[i][1]] += elems[i].fdist[1] + elems[i].nodes[0].moment;
    vector[indexM[i][2]] += elems[i].fdist[2];
    vector[indexM[i][3]] += elems[i].fdist[3];
  }
  i--;
  vector[indexM[i][2]] += elems[i].nodes[1].load;
  vector[indexM[i][3]] += elems[i].nodes[1].moment;

  // registrate definitions:
  for (let j of defV) vector[j] = 0;

  return vector;
}

/////////////////////////////////////////////////////////////////////////

function solve(M,f) {
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
      for (let j = 0; j < n + 1; j++) { // for (let j = i - 4 > 0 ? i - 4 : 0; j < n + 1; j++)
        a[i][j] /= aii;
      }
    }
    // Изменяем строки
    for (let j = 0; j < n; j++) { // for (let j = 0; j < (i + 5 < n ? i + 5 : n); j++) {
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

function reaction(elems, sol, { indexM }) {
  for (let i in elems) {
    elems[i].reaction = multiply(
      [
        sol[indexM[i][0]],
        sol[indexM[i][1]],
        sol[indexM[i][2]],
        sol[indexM[i][3]]
      ],
      elems[i].loc
    ).map((el, ind) => el - elems[i].fdist[ind]);
  }
  return elems.map(e => e.reaction);
}

/////////////////////////////////////////////////////////////////////////

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

// zeros, ones alternative
function filled(list, value) {
  // list: [n] - vector, [n, m] - matrix
  let result = [];
  for (let i = 0; i < list[0]; i++) {
    if (list.length > 1) result.push(filled([list[1]], value));
    else result.push(value);
  }
  return result;
}

//export { indexM, globalM, globalV, defM, defF, solve, reaction };
module.exports = {
  supporting,
  globalM,
  globalV,
  solve,
  reaction
};
