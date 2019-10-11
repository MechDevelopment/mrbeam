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
	import(objects, split_coeff = 0.5) {
		// Variables
		console.log(objects)
		let push_flag; // flag for point push

		let point; // point class instance
		let element; // element class instance

		let points = []; // list of point class instance
		let elements = []; // list of element class instance

		let material = new Material(9.9 * 10 ** 6, 0.04909, 0.7854);

		// Sort a list of objects
		objects.sort(function(a, b) {
			if (a["x"] < b["x"]) {
				return -1;
			}
			if (a["x"] > b["x"]) {
				return 1;
			}
			return 0;
		});

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
					point.defenitions = [object["load"], 1, 0];
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
		console.log(points)
		// Create elements
		for (let i = 0; i < points.length - 1; i++) {
			elements.push(new Element([points[i], points[i + 1]], material));
		}

		// Calculation
		let BC = new BeamCalculation(elements, split_coeff);

		// Save results calculation
		this.results = BC.displacement;
	}

	results() {
		return this.results;
	}

	/** Easy beam random generator
	 * 
	 * @param {Number} count_of_points 
	 * 
	 * @return {Array<Object>}
	 */
	static generator(count_of_points) {
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