/** Interpolation class	(only static function)
 *
 * @static linear
 * @static lagrange
 * @static newton
 */
class Interpolation {
	//STATIC

	/** Linear interpolation
	 *
	 * @param {Array<Number>} x list of labels
	 * @param {Array<Array<Number>>} points list of bad points
	 */
	static linear(x, points) {
		let interpolation = [points[1][0]];

		for (let i = 1; i < x.length; i++) {
			let index =
				points[0].findIndex(
					element => element > x[i] - 0.0000000000001
				) - 1;

			let [fx0, fx1] = points[1].slice(index);
			let [x0, x1] = points[0].slice(index);

			interpolation.push(fx0 + ((fx1 - fx0) / (x1 - x0)) * (x[i] - x0));
		}
		return interpolation;
	}

	/** Lagrange interpolation
	 *
	 * @param {Array<Number>} x list of labels
	 * @param {Array<Array<Number>>} points list of bad points
	 */
	static lagrange(label, points) {
		let [x, y] = points;

		function basis(t, index) {
			let P = 1;
			for (let j = 0; j < x.length; j++) {
				if (j != index) P *= (t - x[j]) / (x[index] - x[j]);
			}
			return P;
		}

		return label.map(element => {
			let sum = 0;
			for (let i = 0; i < x.length; i++) {
				sum += y[i] * basis(element, i);
			}
			return sum;
		});
	}

	/** Direct Newton interpolation
	 *
	 *  Please points[0] < 10, so long for points !!!
	 *
	 * @param {Array<Number>} x list of labels
	 * @param {Array<Array<Number>>} points list of bad points
	 */
	static newton(label, points) {
		console.assert(
			points[0].length < 10,
			"Interpoaltion.newton, points[0] >= 10!"
		);
		let [x, y] = points;

		// Divided differences
		function Delta(xy) {
			let [x, y] = xy;

			if (x.length == 2) {
				return (y[1] - y[0]) / (x[1] - x[0]);
			} else {
				let bef = xy.map(arr => arr.slice(1));
				let aft = xy.map(arr => arr.slice(0, arr.length - 1));
				return (Delta(bef) - Delta(aft)) / (x[x.length - 1] - x[0]);
			}
		}

		function mult(t, index) {
			let P = 1;
			for (let j = 0; j < index + 1; j++) {
				P *= t - x[j];
			}
			return P;
		}

		return label.map(element => {
			let sum = y[0];
			for (let i = 0; i < x.length - 1; i++) {
				let slice = points.map(arr => arr.slice(0, i + 2));
				sum += mult(element, i) * Delta(slice);
			}
			return sum;
		});
	}
}

export default Interpolation;

Interpolation.newton(
	[1, 2, 3, 4, 5],
	[[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]
);
