// node -r esm
import Material from "./Material";
import Point from "./Point";
import Element from "./Element";
import BeamCalculation from "./BeamCalculation";

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

let FS = new FemService()
FS.import(FemService.generateBeam(3))

console.log(FS.getResult());
