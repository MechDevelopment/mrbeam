import { sortX } from "./Parser";
import { randint } from "../Utilus";

class Generator {
    /** Create JSON points 
     * @param {Number} count count of point
     * @param {Number} complexity beam complexity (from 0 to 2)
    */
    constructor(count, complexity = "random") {
        /*
        
        complexity 0 - Симметричные балки с распределнной нагрузкой,
        моментами или силами, на выходе будем иметь только эпюры и реакции.
        
        complexity 1 - Убираем симметрию, добавляем шарниры и единый материал. 
        
        complexity 2 - Добавляем различный материал.
        
        */

        let objects = [];
        const N = count - 1;
        let shift = null;
        let type;

        if (complexity == "random") {
            complexity = 1;
        }

        if (complexity >= 1) {
            // Первым делом сгенерируем закрепление(ия)
            if (randint(0, 1)) {
                // Жесткое
                if (randint(0, 1)) {
                    // В начале отрезка
                    objects.push(create(0, [0], 3, [3]));
                } else {
                    // В конце отрезка
                    objects.push(create(N, [N], 3, [3]));
                }
            } else {
                // Шарнирное
                shift = randint(0, ((N - 1) / 2) >> 0);
                objects.push(create(0 + shift, [0 + shift], 3, [2]));
                objects.push(create(N - shift, [N - shift], 3, [1]));
            }

            // Сгенерируем тип нагрузки
            if (randint(0, 1)) {
                type = 1;
                for (let id = 0; id < count; id++) {
                    // Не стоит создавать лишние точки
                    if (shift != null) {
                        if (objects[0].id != id && objects[1].id != id) {
                            objects.push(
                                create(id, [id], type, [randint(-3, 3) * 50, 90])
                            );
                        }
                    } else {
                        if (objects[0].id != id) {
                            objects.push(
                                create(id, [id], type, [randint(-3, 3) * 50, 90])
                            );
                        }
                    }
                }
            } else {
                type = 2;
                for (let id = 0; id < count; id++) {
                    // Не стоит создавать лишние точки
                    if (shift != null) {
                        if (objects[0].id != id && objects[1].id != id) {
                            objects.push(
                                create(id, [id], type, [randint(-3, 3) * 50])
                            );
                        }
                    } else {
                        if (objects[0].id != id) {
                            objects.push(
                                create(id, [id], type, [randint(-3, 3) * 50])
                            );
                        }
                    }
                }
            }

            
        }
        sortX(objects);
        this.results = objects;
    }

    getResults() {
        return this.results;
    }
}

function create(id, x, type, value) {
    return { id, x, type, value };
}

export default Generator;
