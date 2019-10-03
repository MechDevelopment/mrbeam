// Here i will create beam calculations!!!
const nj = require('numjs')

FEM()

function FEM() {
    /// FEM: init function
    var point_1 = {
		coordinates: nj.array([0, 0]),
        defenitions: nj.array([1, 1, 0]),
        load: nj.array([0, 0]),
        moment: 0,
        joint: false,
	}
	
	var point_2 = {
		coordinates: nj.array([10, 0]),
        defenitions: nj.array([0, 0, 0]),
        load: nj.array([1000, 0]),
        moment: 0,
        joint: false,
	}
    
    // Перемещения в координатной форме [[x,y],[x,y]] - для двух точек (стандартный массив)
    return BuildEasySolution(point_1, point_2, 9.9 * (10 ** 6) * 0.04909)
    /*
        Max Deflection:	δmax=0.6859 in	@ x = L
        Max Slope:	θmax=0.1029 rad	@ x = L
        Shear:	V=+1000 lbf	constant
        Moment:	Mmax=−10,000 in-lbf	@ x = 0
    */
}




function BuildEasySolution(point_1, point_2, material){

	// Длина между точками элемента
    let length = distance(point_1['coordinates'], point_2['coordinates'])
    
    
	// Создание локальной (совпадает с глобальной) матрицы жесткости
    let GM = localMatrix(length)
    
	GM = GM.multiply(material) // 320 - это материал

	// Создание вектора узловых сил
    let VP = nj.array([
        point_1['load'].get(0),
        point_1['load'].get(1), 
        point_2['load'].get(0), 
        point_2['load'].get(1),
    ])
	
    let DGM = GM.clone()
	// Учет граничных условий или закрепления
	if (point_1['defenitions'].get(0)){
        def(DGM, 0)
    }
	if (point_1['defenitions'].get(1)){
        def(DGM, 1)
    }
	if (point_2['defenitions'].get(0)){
        def(DGM, 2)
    }
	if (point_2['defenitions'].get(1)){
        def(DGM, 3)
    }
	
	// Перемещение и повороты
	let solution = solve(DGM, VP)
    console.log(solution)
    console.log(nj.dot(GM, solution))
    return [
        [point_1['coordinates'].get(0), solution.get(0)],
        [point_2['coordinates'].get(0), solution.get(2)]]
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
function def(matrix, elem){
	for (i = 0; i < matrix.shape[0]; i++){
        matrix.set(i, elem, 0) 
        matrix.set(elem, i, 0) 
    }
    matrix.set(elem, elem, 1)
}

/**
 *
 * @constructor
 * @this {localMatrix}
 * @param {number} l length of element
 * @return {nj.NdArray}
 */
function localMatrix(l){
	return nj.array([
[12.0/l/l/l, 6.0/l/l, -12.0/l/l/l, 6.0/l/l],
[6.0/l/l, 4.0/l, -6.0/l/l, 2.0/l],
[-12.0/l/l/l, -6.0/l/l, 12.0/l/l/l, -6.0/l/l],
[6.0/l/l, 2.0/l, -6.0/l/l, 4.0/l]])
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
    return ((point2.get(0) - point1.get(0)) ** 2 + (point2.get(1) - point1.get(1)) ** 2) ** 0.5
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
function solve(matrix, vector){
    // Check assert
    console.assert(matrix instanceof nj.NdArray, "Solve: matrix is not NdArray.")
    console.assert(vector instanceof nj.NdArray, "Solve: vector is not NdArray.")
    console.assert(matrix.shape[0] == matrix.shape[1], "Solve: matrix is not square.")
    console.assert(matrix.shape[0] == vector.shape[0], "Solve: vector size is not equal to matrix size.")

    // Private variables
    let n = vector.size
    let flag

    // Create slau
    let slau = nj.concatenate(matrix.clone(), vector.reshape(n, 1))
	
	for (i = 0; i < n; i++){
		// Go by diagonally
		if (slau.get(i, i) != 1){
			// if 0
			if (slau.get(i, i) == 0){
                flag = true
                
                // Remove 0
				for (j = i + 1; j < n - 1; j++){
					if (slau.get(j, i) != 0){
                        let slaui = slau.get(i)
                        slau.set(i, slay.get(j))
                        slau.set(j, slaui)
                        flag = false
                    }
                }
				 // Return 0
				 if (flag){
                     return null;
                 }
            }
			// if not equal to 1
			let slauii = slau.get(i, i)
			for (j = 0; j < n + 1; j++){
                slau.set(i, j, slau.get(i, j) / slauii)
            }
        }
		// Change the lines
		for (j = 0; j < n; j++){
			if (j == i || slau.get(j, i) == 0){
                continue;
            }
			let slauji = slau.get(j, i)
			for (k = 0; k < n + 1; k++){
                slau.set(j, k, slau.get(j, k) - slau.get(i,k) * slauji)
            }
        }
    }

    return slau.T.slice(-1).flatten()
}

<<<<<<< HEAD
=======
const mj = require("mathjs");
const nj = require("numjs");
console.log(nj.zeros([3, 6]));
>>>>>>> c860387b0b5998480aaf1379a6e02594e0f6b934
/*
point = {
    coordinates: [0, 0],
    defenitions: [0, 0, 0],
    load: [0, 0],
    moment: 0,
    joint: false,
    
}

element = {
    points: [point, point],
    distributed_load: [0,0],
    material: 134314341,
}

function FEM(points, elements){
    
}

*/

export default function() {
  console.log("Finite Elements");
}
