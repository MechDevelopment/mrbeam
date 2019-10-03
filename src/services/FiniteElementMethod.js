// Here i will create beam calculations!!!
const nj = require('numjs')

FEM()

function FEM() {
    /// FEM: init function
    var point_1 = {
		coordinates: [0, 0],
        defenitions: [0, 0, 0],
        load: [0, 0],
        moment: 0,
        joint: false,
	}
	
	var point_2 = {
		coordinates: [0, 0],
        defenitions: [0, 0, 0],
        load: [0, 0],
        moment: 0,
        joint: false,
	}
    
    let M1 = nj.array([[1, 1, -1], [1, -1, 1], [-1, 1, 1]])
    let f1 = nj.array([4, 2, 0])

    let M2 = nj.array([[2, 5, 4, 1], [1, 3, 2, 1], [2, 10, 9, 7], [3, 8, 9, 2]])
    let f2 = nj.array([20, 11, 40, 37])
    console.log(Solve(M1,f1)); // 3 2 1

    console.log(Solve(M2,f2)); // 1 2 2 0
    /*
    BuildEasySolution(point_1, point_2)
    
    let M = nj.array([[2, 5, 4, 1], [1, 3, 2, 1], [2, 10, 9, 7], [3, 8, 9, 2]])
    let f = nj.array([20, 11, 40, 37])

    
    return BuildEasySolution(point_1, point_2)
    */
}




function BuildEasySolution(point_1, point_2){

	
	// Длина между точками элемента
    let length = distance(point_1["point"],point_2["point"])
    
	// Создание локальной (совпадает с глобальной) матрицы жесткости
	let GM = LocalMatrix(length)
	GM = GM.multiply(320.0)
	
	// Создание вектора узловых сил
	let VP = [point_1["power"].x, point_1["power"].y, point_2["power"].x, point_2["power"].y]
	
	
	let DGM = GM.slice()
	// Учет граничных условий или закрепления
	if (point_1["defenition"][0]){
        Def(DGM, 0)
    }
	if (point_1["defenition"][1]){
        Def(DGM, 1)
    }
	if (point_2["defenition"][0]){
        Def(DGM, 2)
    }
	if (point_2["defenition"][1]){
        Def(DGM, 3)
    }
	
	// Решение матричного уравнения MG * VX = VP
	console.log(GM)
	console.log(VP)
	
	// Перемещение и повороты
	var VS = Solve(DGM, VP)
	console.log(VS)
	
	// Продольные силы и моменты

	console.log(nj.multiply(GM, VS))
}
	
	
function Def(M, elem){
	for (let i = 0; i < M.size(); i++){
		for (let j = 0; j < M.size(); j++){
			if (j == elem || i == elem){
                M[i][j] = 0
            }
        }
    }
	M[elem][elem] = 1
	
	return M
}

function LocalMatrix(l){
	return nj.array([
[12.0/l/l/l, 6.0/l/l, -12.0/l/l/l, 6.0/l/l],
[6.0/l/l, 4.0/l, -6.0/l/l, 2.0/l],
[-12.0/l/l/l, -6.0/l/l, 12.0/l/l/l, -6.0/l/l],
[6.0/l/l, 2.0/l, -6.0/l/l, 4.0/l]])
}

function distance(point1, point2) {
    return nj.sqrt((point2[0] - point1[0]) ** 2 + (point2[1] - point1[1]) ** 2);
}


/**
 * Solves a system of linear equations.
 *
 * @constructor
 * @this {Solve} Gauss-Jordan Elimination
 * @param {nj.NdArray} matrix system matrix
 * @param {nj.NdArray} vector system vector
 * @return {nj.NdArray} vector solutions
 */
function Solve(matrix, vector){
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
	
	// Вычисления
	for (i = 0; i < n; i++){
		// Идем по диагонали
		if (slau.get(i, i) != 1){
			// Убираем 0
			if (slau.get(i, i) == 0){
				flag = true;
				for (j = i + 1; j < n - 1; j++){
					if (slau.get(j, i) != 0){
                        let slaui = slau.get(i)
                        slau.set(i, slay.get(j))
                        slau.set(j, slaui)

                        flag = false;
                    }
                }
				 // Выводим null, если нельзя убрать 0
				 if (flag){
                     return null;
                 }
            }
			// Убираем число неравное 1
			let slauii = slau.get(i, i)
			for (j = 0; j < n + 1; j++){
                slau.set(i, j, slau.get(i, j) / slauii)
            }
        }
		// Изменяем строки
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
	// Возвращаем результат
    return slau.T.slice(-1).flatten()
}

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