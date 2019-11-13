class ChartPoints{
    static displacement(calc) {
        let label = Array.from(Array(1000), (el, index) => 0.01 * index);
        
        let eps = 1000000;
        let result1 = [];
        let result2 = [];
        for (let i = 0; i < calc.solution.size / 3; i++) {
            // result1.push(
            // 	Math.round(points[i].coordinates[0] * eps) / eps
            // );
            result2.push(Math.round(calc.solution.get(1 + i * 3) * eps) / eps);
        }
    
        return [result1, result2]
    }
    
    // get moment() {
    // 	return [
    // 		[elements[0].points[0].coordinates[0], this._reaction.get(2)],
    // 		[elements[0].points[1].coordinates[0], this._reaction.get(5)]
    // 	];
    // }
    
    /** Coordinates Shear-Diagram */
    static shear(calc) {
        let eps = 100000;
        let result1 = [];
        let result2 = [];
        let add = calc.reactions.get(1);
        for (let i = 0; i < calc.reactions.size / 3 - 1; i++) {
            // result1.push(
            // 	Math.round(points[i].coordinates[0] * eps) / eps,
            // 	Math.round(points[i + 1].coordinates[0] * eps) / eps
            // );
            result2.push(
                Math.round(add * eps) / eps,
                Math.round(add * eps) / eps
            );
            add += calc.reactions.get(1 + (i + 1) * 3);
        }
        return [result1, result2];
    }
    
    
    
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
    
    // get max_shear() {
    // 	return max([-this._reaction.get(1), this._reaction.get(4)]);
    // }
    
    // get min_shear() {
    // 	return min([-this._reaction.get(1), this._reaction.get(4)]);
    // }
}


export default ChartPoints;