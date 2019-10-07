import BeamCalculation from "./BeamCalculation";
import Material from "./Material";
import Point from "./Point";
import Element from "./Element";
import { config } from "numjs";

let start = new Date();
main();
console.log("Time:", (new Date() - start) * 0.001, "sec");

function main() {
	// Тут создаем пару точек, материал и один элемент
	config.printThreshold = 9;
	console.log(Point)
	let P1 = new Point([0, 0], [1, 1, 1]);
	console.log(P1)
	let P2 = new Point([10, 0], [0, 0, 0], [0, -1000]);
	let m = new Material(9.9 * 10 ** 6, 0.04909, 0.7854);
	let E = new Element([P1, P2], m);

	// На данный момент может принимать и расчитывать только один элемент,
	// без распределенной нагрузки, возвратит только две точки.
	let BC = new BeamCalculation([E])
	console.log(BC._solution);
	console.log(BC._reaction);
	/*
	    Max Deflection:	δmax=0.6859 in	@ x = L
	    Max Slope:	θmax=0.1029 rad	@ x = L
	    Shear:	V=+1000 lbf	constant
	    Moment:	Mmax=−10,000 in-lbf	@ x = 0
	*/
	P1 = new Point([0, 0], [1, 1, 0]);
	P2 = new Point([5, 0], [0, 0, 0], [0, -100]);
	let P3 = new Point([10, 0], [0, 1, 0], [0,0]);
	m = new Material(9.9 * 10 ** 6, 0.04909, 0.7854);
	let E1 = new Element([P1, P2], m);
	let E2 = new Element([P2, P3], m);

	let BC1 = new BeamCalculation([E1, E2]);
	console.log(BC1._solution);
	console.log(BC1._reaction);
}
