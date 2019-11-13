import LinearAlgebra from "./LinearAlgebra";
import ChartPoints from "./ChartPoints";
import Point from "./Point";
import Element from "./Element";
import { dot, zeros } from "numjs";

class BeamCalculation {
	/** Beam calculation using the finite element method.
	 *
	 * @param {Array<Element>} elements array with Elements
	 * @param {Number} split_coeff coeff for fragmentation
	 */
	constructor(elements, split_coeff = 1.0) {
		fragmentation(...arguments);
		this.calculation = calculate(elements);
	}

	/** Chart points and numbers */
	getSolution() {
		return {
			labels: this.calculation.labels,
			displacement: ChartPoints.displacement(this.calculation),
			shear: ChartPoints.shear(this.calculation)
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
				0
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
	// Параметры
	let local; // Локальная матрица элемента
	let global; // Глобальная матрица жесткости
	let elements_count = elements.length;
	let points;

	// Заполняем глобальную матрицу
	global = zeros([elements_count * 3 + 3, elements_count * 3 + 3]);
	for (let index = 0; index < elements_count; index++) {
		local = elements[index].local_matrix;
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 6; j++) {
				global.set(
					i + 3 * index,
					j + 3 * index,
					global.get(i + 3 * index, j + 3 * index) + local[i][j]
				);
			}
		}
	}

	// Создадим массив точек отдельно
	points = [elements[0].points[0]];
	for (let i = 0; i < elements_count; i++) {
		points.push(elements[i].points[1]);
	}

	// Найс костыль)
	// И вот как теперь сделать???
	// Новый костыль?
	// эхх
	let global_vector = zeros([elements_count * 3 + 3]);
	let DGM = global.clone();

	for (let i = 0; i < points.length; i++) {
		global_vector.set(0 + 3 * i, points[i].load[0]);
		// Внимание, костыли
		if (i < elements_count) {
			global_vector.set(
				1 + 3 * i,
				points[i].load[1] + elements[i].distributed_load[0]
			);
		} else {
			global_vector.set(
				1 + 3 * i,
				points[i].load[1] + elements[i - 1].distributed_load[1]
			);
		}

		global_vector.set(2 + 3 * i, points[i].moment);
		for (let j = 0; j < 3; j++) {
			if (points[i].defenitions[j]) {
				LinearAlgebra.zerosRowAndColumn(DGM, i * 3 + j);
			}
		}
	}

	// console.log(global);
	// console.log(global_vector);
	// console.log(DGM);
	let sol = LinearAlgebra.solve(DGM, global_vector);
	let r = dot(sol, global);
	for (let i = 0; i < points.length; i++) {
		if (points[i].defenitions[1] == 1) {
			sol.set(i * 3 + 1, 0);
			sol.set(i * 3 + 2, 0);
		}
	}

	let eps = 1000000;
	let result1 = [];
	for (let i = 0; i < sol.size / 3; i++) {
		result1.push(Math.round(points[i].coordinates[0] * eps) / eps);
	}

	return { solution: sol, reactions: r, labels: result1};
}
