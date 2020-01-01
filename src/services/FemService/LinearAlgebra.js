class LinearAlgebra {
  /** Solves a system of linear equations by Gauss-Jordan Elimination.
   *
   * @param {NdArray<NdArray<Number>>} matrix
   * @param {NdArray<Number>} vector
   *
   * @return {NdArray<Number>}
   */
  static solve(M, f) {
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
  static multiply(v, M) {
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
  static multiply1(vector, matrix) {
    return dot(vector, matrix);
  }

  static createGlobalMatrix(elements, step, count) {
    // Переменные
    let local;

    // Создаем пустую матрицу нулей необходимого размера
    let matrix = fillArray([count * 3 + 3, count * 3 + 3], 0);

    // Проходимся по диагонали матрицы
    for (let diagonal = 0; diagonal < count; diagonal++) {
      // Забираем локальную матрицу элемента
      local = elements[diagonal].local_matrix;

      // Вставляем локальную матрицу в глобальную
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          matrix[i + 3 * diagonal][j + 3 * diagonal] =
            matrix[i + 3 * diagonal][j + 3 * diagonal] + local[i][j];
        }
      }
    }
    return matrix;
  }

  static createGlobalMatrix2(elements, step, count) {
    // Переменные
    let local;
    let shift = 0;

    let joint_count = 0;
    for (let diagonal = 0; diagonal < count; diagonal++) {
      if (elements[diagonal].joint) joint_count+=1;
    }

    // Создаем пустую матрицу нулей необходимого размера
    let matrix = fillArray(
      [count * 3 + 3 + joint_count, count * 3 + 3 + joint_count],
      0
    );

    // Проходимся по диагонали матрицы
    for (let diagonal = 0; diagonal < count; diagonal++) {
      // Забираем локальную матрицу элемента
      local = elements[diagonal].local_matrix;
      //console.log(elements[diagonal])

      let coeff = elements[diagonal].joint ? 1 : 0;

      // Вставляем локальную матрицу в глобальную
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          if (coeff && i == 2 && j == 0) {
            shift += 1;
          }
          matrix[i + 3 * diagonal + shift][j + 3 * diagonal + shift] =
            matrix[i + 3 * diagonal + shift][j + 3 * diagonal + shift] +
            local[i][j];
        }
      }
    }
    return matrix;
  }

  static createGlobalVector2(elements, step, count) {
    // Переменные
    let local;
    let shift = 0;

    let joint_count = 0;
    for (let diagonal = 0; diagonal < count; diagonal++) {
      if (elements[diagonal].joint) joint_count+=1;
    }

    // Создаем пустой вектор нулей необходимого размера
    let vector = fillArray([count * 3 + 3 + joint_count], 0);

    // Проходимся по вектору
    for (let index = 0; index < count; index++) {
      // Забираем локальный вектор элемента
      local = elements[index].local_vector(step);

      let coeff = elements[index].joint ? 1 : 0;

      // Вставляем локальный вектор в глобальный
      for (let j = 0; j < 6; j++) {
        if (coeff && j == 2) {
          shift += 1;
        }
        vector[j + 3 * index + shift] = local[j];
      }
    }

    // Не забываем про самую последнюю точку
    vector[3 + 3 * (count - 1) + shift] = local[3];
    vector[4 + 3 * (count - 1) + shift] = local[4];
    vector[5 + 3 * (count - 1) + shift] = local[5];

    return vector;
  }

  static createGlobalVector(elements, step, count) {
    // Переменные
    let local;

    // Создаем пустой вектор нулей необходимого размера
    let vector = fillArray([count * 3 + 3], 0);

    // Проходимся по вектору
    for (let index = 0; index < count; index++) {
      // Забираем локальный вектор элемента
      local = elements[index].local_vector(step);

      

      // Вставляем локальный вектор в глобальный
      for (let j = 0; j < 6; j++) {
        

        vector[j + 3 * index ] = local[j];
      }
    }

    // Не забываем про самую последнюю точку
    vector[3 + 3 * (count - 1)] = local[3];
    vector[4 + 3 * (count - 1)] = local[4];
    vector[5 + 3 * (count - 1)] = local[5];

    return vector;
  }

  static createDefVector2(elements, step, count) {
    // Переменные
    let local;
    let shift = 0;

    let joint_count = 0;
    for (let diagonal = 0; diagonal < count; diagonal++) {
      if (elements[diagonal].joint) joint_count+=1;
    }
    // Создаем пустой вектор единиц необходимого размера
    let vector = fillArray([count * 3 + 3], 1.0);

    // Проходимся по вектору
    for (let index = 0; index < count; index++) {
      // Забираем локальный вектор элемента
      local = elements[index].def_vector;

      let coeff = elements[index].joint ? 1 : 0;
      // Вставляем локальный вектор в глобальный
      for (let j = 0; j < 3; j++) {
        if (coeff && j == 2) shift += 1;
        vector[j + 3 * index+ shift] = local[j];
      }
    }

    // Не забываем про самую последнюю точку

    vector[3 + 3 * (count - 1) + shift] = local[3];
    vector[4 + 3 * (count - 1) + shift] = local[4];
    vector[5 + 3 * (count - 1) + shift] = local[5];

    return vector;
  }

  static createDefVector(elements, step, count) {
    // Переменные
    let local;

    // Создаем пустой вектор единиц необходимого размера
    let vector = fillArray([count * 3 + 3], 1.0);

    // Проходимся по вектору
    for (let index = 0; index < count; index++) {
      // Забираем локальный вектор элемента
      local = elements[index].def_vector;

      // Вставляем локальный вектор в глобальный
      for (let j = 0; j < 3; j++) {
        vector[j + 3 * index] = local[j];
      }
    }

    // Не забываем про самую последнюю точку
    vector[3 + 3 * (count - 1)] = local[3];
    vector[4 + 3 * (count - 1)] = local[4];
    vector[5 + 3 * (count - 1)] = local[5];

    return vector;
  }

  static setDefMatrix(matrix, def) {
    // Переменные
    const N = def.length;

    // Clone
    let a = [];
    for (let i = 0; i < matrix.length; i++) {
      a[i] = [...matrix[i]];
    }

    // Проходимся по вектору def
    for (let index = 0; index < N; index++) {
      // Находим закрепление
      if (def[index]) {
        for (let i = 0; i < N; i++) {
          a[i][index] = 0;
          a[index][i] = 0;
        }
        a[index][index] = 1;
      }
    }
    return a;
  }

  static setDefVector(vector, def) {
    // Переменные
    const N = def.length;

    vector = [...vector];

    // Проходимся по вектору def
    for (let index = 0; index < N; index++) {
      // Находим закрепление
      if (def[index]) {
        vector[index] = 0;
      }
    }
    return vector;
  }

  /** Lagrange interpolation
   *
   * @param {Array<Number>} x list of labels
   * @param {Array<Array<Number>>} points list of bad points
   */
  static lagrange(label, points) {
    let [x, y] = points;

    function basis(t, index) {
      let P = 1;
      for (let j = 0; j < x.length; j++) {
        if (j != index) P *= (t - x[j]) / (x[index] - x[j]);
      }
      return P;
    }

    return label.map(element => {
      let sum = 0;
      for (let i = 0; i < x.length; i++) {
        sum += y[i] * basis(element, i);
      }
      return sum;
    });
  }
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

export { LinearAlgebra };
