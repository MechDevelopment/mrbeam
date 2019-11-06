import LinearAlgebra from "./LinearAlgebra";
import Point from "./Point";
import Element from "./Element";
import { dot, zeros } from "numjs";

class BeamCalculation {
	/** Beam calculation using the finite element method.
	 *
	 * @param {Array<Element>} elements
	 * @param {Number} split_coeff
	 */
	constructor(elements, split_coeff = 1.0) {
		// Разбиение
		fragmentation(...arguments);

		// Рассчет
		this.calculation = calculate(elements);
	}



	displacement() {
		let label = Array.from(Array(1000), (el, index) => 0.01 * index);
		
		let eps = 1000000;
		let result1 = [];
		let result2 = [];
		for (let i = 0; i < this.calculation.solution.size / 3; i++) {
			// result1.push(
			// 	Math.round(points[i].coordinates[0] * eps) / eps
			// );
			result2.push(Math.round(this.calculation.solution.get(1 + i * 3) * eps) / eps);
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
	shear() {
		let eps = 100000;
		let result1 = [];
		let result2 = [];
		let add = this.calculation.reactions.get(1);
		for (let i = 0; i < this.calculation.reactions.size / 3 - 1; i++) {
			// result1.push(
			// 	Math.round(points[i].coordinates[0] * eps) / eps,
			// 	Math.round(points[i + 1].coordinates[0] * eps) / eps
			// );
			result2.push(
				Math.round(add * eps) / eps,
				Math.round(add * eps) / eps
			);
			add += this.calculation.reactions.get(1 + (i + 1) * 3);
		}
		return [result1, result2];
	}

	solution() {
		console.log(this.calculation.labels)
		return {
			labels: this.calculation.labels,
			displacement: this.displacement()[1],
			shear: this.shear()[1]
		};
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

export default BeamCalculation;

/** Разбиение балки на много маленьких балок
 *
 * @param {Array<Element>} elements
 * @param {Number} split_coeff
 */
function fragmentation(elements, split_coeff) {
	/**
	 * Что если удалять и забирать с помощью pop последний элемент
	 * а затем сплайсить в конец ново-созданные разбитые элементы,
	 * это должно немного упростить понимание той штуки внизу
	 * Таким образом появится ещё одна функция создания новых элементов
	 * на основе одного, а таким образом в дальнейшем можно будет разбить
	 * отдельно - выбранный элемент для точности. При этом таким образом можно будет
	 * задать при разбиении косоугольную распределенную нагрузку
	 *
	 */
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

	let res1 = [];
	let steph = 0.1;
	let nn = (result1[result1.length - 1] - result1[0]) / steph;
	for (let i = 0; i < nn; i++) {
		res1.push(steph*i)
	}
	
	

	return { solution: sol, reactions: r, labels: result1, label: res1 };
}
