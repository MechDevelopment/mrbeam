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

function solve(matrix, vector) {
  // size
  const n = matrix.length;

  // create SLAU
  for (let i = 0; i < n; i++) matrix[i].push(vector[i]);

  // go along the diagonal elements
  for (let i = 0; i < n; i++) {
    // make diagonal equal one
    if (matrix[i][i] != 1) {
      let aii = matrix[i][i];
      for (let j = 0; j < n + 1; j++) matrix[i][j] /= aii;
    }

    // change the other lines
    for (let j = 0; j < n; j++) {
      if (j == i || matrix[j][i] == 0) continue;

      let aji = matrix[j][i];
      for (let k = i; k < n + 1; k++) {
        matrix[j][k] -= matrix[i][k] * aji;
      }
    }
  }

  return matrix.map(element => element[n]);
}

function reaction(elems, solution, { indexM }) {
  for (let i in elems) {
    elems[i].solution = indexM[i].map(element => solution[element]);
    elems[i].reaction = multiply(elems[i].loc, elems[i].solution).map(
      (element, index) => element - elems[i].fdist[index]
    );
  }
}

/////////////////////////////////////////////////////////////////////////

function multiply(matrix, vector) {
  let sum;
  let result = [];
  for (let i = 0; i < matrix.length; i++) {
    sum = 0;
    for (let j = 0; j < matrix[0].length; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }
  return result;
}

function filled(list, value) {
  // zeros, ones alternative
  // list: [n] - vector, [n, m] - matrix
  let result = [];
  for (let i = 0; i < list[0]; i++) {
    if (list.length > 1) result.push(filled([list[1]], value));
    else result.push(value);
  }
  return result;
}

export { supporting, globalM, globalV, solve, reaction };
