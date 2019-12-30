class ChartPoints {
    constructor(elements, split_coeff, solutions, reactions) {
        
        // Необходимые переменные
        this.solutions =  solutions;
        this.reactions = reactions;
        this.labels = createLabels(elements, split_coeff);

        // Заполняем словарик
        let _shear = this.shear();
        let _disp = this.displacement();
        this.chart_points =  {
            labels: this.labels,
            displacement: _disp,
            max_displacement: Math.max(..._disp),
            min_displacement: Math.min(..._disp),
            shear: _shear,
            max_shear: Math.max(..._shear),
            min_shear: Math.min(..._shear)
        }
    }
    getChartPoints(){
        return this.chart_points;
    }

	displacement() {
		let eps = 1000000;
		let result = [];
		for (let i = 0; i < this.solutions.length / 3; i++) {
			result.push(Math.round(this.solutions[1 + i * 3] * eps) / eps);
		}
		return result;
	}

	/** Coordinates Shear-Diagram */
	shear() {
		let eps = 100000;
		let result = [];
		let add = this.reactions[1];
		for (let i = 0; i < this.reactions.length / 3 - 1; i++) {
			result.push(
				Math.round(add * eps) / eps,
				Math.round(add * eps) / eps
			);
			add += this.reactions[1 + (i + 1) * 3];
		}
		return result;
	}

	// get moment() {
	// 	return [
	// 		[elements[0].points[0].coordinates[0], this._reaction.get(2)],
	// 		[elements[0].points[1].coordinates[0], this._reaction.get(5)]
	// 	];
	// }

	// get max_deflection() {
	// 	return max([this._solution.get(1), this._solution.get(4)]);
	// }

	// get max_slope() {
	// 	return max([this._solution.get(2), this._solution.get(5)]);
	// }

	// get max_moment() {
	// 	return max([this._reaction.get(2), this._reaction.get(5)]);
	// }

	// get min_moment() {
	// 	return min([this._reaction.get(2), this._reaction.get(5)]);
    // }
    
}

export default ChartPoints;


function createLabels(elements, h) {
    // Переменные
    const A = elements[0].points[0].coordinates[0];
    const B = elements[elements.length - 1].points[1].coordinates[0];
    const N = (B - A) / h;

    // Заполняем массив
    let labels = [];
    for (let i = 0; i < N + 1; i++) {
        labels.push(A + i * h);
    }

    return labels;
}