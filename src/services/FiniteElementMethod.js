// Packeges
const nj = require("numjs");
const Material = require("./Material");

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
	let m1 = new Material(1);
	console.log(m1.EJ)
	console.log(m1.E)
	console.log(m1.J)
	m1.A = 10
	console.log(m1.A)
	m1 = new Material(1, 2);
	console.log(m1.EJ)
	console.log(m1.E)
	console.log(m1.J)
	console.log(m1.A)
	m1 = new Material(1, 2, 3);
	console.log(m1.EJ)
	console.log(m1.E)
	console.log(m1.J)
	console.log(m1.A)

	//Test_1()
	// Перемещения в координатной форме [[x,y],[x,y]] - для двух точек (стандартный массив)
	//return OneElementSolution(E1);
}

/**
 * Creating a beam point.
 *
 * @constructor
 * @this {createPoint}
 * @param {NdArray<Number>} _coordinates [x, y]
 * @param {NdArray<Boolean>} _defenitions [x, y, r]
 * @param {NdArray<Number>} _load [x, y]
 * @param {Number} _moment
 * @param {Boolean} _joint
 * @return {Object}
 */
function createPoint(
	_coordinates,
	_defenitions = [0, 0, 0],
	_load = [0, 0],
	_moment = 0,
	_joint = false
) {
	return {
		coordinates: nj.array(_coordinates),
		defenitions: nj.array(_defenitions),
		load: nj.array(_load),
		moment: _moment,
		joint: _joint
	};
}

/**
 * Creating an element between points of a beam.
 *
 * @constructor
 * @this {createElement}
 * @param {Array<Object>} _points [createPoint1, createPoint2]
 * @param {Number} _material // Object in future
 * @param {NdArray<Number>} _distributed_load [y1, y2]
 * @return {Object}
 */
function createElement(_points, _material = 1, _distributed_load = [0, 0]) {
	return {
		points: _points,
		material: _material,
		distributed_load: nj.array(_distributed_load)
	};
}

/**
 * Creating a material.
 *
 * @constructor
 * @this {createMaterial}
 * @param {Number} _E elastic modulus or E*J
 * @param {Number} _E elastic modulus or E*J
 * @param {Number, Array([w, h])} _A elastic modulus or E*J
 * @return {Object}
 */
function createMaterial(_E = 1, _J = 1, _A) {
    if (arguments == 1){
        _result = _E
    } else if(argumens == 2){
        _result = _E * _J
    }
	return {
		E: _E,
		J: _J,
		result: _result
	};
}

function OneElementSolution(element) {
	// Длина между точками элемента
	let point_1 = element["points"][0];
	let point_2 = element["points"][1];
	let material = element["material"];

	let length = distance(point_1["coordinates"], point_2["coordinates"]);

	// Создание локальной (совпадает с глобальной) матрицы жесткости
	let GM = localMatrix(length);

	GM = GM.multiply(material); // 320 - это материал

	// Создание вектора узловых сил
	let VP = nj.array([
		point_1["load"].get(0),
		point_1["load"].get(1),
		point_2["load"].get(0),
		point_2["load"].get(1)
	]);

	let DGM = GM.clone();
	// Учет граничных условий или закрепления
	if (point_1["defenitions"].get(0)) {
		def(DGM, 0);
	}
	if (point_1["defenitions"].get(1)) {
		def(DGM, 1);
	}
	if (point_2["defenitions"].get(0)) {
		def(DGM, 2);
	}
	if (point_2["defenitions"].get(1)) {
		def(DGM, 3);
	}

	// Перемещение и повороты
	let solution = solve(DGM, VP);
	console.log(solution);
	console.log(nj.dot(GM, solution));
	return [
		[point_1["coordinates"].get(0), solution.get(0)],
		[point_2["coordinates"].get(0), solution.get(2)]
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
 * Distance between points.
 *
 * @constructor
 * @this {distance}
 * @param {nj.NdArray} point1
 * @param {nj.NdArray} point2
 * @return {Number}
 */
function distance(point1, point2) {
	return (
		((point2.get(0) - point1.get(0)) ** 2 +
			(point2.get(1) - point1.get(1)) ** 2) **
		0.5
	);
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
	let P1 = new createPoint([0, 0], [1, 1, 0]);
	let P2 = new createPoint([10, 0], [0, 0, 0], [1000, 0]);
	let E1 = new createElement([P1, P2], 9.9 * 10 ** 6 * 0.04909);
	let E2 = new createElement([P2, P1], 9.9 * 10 ** 6 * 0.04909);
	OneElementSolution(E1);
	OneElementSolution(E2);
	/*
        Max Deflection:	δmax=0.6859 in	@ x = L
        Max Slope:	θmax=0.1029 rad	@ x = L
        Shear:	V=+1000 lbf	constant
        Moment:	Mmax=−10,000 in-lbf	@ x = 0
    */
   let P3 = new createPoint([0, 0], [1, 1, 0], [0,0], 10);
   let P4 = new createPoint([5, 0], [0, 1, 0]);
   let E3 = new createElement([P3, P4],1);
   OneElementSolution(E3);

}
