import Material from "./Material";
import Point from "./Point";
export default class Element {
  /** Creating an element between points of a beam.
   *
   * @class
   * @this {Element}
   *
   * @param {Array<Point>} points [Point1, Point2]
   * @param {Material} material
   * @param {Array<Number>} distributed_load [y1, y2]
   *
   * @method length - distance between points
   * @method local_matrix - local stiffness matrix
   * @method local_vector - local load vector
   */
  constructor(points, material, distributed_load = [0, 0]) {
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
      ((this.points[1].coordinates[0] - this.points[0].coordinates[0]) ** 2 +
        (this.points[1].coordinates[1] - this.points[0].coordinates[1]) ** 2) **
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
      [0, (6 * EJ) / l / l, (4 * EJ) / l, 0, -(6 * EJ) / l / l, (2 * EJ) / l],
      [-EA / l, 0, 0, EA / l, 0, 0],
      [
        0,
        -(12 * EJ) / l / l / l,
        -(6 * EJ) / l / l,
        0,
        (12 * EJ) / l / l / l,
        -(6 * EJ) / l / l
      ],
      [0, (6 * EJ) / l / l, (2 * EJ) / l, 0, -(6 * EJ) / l / l, (4 * EJ) / l]
    ];
  }

  /** Create load vector
   *
   * @method
   * @this {local_vector}
   *
   * @return {Array<Number>}
   */
  get local_vector() {
    let p1 = this.points[0];
    let p2 = this.points[1];
    return [
      p2.moment,
      p1.load[0],
      p1.load[1],
      p1.moment,
      p2.load[0],
      p2.load[1]
    ];
  }
}

// module.exports = Element;

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
 * console.log(e.length) // 15
 * e.local_matrix // matrix 6x6
 * e.local_vector // vector 6
 */
