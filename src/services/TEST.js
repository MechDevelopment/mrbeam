// node -r esm
import Material from "./Material";
import Point from "./Point";
import Element from "./Element";
import BeamCalculation from "./BeamCalculation";
import { config } from "numjs";
class FemService {
	constructor() {
		this.reaction;
	}

	import(list) {
		let point;
		let points = [];
		for (let i = 0; i < list.length; i++) {
			point = new Point([list[i]["x"], 0]);
			switch (list[i]["type"]) {
				case "Load":
					point.load = [0, -list[i]["load"]];
					break;
				case "Defenition":
					point.defenitions = [list[i]["load"], 1, 0];
					break;
				case "Momentum":
					point.moment = list[i]["load"];
					break;
				default:
					break;
			}

			points.push(point);
		}
		let element;
		let elements = [];
		let m = new Material(1);
		for (let i = 0; i < points.length - 1; i++) {
			element = new Element([points[i], points[i + 1]], m);

			elements.push(element);
		}

		let BC = new BeamCalculation(elements);

		this.reaction = BC._reaction;
	}

	getResult() {
		return this.reaction;
	}

	static generateBeam(count_of_points) {
		let points = [];
		points.push({
			id: 0,
			type: "Defenition",
			x: 0,
			load: 1
		});
		for (let i = 0; i < count_of_points; i++) {
			points.push({
				id: i + 1,
				type: "Load",
				x: i + 1,
				load: randomInteger(1, 100)
			});
		}
		points.push({
			id: count_of_points + 1,
			type: "Defenition",
			x: count_of_points + 1,
			load: 0
		});
		return points;
	}
}

function randomInteger(min, max) {
	// получить случайное число от (min-0.5) до (max+0.5)
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

export default FemService;

config.printThreshold = 16;
// let FS = new FemService()
// FS.import(FemService.generateBeam(3))
// console.log(FS.getResult());

// let P1 = new Point([0,0], [1,1,1])
// let P2 = new Point([10,0], [0,0,0], [0,-1000])
// let m = new Material(9.9 * (10**6), 0.04909, 0.7854)
// let element = new Element([P1,P2], m)
// let BC = new BeamCalculation([element])
// console.log(BC._solution)
// console.log(BC._reaction)

// Max Deflection:	δmax=0.6859 in	@ x = L
// Max Slope:	θmax=0.1029 rad	@ x = L
// Shear:	V=+1000 lbf	constant
// Moment:	Mmax=−10,000 in-lbf	@ x = 0

let P1 = new Point([0,0], [1,1,0])
let P2 = new Point([5,0], [0,0,0], [0,-1000])
let P3 = new Point([10,0], [0,1,0], [0,0])
let m = new Material(10 * (10**6), 0.04909, 0.7854)
let E1 = new Element([P1,P2], m)
let E2 = new Element([P2,P3], m)

// let start
// let BC
// for (let i = 0; i < 100; i++) {
// 	start = new Date();
// 	BC = new BeamCalculation([E1,E2], i)
// 	console.log("Count:", i*2, "Time:", (new Date() - start) * 0.001, "sec");
// }
let BC = new BeamCalculation([E1,E2])

//console.log(BC._solution)
//console.log(BC._reaction)
//Max Deflection:	0.04244 in	5.000 in