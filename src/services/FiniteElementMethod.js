// Packeges
const nj = require("numjs");
const Material = require("./Material");
const Point = require("./Point");
const Element = require("./Element");

/* SyntaxError: Unexpected token export ???
export default function() {
	console.log("Finite Elements");
}
*/

// RUN CODE
let start = new Date();
FEM();
console.log((new Date() - start) * 0.001, "sec");

function FEM() {
	Test_1();
	// Перемещения в координатной форме [[x,y],[x,y]] - для двух точек (стандартный массив)
	//return OneElementSolution(E1);
}

function OneElementSolution(element) {
	// Длина между точками элемента
	let point_1 = element.points[0];
	let point_2 = element.points[1];
	let material = element.material.EJ;

	let length = element.distance

	// Создание локальной (совпадает с глобальной) матрицы жесткости
	let GM = localMatrix(length);

	GM = GM.multiply(material); // 320 - это материал

	// Создание вектора узловых сил
	let VP = nj.array([
		point_1.load[0],
		point_1.load[1],
		point_2.load[0],
		point_2.load[1]
	]);

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

/**
 *
 * @constructor
 * @this {localMatrix}
 * @param {number} l length of element
 * @return {nj.NdArray}
 */
function localMatrix(l) {
	return nj.array([
		[12.0 / l / l / l, 6.0 / l / l, -12.0 / l / l / l, 6.0 / l / l],
		[6.0 / l / l, 4.0 / l, -6.0 / l / l, 2.0 / l],
		[-12.0 / l / l / l, -6.0 / l / l, 12.0 / l / l / l, -6.0 / l / l],
		[6.0 / l / l, 2.0 / l, -6.0 / l / l, 4.0 / l]
	]);
}

/**
 * Solves a system of linear equations.
 *
 * @constructor
 * @this {solve} Gauss-Jordan Elimination
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

function Test_1() {
	let P1 = new Point([0, 0], [1, 1, 0]);
	let P2 = new Point([10, 0], [0, 0, 0], [1000, 0]);
	let m = new Material(9.9 * 10 ** 6 * 0.04909)
	let E1 = new Element([P1, P2], m);
	let E2 = new Element([P2, P1], m);
	OneElementSolution(E1);
	OneElementSolution(E2);
	/*
	    Max Deflection:	δmax=0.6859 in	@ x = L
	    Max Slope:	θmax=0.1029 rad	@ x = L
	    Shear:	V=+1000 lbf	constant
	    Moment:	Mmax=−10,000 in-lbf	@ x = 0
	*/
	let P3 = new Point([0, 0], [1, 1, 0], [0, 0], 10);
	let P4 = new Point([5, 0], [0, 1, 0]);
	let E3 = new Element([P3, P4], m);
	OneElementSolution(E3);
}
