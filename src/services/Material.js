class Material {
	/**
	 * Creating a material.
	 *
	 * @class
	 * @this {Material}
	 *
	 * @param {Number} EJ - E or EJ
	 * @param {Number} E - elastic modulus
	 * @param {Number} J - moment of inertia
	 * @param {Number} A - area
	 *
	 */
	constructor(EJ, J = null, A = null) {
		this.E = EJ;
		this.J = J;
		this.A = A;

		if (this.J == null) {
			this.EJ = this.E;
			this.E = null;
		} else {
			this.EJ = this.E * this.J;
		}
	}
}

module.exports = Material;

/**
 * @example
 *
 * let m = new Material(2);
 * console.log(m.EJ) // 2
 * console.log(m.E) // null
 * console.log(m.J) // null
 * console.log(m.A) // null
 * 
 * m = new Material(2, 3);
 * console.log(m.EJ) // 6
 * console.log(m.E) // 2
 * console.log(m.J) // 3
 * console.log(m.A) // null
 * 
 * m = new Material(2, 3, 1);
 * console.log(m.EJ) // 6
 * console.log(m.E) // 2
 * console.log(m.J) // 3
 * console.log(m.A) // 1
 *
 */
