const Material = require("./Material");
const Point = require("./Point");
const Element = require("./Element");
const nj = require("numjs");

class BeamCalculation {
	/** Beam calculation using the finite element method.
	 *
	 * @class
	 * @this {BeamCalculation}
	 *
	 * @param {Array<Element>} elements Elements of the beam in turn
	 *
	 * @todo finish this shit
	 */
	constructor(elements) {
		this._elements = elements;
		this._GM;
		this._solution = this._Calculate();
		this._reaction = nj.dot(this._solution, this._GM);
	}

	get displacement() {
		return [
			[this._elements[0].points[0].coordinates[0], this._solution.get(1)],
			[this._elements[0].points[1].coordinates[0], this._solution.get(4)]
		];
	}

	get moment() {
		return [
			[this._elements[0].points[0].coordinates[0], this._reaction.get(2)],
			[this._elements[0].points[1].coordinates[0], this._reaction.get(5)]
		];
	}

	get shear() {
		return [
			[this._elements[0].points[0].coordinates[0], -this._reaction.get(1)],
			[this._elements[0].points[1].coordinates[0], this._reaction.get(4)]
		];
	}

	get max_deflection() {
		return nj.max([this._solution.get(1), this._solution.get(4)]);
	}

	get max_slope() {
		return nj.max([this._solution.get(2), this._solution.get(5)]);
	}

	get max_moment() {
		return nj.max([this._reaction.get(2), this._reaction.get(5)]);
	}

	get min_moment() {
		return nj.min([this._reaction.get(2), this._reaction.get(5)]);
	}

	get max_shear() {
		return nj.max([-this._reaction.get(1), this._reaction.get(4)]);
	}

	get min_shear() {
		return nj.min([-this._reaction.get(1), this._reaction.get(4)]);
	}

	/** Beam calculation using the finite element method.
	 *
	 * @method
	 * @this {Calculate}
	 *
	 * @param {Array<Element>} elements Elements of the beam in turn
	 */
	_Calculate() {
		let element;
		if (this._elements.length == 1) {
			element = this._elements[0];

			this._GM = nj.array(element.local_matrix);
			let GV = nj.array(element.local_vector);
			let DGM = this._GM.clone();

			// Учет граничных условий или закрепления
			if (element.points[0].defenitions[0]) {
				def(DGM, 0);
			}
			if (element.points[0].defenitions[1]) {
				def(DGM, 1);
			}
			if (element.points[0].defenitions[2]) {
				def(DGM, 2);
			}
			if (element.points[1].defenitions[0]) {
				def(DGM, 3);
			}
			if (element.points[1].defenitions[1]) {
				def(DGM, 4);
			}
			if (element.points[1].defenitions[2]) {
				def(DGM, 5);
			}
			return solve(DGM, GV);
		}
	}
}

/** Solves a system of linear equations by Gauss-Jordan Elimination.
 *
 * @function
 * @this {solve}
 * @param {nj.NdArray} matrix system matrix
 * @param {nj.NdArray} vector system vector
 * @return {nj.NdArray} vector solutions
 */
function solve(matrix, vector) {
	// Check assert
	console.assert(matrix instanceof nj.NdArray, "Solve: matrix is not NdArray.");
	console.assert(vector instanceof nj.NdArray, "Solve: vector is not NdArray.");
	console.assert(
		matrix.shape[0] == matrix.shape[1],
		"Solve: matrix is not square."
	);
	console.assert(
		matrix.shape[0] == vector.shape[0],
		"Solve: vector size is not equal to matrix size."
	);

	// Private variables
	let n = vector.size;
	let flag;

	// Create slau
	let slau = nj.concatenate(matrix.clone(), vector.reshape(n, 1));

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

/**
 *
 * @constructor
 * @this {def}
 * @param {nj.NdArray} matrix
 * @param {number} elem index in matrix
 */
function def(matrix, elem) {
	for (let i = 0; i < matrix.shape[0]; i++) {
		matrix.set(i, elem, 0);
		matrix.set(elem, i, 0);
	}
	matrix.set(elem, elem, 1);
}

module.exports = BeamCalculation;
