import Material from "./Material";
import Point from "./Point";
import Element from "./Element";
import { dot, max, min, array, zeros, NdArray, concatenate } from "numjs";

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
	constructor(elements, count = "default") {
		this._elements = elements;
		this._global_matrix;
		this._points;

		if (count == "default") {
			count = 50 / elements.length;
		}
		this._fragmentation(elements, count);

		this._solution = this._calculate();
		//console.log(this._solution)
		//console.log(dot(this._solution, this._global_matrix))
		this._reaction = dot(this._solution, this._global_matrix);
	}

	/** Beam calculation using the finite element method.
	 *
	 * @method
	 * @this {Calculate}
	 *
	 * @param {Array<Element>} elements Elements of the beam in turn
	 */
	_calculate() {
		let local_matrix;
		let element;

		// Создадим массив точек отдельно
		this._points = [this._elements[0].points[0]];
		for (let i = 0; i < this._elements.length; i++) {
			this._points.push(this._elements[i].points[1]);
		}

		// Создаем глобальную матрицу
		this._global_matrix = zeros([
			this._elements.length * 3 + 3,
			this._elements.length * 3 + 3
		]);

		// Заполняем глобальную матрицу
		for (let index = 0; index < this._elements.length; index++) {
			// Take element
			element = this._elements[index];
			local_matrix = element.local_matrix;
			for (let i = 0; i < 6; i++) {
				for (let j = 0; j < 6; j++) {
					this._global_matrix.set(
						i + 3 * index,
						j + 3 * index,
						this._global_matrix.get(i + 3 * index, j + 3 * index) +
							local_matrix[i][j]
					);
				}
			}
		}
		// Найс костыль)
		// И вот как теперь сделать???
		// Новый костыль?
		// эхх
		let global_vector = zeros([this._elements.length * 3 + 3]);
		let DGM = this._global_matrix.clone();

		for (let i = 0; i < this._points.length; i++) {
			global_vector.set(0 + 3 * i, this._points[i].load[0]);
			// Внимание, костыли
			if (i < this._elements.length) {
				global_vector.set(
					1 + 3 * i,
					this._points[i].load[1] +
						this._elements[i].distributed_load[0]
				);
			} else {
				global_vector.set(
					1 + 3 * i,
					this._points[i].load[1] +
						this._elements[i - 1].distributed_load[1]
				);
			}

			global_vector.set(2 + 3 * i, this._points[i].moment);
			for (let j = 0; j < 3; j++) {
				if (this._points[i].defenitions[j]) {
					def(DGM, i * 3 + j);
				}
			}
		}

		// console.log(this._global_matrix);
		// console.log(global_vector);
		// console.log(DGM);
		let sol = solve(DGM, global_vector);

		for (let i = 0; i < this._points.length; i++) {
			if (this._points[i].defenitions[1] == 1) {
				console.log(sol.get(i*3+1))
				console.log(sol.get(i*3+2))
				sol.set(i * 3 + 1, 0);
				sol.set(i * 3 + 2, 0);
			}
		}
		return sol;
	}

	/**
	 *
	 *
	 *   @param {Number} count - number of splits
	 *
	 * let we should split one element for several elements
	 * now, let we have some length element, which we will do fragmentation - split_coeff
	 *
	 * if (element.length > split_coeff): then fragmentation
	 *
	 * then count for every element: count = element.length / split_coeff
	 *
	 */
	_fragmentation(elements, split_coeff) {
		/**
		 * P1 - (P1 - P2) / (x2 - x1) * x = success

		 */
		// ОСТОРОЖНО! Снизу божественный код.
		let h;
		let add_point;
		let add_element;
		let count;
		for (let i = elements.length - 1; i >= 0; i--) {
			count = elements[i].length / split_coeff;
			h = elements[i].length / count;
			for (let j = 1; j < count; j++) {
				add_point = new Point([
					elements[i].points[1].coordinates[0] - h,
					0
				]);
				add_element = new Element(
					[elements[i].points[0], add_point],
					elements[i].material,
					elements[i].distributed_load
				);

				elements[i].points[0] = add_point;
				elements.splice(i, 0, add_element);
			}
		}
		return elements;
	}

	get displacement() {
		let eps = 1000000;
		let result1 = [];
		let result2 = [];
		for (let i = 0; i < this._solution.size / 3; i++) {
			result1.push(
				Math.round(this._points[i].coordinates[0] * eps) / eps
			);
			result2.push(Math.round(this._solution.get(1 + i * 3) * eps) / eps);
		}
		return [result1, result2];
	}

	get moment() {
		return [
			[this._elements[0].points[0].coordinates[0], this._reaction.get(2)],
			[this._elements[0].points[1].coordinates[0], this._reaction.get(5)]
		];
	}

	/** Coordinates Shear-Diagram */
	get shear() {
		let eps = 100000;
		let result1 = [];
		let result2 = [];
		let add = this._reaction.get(1);
		for (let i = 0; i < this._reaction.size / 3 - 1; i++) {
			result1.push(
				Math.round(this._points[i].coordinates[0] * eps) / eps,
				Math.round(this._points[i + 1].coordinates[0] * eps) / eps
			);
			result2.push(
				Math.round(add * eps) / eps,
				Math.round(add * eps) / eps
			);
			add += this._reaction.get(1 + (i + 1) * 3);
		}
		return [result1, result2];
	}

	get max_deflection() {
		return max([this._solution.get(1), this._solution.get(4)]);
	}

	get max_slope() {
		return max([this._solution.get(2), this._solution.get(5)]);
	}

	get max_moment() {
		return max([this._reaction.get(2), this._reaction.get(5)]);
	}

	get min_moment() {
		return min([this._reaction.get(2), this._reaction.get(5)]);
	}

	get max_shear() {
		return max([-this._reaction.get(1), this._reaction.get(4)]);
	}

	get min_shear() {
		return min([-this._reaction.get(1), this._reaction.get(4)]);
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
	console.assert(matrix instanceof NdArray, "Solve: matrix is not NdArray.");
	console.assert(vector instanceof NdArray, "Solve: vector is not NdArray.");
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

export default BeamCalculation;
