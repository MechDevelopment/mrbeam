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






