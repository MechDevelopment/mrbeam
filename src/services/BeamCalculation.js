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
	 */
	constructor(elements) {
		let elements = elements;
		this.solution = Calculate(elements);
    }
}

/** Beam calculation using the finite element method.
*
* @function
* @this {Calculate}
*
* @param {Array<Element>} elements Elements of the beam in turn
*/
function Calculate(elements) {
    let element;
    if (elements.length == 1){
        element = elements[0];
        
        let GM = element.local_matrix
        let GV = element.local_vector

        let DGM = GM.clone();

        // Учет граничных условий или закрепления
        if (point_1.defenitions[0]) {
            def(DGM, 0);
        }
        if (point_1.defenitions[1]) {
            def(DGM, 1);
        }
        if (point_2.defenitions[0]) {
            def(DGM, 2);
        }
        if (point_2.defenitions[1]) {
            def(DGM, 3);
        }

        // Перемещение и повороты
        let solution = solve(DGM, VP);
        console.log(solution);
        console.log(nj.dot(GM, solution));
        return [
            [point_1.coordinates[0], solution.get(0)],
            [point_2.coordinates[0], solution.get(2)]
        ];
        // Продольные силы и моменты
        //return nj.dot(GM, VS)
    }
    // } else {
    //     let element;
    //     for (let i = 0; i < elements.length; i++) {
    //         element = elements[i];
	//     }
    // }
}

/**
 * Solves a system of linear equations by Gauss-Jordan Elimination.
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

/**
 * @example
 * // use constructor
 *
 * // change parameters
 */
