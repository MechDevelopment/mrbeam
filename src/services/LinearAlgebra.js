import { NdArray, concatenate } from "numjs";

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

	/** The function zeroes the row and column with index, but M[i, i] = 1
	 *
	 * @param {NdArray<NdArray<Number>>} matrix
	 * @param {Number} index
	 */
	static zerosRowAndColumn(matrix, index) {
		// Check asserts
		console.assert(
			matrix.shape[0] == matrix.shape[1],
			"LinearAlgebra.zerosRowAndColumn: matrix is not square."
		);
		console.assert(
			matrix.shape[0] > index || index > 0,
			"LinearAlgebra.zerosRowAndColumn: index out of range."
		);

		// Programm
		for (let i = 0; i < matrix.shape[0]; i++) {
			matrix.set(i, index, 0);
			matrix.set(index, i, 0);
		}
		matrix.set(index, index, 1);
	}
}

export default LinearAlgebra;
