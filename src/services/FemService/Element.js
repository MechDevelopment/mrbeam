import Material from "./Material";
import Point from "./Point";

class Element {
	/** Creating an element between points of a beam.
	 *
	 * @param {Array<Point>} points [Point1, Point2]
	 * @param {Material} material
	 * @param {Array<Number>} distributed_load [y1, y2]
	 *
	 * @method length - distance between points
	 * @method local_matrix - local stiffness matrix
	 * @method local_vector - local load vector
	 */
	constructor(points, material, distributed_load = []) {
		this.points = points;
		this.material = material;
		this.distributed_load = distributed_load;
	}

	/** Distance between points.
	 *
	 * @method
	 * @this {length}
	 *
	 * @return {Number}
	 */
	get length() {
		return (
			((this.points[1].coordinates[0] - this.points[0].coordinates[0]) **
				2 +
				(this.points[1].coordinates[1] -
					this.points[0].coordinates[1]) **
					2) **
			0.5
		);
	}

	/** Create stiffness matrix.
	 *
	 * @method
	 * @this {local_matrix}
	 *
	 * @return {Array<Array<Number>>}
	 */
	get local_matrix() {
		let l = this.length;
		let EJ = this.material.EJ;
		let EA = 1;
		if (this.material.A != null && this.material.E != null) {
			EA = this.material.A * this.material.E;
		}
		return [
			[EA / l, 0, 0, -EA / l, 0, 0],
			[
				0,
				(12 * EJ) / l / l / l,
				(6 * EJ) / l / l,
				0,
				-(12 * EJ) / l / l / l,
				(6 * EJ) / l / l
			],
			[
				0,
				(6 * EJ) / l / l,
				(4 * EJ) / l,
				0,
				-(6 * EJ) / l / l,
				(2 * EJ) / l
			],
			[-EA / l, 0, 0, EA / l, 0, 0],
			[
				0,
				-(12 * EJ) / l / l / l,
				-(6 * EJ) / l / l,
				0,
				(12 * EJ) / l / l / l,
				-(6 * EJ) / l / l
			],
			[
				0,
				(6 * EJ) / l / l,
				(2 * EJ) / l,
				0,
				-(6 * EJ) / l / l,
				(4 * EJ) / l
			]
		];
	}

	/** Create load vector
	 *
	 * @method
	 * @this {local_vector}
	 *
	 * @return {Array<Number>}
	 */
	local_vector(step) {
		let p1 = this.points[0];
        let p2 = this.points[1];

        let d1 = 0;
        let d2 = 0;
        this.distributed_load.forEach(func => {        
            d1 += func(p1.coordinates[0]) * step;
            d2 += func(p2.coordinates[0]) * step;
        });
        
		return [
			p1.load[0],
			p1.load[1] + d1,
			p1.moment,
			p2.load[0],
			p2.load[1] + d2,
			p2.moment
		];
    }
    
    get def_vector(){
        let p1 = this.points[0];
		let p2 = this.points[1];
        return [
            ...p1.defenitions, ...p2.defenitions
        ];
    }
}

export default Element;