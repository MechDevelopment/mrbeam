class Interpolation {
    /** Function recovery points from points
     * 
     * @param {Array<Number>} x list of labels
     * @param {Array<Array<Number>>} points list of bad points
     */
	static linear(x, points) {
		let error = 0.00001;
		let interpolation = [points[1][0]];

		for (let i = 1; i < x.length; i++) {
			let index =
				points[0].findIndex(element => element > x[i] - error) - 1;

			let [fx0, fx1] = points[1].slice(index);
			let [x0, x1] = points[0].slice(index);

			interpolation.push(fx0 + ((fx1 - fx0) / (x1 - x0)) * (x[i] - x0));
		}
		return interpolation;
	}

    /** Function recovery points from points
     * 
     * @param {Array<Number>} x list of labels
     * @param {Array<Array<Number>>} points list of bad points
     */
	static lagrange(label, points) {
        let [x, y] = points;

        /** Polinom multip */
        function l(t, index) {
            let P = 1;
            for (let j = 0; j < x.length; j++) {
                if (j != index) P *= (t - x[j]) / (x[index] - x[j]);
            }
            return P;
        }

		return label.map(element => {
            let sum = 0;
            for (let i = 0; i < x.length; i++) {
                sum += y[i] * l(element, i);
            }
            return sum;
        });
    }
}

export default Interpolation;



console.log(
	Interpolation.linear(
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		[[0, 1, 5, 10], [10, 2, 5, 8]]
	)
);
console.log(
	Interpolation.lagrange(
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		[[0, 1, 5, 10], [10, 2, 5, 8]]
	)
);
