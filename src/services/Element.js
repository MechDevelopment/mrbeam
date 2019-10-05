const Material = require("./Material");
const Point = require("./Point");

class Element {
	/**
	 * Creating an element between points of a beam.
	 *
	 * @class
	 * @this {Element}
	 *
	 * @param {Array<Point>} points [Point1, Point2]
	 * @param {Material} material
	 * @param {Array<Number>} distributed_load [y1, y2]
	 */
	constructor(points, material, distributed_load = [0, 0]) {
		this.points = points;
		this.material = material;
		this.distributed_load = distributed_load;
	}

	/**
	 * Distance between points.
	 *
	 * @method
	 * @this {distance}
	 *
	 * @return {Number}
	 */
	get distance() {
		return (
			((this.points[1].coordinates[0] - this.points[0].coordinates[0]) ** 2 +
				(this.points[1].coordinates[1] - this.points[0].coordinates[1]) ** 2) **
			0.5
		);
	}
}

module.exports = Element;

/**
 * @example
 * // use constructor
 * let p1 = new Point([0, 0], [1, 1, 1])
 * let p2 = new Point([15, 0])
 * let m = new Material(648)
 *
 * let e = new Element([p1, p2], m)
 * e = new Element([p1, p2], m, [10, -10])
 *
 * // change parameters
 * m.A = 169
 * e.points = [p2, p1]
 * e.material = m
 * e.distributed_load = [0, 0]
 *
 * // use methods
 * console.log(e.distance) // 15
 *
 */
