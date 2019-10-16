// node -r esm
import Material from "./Material";
import Point from "./Point";
import Element from "./Element";
import BeamCalculation from "./BeamCalculation";

class BeamService {
	/** Service for Beam Calculation
	 *
	 * @method import(objects, fragmentation)
	 * @method results() or results
	 *
	 * @static generator(count_of_points)
	 */
	constructor() {
		this.results;
	}

	/** Import objects from "store"
	 *
	 * @param {Array<Object>} objects
	 *
	 * @todo
	 * load = [x, y, angle],
	 * defenition = [x, y, z],
	 * several results
	 */
	import(objects, split_coeff = 0.1) {
		// Variables
		console.log("BeamService Imported: " + objects);
		let push_flag; // flag for point push

		let point; // point class instance
		let element; // element class instance

		let points = []; // list of point class instance
		let elements = []; // list of element class instance

		let material = new Material(9.9 * 10 ** 6, 0.04909, 0.7854);

		// List of objects sort by X
		BeamService.sort(objects);

		// Create points
		objects.forEach(object => {
			push_flag = true;

			// Determine the coordinate
			if (points.length > 0) {
				if (object["x"] == points[points.length - 1].coordinates[0]) {
					point = points[points.length - 1];
					push_flag = false;
				} else {
					point = new Point([object["x"], 0]);
				}
			} else {
				point = new Point([object["x"], 0]);
			}

			// Add values in point
			switch (object["type"]) {
				case "Load":
					point.load = [0, point.load[1] - object["load"]];
					break;
				case "Defenition":
					point.defenitions = object["def"];
					break;
				case "Momentum":
					point.moment += object["load"];
					break;
				default:
					break;
			}

			// Push point
			if (push_flag) {
				points.push(point);
			}
		});

		// Create elements
		for (let i = 0; i < points.length - 1; i++) {
			elements.push(new Element([points[i], points[i + 1]], material));
		}

		// Calculation
		let BC = new BeamCalculation(elements, split_coeff);

		// Save results calculation
		this.results = BC.displacement;
	}

	// Getter
	getResults() {
		return this.results;
	}

	static sort(objects) {
		objects.sort(function(a, b) {
			if (a["x"] < b["x"]) {
				return -1;
			}
			if (a["x"] > b["x"]) {
				return 1;
			}
			return 0;
		});
	}
	/** Easy beam random generator
	 *
	 * @param {Number} count_of_points
	 *
	 * @return {Array<Object>}
	 */
	static generator(count_of_points) {
		let points = [];
		for (let i = 0; i < count_of_points; i++) {
			points.push({
				id: i + 1,
				type: "Load",
				x: i + 1,
				load: randomInteger(1, 100)
			});
		}
		if (randomInteger(0, 1)) {
			let coordinate;
			// Jestkoe zackreplenie
			points.push({
				id: 0,
				type: "Defenition",
				x: 0,
				def: [1, 1, 1]
			});
		} else {
			// Sharnirnoe zackreplenie
			points.push({
				id: 0,
				type: "Defenition",
				x: 0,
				def: [1, 1, 0]
			});
			points.push({
				id: count_of_points + 1,
				type: "Defenition",
				x: count_of_points + 1,
				def: [0, 1, 0]
			});
		}

		BeamService.sort(points);
		return points;
	}
}

/** Get a random integer number from (min-0.5) to (max + 0.5)
 *
 * @param {Number} min
 * @param {Number} max
 *
 * @return {Number}
 */
function randomInteger(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

export default BeamService;
