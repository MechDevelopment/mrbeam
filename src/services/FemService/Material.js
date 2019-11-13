class Material {
	/** Creating a material.
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

export default Material;