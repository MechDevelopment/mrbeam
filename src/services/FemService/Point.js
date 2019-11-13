class Point {
	/** Creating a beam point.
	 * 
	 * @param {Array<Number>} coordinates [x, y]
	 * @param {Array<Boolean>} defenitions [x, y, r]
	 * @param {Array<Number>} load [x, y]
	 * @param {Number} moment
	 * @param {Boolean} joint
	 */
	constructor(
		coordinates,
		defenitions = [0, 0, 0],
		load = [0, 0],
		moment = 0,
		joint = false
	) {
		this.coordinates = coordinates;
		this.defenitions = defenitions;
		this.load = load;
		this.moment = moment;
		this.joint = joint;
	}
}

export default Point;
