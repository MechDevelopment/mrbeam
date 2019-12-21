import { sortX } from "./Parser";
import { randint } from "../Utilus";

/** Create JSON points 
* @param {Number} count count of point
* @param {Number} complexity beam complexity (from 0 to 2)
* 
    complexity 0 - Симметричные балки с распределнной нагрузкой,
    моментами или силами, на выходе будем иметь только эпюры и реакции.
    complexity 1 - Убираем симметрию, добавляем шарниры и единый материал. 
    complexity 2 - Добавляем различный материал.
        
*/
function generateUnits(count, complexity) {
  let units = [];
  const N = count - 1;
  let shift = null;
  let type;

  if (complexity == 1) {
    // Первым делом сгенерируем закрепление(ия)
    if (randint(0, 1)) {
      // Жесткое
      if (randint(0, 1)) {
        // В начале отрезка
        units.push(create(0, [0], 3, [3]));
      } else {
        // В конце отрезка
        units.push(create(N, [N], 3, [3]));
      }
    } else {
      // Шарнирное
      shift = randint(0, ((N - 1) / 2) >> 0);
      units.push(create(0 + shift, [0 + shift], 3, [2]));
      units.push(create(N - shift, [N - shift], 3, [1]));
    }

    // Сгенерируем тип нагрузки
    if (randint(0, 1)) {
      type = 1;
      for (let id = 0; id < count; id++) {
        // Не стоит создавать лишние точки
        if (shift != null) {
          if (units[0].id != id && units[1].id != id) {
            units.push(create(id, [id], type, [randint(-3, 3) * 50, 90]));
          }
        } else {
          if (units[0].id != id) {
            units.push(create(id, [id], type, [randint(-3, 3) * 50, 90]));
          }
        }
      }
    } else {
      type = 2;
      for (let id = 0; id < count; id++) {
        // Не стоит создавать лишние точки
        if (shift != null) {
          if (units[0].id != id && units[1].id != id) {
            units.push(create(id, [id], type, [randint(-3, 3) * 50]));
          }
        } else {
          if (units[0].id != id) {
            units.push(create(id, [id], type, [randint(-3, 3) * 50]));
          }
        }
      }
    }
  } else if (complexity == 2){
    // Шарнирное закрепление
    shift = randint(0, ((N - 1) / 2) >> 0);
    units.push(create(0, [0 + shift], 3, [2]));
    units.push(create(1, [N - shift], 3, [1]));

    // Распределенная нагрузка
    units.push(create(2, [0,N], 4, [randint(-3, 3) * 50, randint(-3, 3) * 50]));
  }
  sortX(units);
  return units;
}

function create(id, x, type, value) {
  return { id, x, type, value };
}

export { generateUnits };
