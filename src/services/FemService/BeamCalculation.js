import LinearAlgebra from "./LinearAlgebra";
import ChartPoints from "./ChartPoints";
import Point from "./Point";
import Element from "./Element";

class BeamCalculation {
    /** Beam calculation using the finite element method.
     *
     * @param {Array<Element>} elements array with Elements
     * @param {Number} split_coeff coeff for fragmentation
     */
    constructor(elements, split_coeff = 1.0) {
        // Разбиваем элементы
        fragmentation(...arguments);

        // Рассчитываем балку
        const CALCULATION = calculate(elements);

        // Строим точки для графиков и не только
        let CP = new ChartPoints(...arguments, ...CALCULATION);
        this.solution = CP.getChartPoints();
    }

    /** Решение - объект JSON с необходимыми данными */
    getSolution() {
        return this.solution;
    }
}
export default BeamCalculation;

/** Метод конечных элементов для балки 
 * 
 * @param {Array<Element>} elements
*/
function calculate(elements) {
    // Количество элементов
    const N = elements.length;

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
	
    return [SOLUTIONS, REACTIONS];
}

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