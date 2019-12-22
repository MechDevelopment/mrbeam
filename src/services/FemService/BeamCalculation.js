import {LinearAlgebra} from "./LinearAlgebra"; // Для МКЭ
import ChartPoints from "./ChartPoints"; // Получение графиков
import { Point, Element } from "./Element"; // Для фрагментации

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
        const CALCULATION = calculate(...arguments);

        // Строим точки для графиков
        let CP = new ChartPoints(...arguments, ...CALCULATION);
        this.solution = CP.getChartPoints();
    }

    /** Solution - JSON object with calculated data */
    getSolution() {
        return this.solution;
    }
}

// Экспорт класса
export default BeamCalculation;

function calculate(elements, split_coeff) {
    // Количество элементов
    const N = elements.length;

    // Строим глобальная матрицу жесткости и глобальный вектор
    const MATRIX = LinearAlgebra.createGlobalMatrix(...arguments, N);
    const VECTOR = LinearAlgebra.createGlobalVector(...arguments, N);

    // Вектор граничных условий
    const DEFENITIONS = LinearAlgebra.createDefVector(...arguments, N);

    // Учитывая граничные условия имеем
    const DMATRIX = LinearAlgebra.setDefMatrix(MATRIX, DEFENITIONS);
    const DVECTOR = LinearAlgebra.setDefVector(VECTOR, DEFENITIONS);

    // Получаем всевозможные решения
    const SOLUTIONS = LinearAlgebra.solve(DMATRIX, DVECTOR);
    const REACTIONS = LinearAlgebra.multiply(SOLUTIONS, MATRIX);

    return [SOLUTIONS, REACTIONS];
}

function fragmentation(elems, split_coeff) {
    let count; // Количество новых элементов для "старого" элемента
    let new_point; // Для записи новой точки
    let new_elem; // Для записи нового элемента

    // Проходимся по массиву элементов с конца
    for (let i = elems.length - 1; i >= 0; i--) {
        count = elems[i].length / split_coeff;

        for (let j = 1; j < count; j++) {
            // Создаем дополнительную пустую точку
            new_point = new Point([
                elems[i].points[1].coordinates[0] - split_coeff,
                0
            ]);

            // Дублируем элемент, изменяя вторую точку
            new_elem = new Element(
                [elems[i].points[0], new_point],
                elems[i].material,
                elems[i].distributed_load
            );

            // Уменьшаем "старый" элемент
            elems[i].points[0] = new_point;

            // Добавляем новый элемент перед "старым"
            elems.splice(i, 0, new_elem);
        }
    }
}