export default class Point {
  /** Creating a beam point.
   *
   * @class
   * @this {Point}
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

// module.exports = Point;

/**
 * @example
 * // use constructor
 * let p = new Point([0, 0])
 * p = new Point([0, 0], [1, 1, 0])
 * p = new Point([0, 0], [1, 1, 0], [0, 5])
 * p = new Point([0, 0], [1, 1, 0], [0, 5], -10)
 * p = new Point([0, 0], [1, 1, 0], [0, 5], -10, true)
 *
 * // change parameters
 * p.coordinates = [1, 1]
 * p.defenitions = [0, 1, 0]
 * p.load = [0, -12]
 * p.moment = 15
 * p.joint = true
 */
