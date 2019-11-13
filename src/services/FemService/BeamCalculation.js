import LinearAlgebra from "./LinearAlgebra";
import ChartPoints from "./ChartPoints";
import Point from "./Point";
import Element from "./Element";
import { dot } from "numjs";

class BeamCalculation {
    /** Beam calculation using the finite element method.
     *
     * @param {Array<Element>} elements array with Elements
     * @param {Number} split_coeff coeff for fragmentation
     */
    constructor(elements, split_coeff = 1.0) {
        fragmentation(...arguments);
		this.calculation = calculate(elements);
        
        // Добавляем лейблы
		this.calculation.labels = ChartPoints.createLabels(...arguments);
    }

    /** Chart points and numbers */
    getSolution() {
        let calc = this.calculation;

        let _shear = ChartPoints.shear(calc);
        let _disp = ChartPoints.displacement(calc);

        return {
            labels: calc.labels,
            displacement: _disp,
            max_displacement: Math.max(..._disp),
            min_displacement: Math.min(..._disp),
            shear: _shear,
            max_shear: Math.max(..._shear),
            min_shear: Math.min(..._shear),
        };
    }
}
export default BeamCalculation;

/** Разбиение балки */
function fragmentation(elements, split_coeff) {
    // Параметры
    let h;
    let add_point;
    let add_element;
    let count;

    // Проходимся по элементам с конца и разбиваем их
    for (let i = elements.length - 1; i >= 0; i--) {
        // Определяем количество новых элементов и шаг
        count = elements[i].length / split_coeff;
        h = elements[i].length / count;

        // Создаем новые точки и элементы
        for (let j = 1; j < count; j++) {
            add_point = new Point([
                elements[i].points[1].coordinates[0] - h,
                0,
            ]);
            add_element = new Element(
                [elements[i].points[0], add_point],
                elements[i].material,
                elements[i].distributed_load
            );

            // Добавляем новые элементы в конец
            elements[i].points[0] = add_point;
            elements.splice(i, 0, add_element);
        }
    }
    return elements;
}

/** Метод конечных элементов для балки */
function calculate(elements) {
    // Количество элементов
    const N = elements.length; // Count of elements

    // Строим глобальная матрицу жесткости и глобальный вектор
    const MATRIX = LinearAlgebra.createGlobalMatrix(elements, N);
    const VECTOR = LinearAlgebra.createGlobalVector(elements, N);

    // Вектор граничных условий
    const DEFENITIONS = LinearAlgebra.createDefVector(elements, N);

    // Учитывая граничные условия имеем
    const DMATRIX = LinearAlgebra.setDefMatrix(MATRIX, DEFENITIONS);
    const DVECTOR = LinearAlgebra.setDefVector(VECTOR, DEFENITIONS);

    // Получаем всевозможные решения
    const SOLUTIONS = LinearAlgebra.solve(DMATRIX, DVECTOR);
	const REACTIONS = LinearAlgebra.multiply(SOLUTIONS, MATRIX);
	
    return { solutions: SOLUTIONS, reactions: REACTIONS};
}
