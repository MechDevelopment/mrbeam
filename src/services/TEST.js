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

		let BC = new BeamCalculation(elements)
		
		this.reaction = BC._reaction
	}

	getResult(){
		return this.reaction;
	}
}
export default FemService;