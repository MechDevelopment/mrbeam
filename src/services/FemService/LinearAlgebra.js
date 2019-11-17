import { NdArray, concatenate, zeros, ones, dot } from "numjs";
import Element from "./Element";

class LinearAlgebra {
    /** Solves a system of linear equations by Gauss-Jordan Elimination.
     *
     * @param {NdArray<NdArray<Number>>} matrix
     * @param {NdArray<Number>} vector
     *
     * @return {NdArray<Number>}
     */
    static solve(matrix, vector) {
        // Check asserts
        console.assert(
            matrix.shape[0] == matrix.shape[1],
            "LinearAlgebra.solve: matrix is not square."
        );
        console.assert(
            matrix.shape[0] == vector.shape[0],
            "Solve: vector size is not equal to matrix size."
        );

        // Private variables
        let n = vector.size;
        let flag;

        // Create slau
        let slau = concatenate(matrix.clone(), vector.reshape(n, 1));

        for (let i = 0; i < n; i++) {
            // Go by diagonally
            if (slau.get(i, i) != 1) {
                // if 0
                if (slau.get(i, i) == 0) {
                    flag = true;

                    // Remove 0
                    for (let j = i + 1; j < n - 1; j++) {
                        if (slau.get(j, i) != 0) {
                            let slaui = slau.get(i);
                            slau.set(i, slay.get(j));
                            slau.set(j, slaui);
                            flag = false;
                        }
                    }
                    // Return 0
                    if (flag) {
                        return null;
                    }
                }
                // if not equal to 1
                let slauii = slau.get(i, i);
                for (let j = 0; j < n + 1; j++) {
                    slau.set(i, j, slau.get(i, j) / slauii);
                }
            }
            // Change the lines
            for (let j = 0; j < n; j++) {
                if (j == i || slau.get(j, i) == 0) {
                    continue;
                }
                let slauji = slau.get(j, i);
                for (let k = 0; k < n + 1; k++) {
                    slau.set(j, k, slau.get(j, k) - slau.get(i, k) * slauji);
                }
            }
        }

        return slau.T.slice(-1).flatten();
    }

    static multiply(vector, matrix) {
        return dot(vector, matrix);
    }

    static createGlobalMatrix(elements, step, count) {
        // Переменные
        let local;

        // Создаем пустую матрицу нулей необходимого размера
        let matrix = zeros([count * 3 + 3, count * 3 + 3]);

        // Проходимся по диагонали матрицы
        for (let diagonal = 0; diagonal < count; diagonal++) {
            // Забираем локальную матрицу элемента
            local = elements[diagonal].local_matrix;

            // Вставляем локальную матрицу в глобальную
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 6; j++) {
                    matrix.set(
                        i + 3 * diagonal,
                        j + 3 * diagonal,
                        matrix.get(i + 3 * diagonal, j + 3 * diagonal) +
                            local[i][j]
                    );
                }
            }
        }
        return matrix;
    }

    static createGlobalVector(elements, step, count) {
        // Переменные
        let local;

        // Создаем пустой вектор нулей необходимого размера
        let vector = zeros([count * 3 + 3]);

        // Проходимся по вектору
        for (let index = 0; index < count; index++) {
            // Забираем локальный вектор элемента
            local = elements[index].local_vector(step);

            // Вставляем локальный вектор в глобальный
            for (let j = 0; j < 6; j++) {
                vector.set(j + 3 * index, local[j]);
            }
        }

        // Не забываем про самую последнюю точку
        vector.set(3 + 3 * (count - 1), local[3]);
        vector.set(4 + 3 * (count - 1), local[4]);
        vector.set(5 + 3 * (count - 1), local[5]);

        return vector;
    }

    static createDefVector(elements, count) {
        // Переменные
        let local;

        // Создаем пустой вектор единиц необходимого размера
        let vector = ones([count * 3 + 3]);

        // Проходимся по вектору
        for (let index = 0; index < count; index++) {
            // Забираем локальный вектор элемента
            local = elements[index].def_vector;

            // Вставляем локальный вектор в глобальный
            for (let j = 0; j < 3; j++) {
                vector.set(j + 3 * index, local[j]);
            }
        }

        // Не забываем про самую последнюю точку
        vector.set(3 + 3 * (count - 1), local[3]);
        vector.set(4 + 3 * (count - 1), local[4]);
        vector.set(5 + 3 * (count - 1), local[5]);

        return vector;
    }

    static setDefMatrix(matrix, def) {
        // Переменные
        const N = def.size;
        matrix = matrix.clone();

        // Проходимся по вектору def
        for (let index = 0; index < N; index++) {
            // Находим закрепление
            if (def.get(index)) {
                for (let i = 0; i < N; i++) {
                    matrix.set(i, index, 0);
                    matrix.set(index, i, 0);
                }
                matrix.set(index, index, 1);
            }
        }
        return matrix;
    }

    static setDefVector(vector, def) {
        // Переменные
        const N = def.size;
        vector = vector.clone();

        // Проходимся по вектору def
        for (let index = 0; index < N; index++) {
            // Находим закрепление
            if (def.get(index)) {
                vector.set(index, 0);
            }
        }
        return vector;
    }
}

export default LinearAlgebra;
