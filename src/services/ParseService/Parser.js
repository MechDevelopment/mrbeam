import { Material, Point, Element } from "../FemService/Element";

class Parser {
    /** Parse JSON points to Elements
     * @param {Array<Object>} points JSON points
     * @method getElements() Use to get elements for FemService
     */
    parse(objects) {
        // Проходимся по всем объектам и делим их на две группы по типам
        let group_1 = [];
        let group_2 = [];
        for (let i = 0; i < objects.length; i++) {
            if ([1, 2, 3].includes(objects[i].type)) {
                group_1.push(objects[i]);
            } else {
                group_2.push(objects[i]);
            }
        }

        for (let i = 0; i < group_2.length; i++) {
            // Добавляем пустые объекты в первую группу
            if (group_2[i].x != undefined) {
                // Если х задан
                group_1.push(emptyX(group_2[i].x[0]), emptyX(group_2[i].x[1]));
            }

            // Создаем функцию вместо value для распределенной нагрузки
            if (group_2[i].type == 4) {
                let distload = dist_func(group_2[i].x, group_2[i].value);
                group_2[i].value = distload;
            }

            // Создаем материал вместо value для материала
            if (group_2[i].type == 5) {
                group_2[i].value = new Material(group_2[i].value);
            }
        }

        // Сортируем объекты первой группы по х
        sortX(group_1);

        let elements = []; // Массив для записи элементов
        let element; // Экземпляр класса Element
        let point_1; // Экземпляры класса Point
        let point_2 = new Point([group_1[0].x[0], 0]);

        for (let i = 0; i < group_1.length; i++) {
            // Дополняем вторую точку объктом из первой группы
            decryption(point_2, group_1[i].type, group_1[i].value);

            // Если следующий объект имеет ту же координату
            if (i + 1 < group_1.length) {
                if (group_1[i].x[0] == group_1[i + 1].x[0]) {
                    continue;
                }
            }

            // Если первая точка определена
            if (point_1 != undefined) {
                // Создаем элемент
                element = new Element([point_1, point_2]);

                for (let j = 0; j < group_2.length; j++) {
                    // Если объект из второй группы попадает в элемент
                    if (group_2.x == undefined) {
                        decryption(element, group_2[j].type, group_2[j].value);
                    } else if (
                        collision(
                            [group_1[i - 1].x[0], group_1[i].x[0]],
                            group_2[j].x
                        )
                    ) {
                        decryption(element, group_2[j].type, group_2[j].value);
                    }
                }

                elements.push(element);
            }

            // Если точка была не последней
            if (i + 1 < group_1.length) {
                point_1 = point_2;
                point_2 = new Point([group_1[i + 1].x[0], 0]);
            }
        }
        return elements;
    }
}

/** Create empty JSON point */
function emptyX(x) {
    return {
        x: x,
        type: 1,
        value: [0, 0]
    };
}

/** Sort JSON points from x */
function sortX(objects) {
    objects.sort(function(a, b) {
        if (a.x[0] < b.x[0]) {
            return -1;
        }
        if (a.x[0] > b.x[0]) {
            return 1;
        }
        return 0;
    });
}

/** Функция дополняет Экзмпляр по JSON объекту */
function decryption(instance, type, value) {
    switch (type) {
        case 1:
            let rad = value[1] * Math.PI / 180;
            instance.load[0] += value[0] * Math.cos(rad);
            instance.load[1] += value[0] * Math.sin(rad);
            break;
        case 2:
            instance.moment += value[0];
            break;
        case 3:
            switch (value[0]) {
                case 1:
                    instance.defenitions = [false, true, false];
                    break;
                case 2:
                    instance.defenitions = [true, true, false];
                    break;
                case 3:
                    instance.defenitions = [true, true, true];
                    break;
                case 4:
                    instance.joint = true;
                    break;
            }
            break;
        case 4:
            instance.distload.push(value);
            break;
        case 5:
            instance.material = value;
            break;
    }
}

/** Функция для создания распределенной нагрузки */
function dist_func(x, p) {
    let [x1, y1] = [x[0], p[0]];
    let [x2, y2] = [x[0], p[1]];
    return function(x) {
        let k = (y1 - y2) / (x1 - x2);
        let b = y1 - x1 * k;
        return k * x + b;
    };
}

/** Функция проверяет лежит ли промежуток p1 в p2 */
function collision(p1, p2) {
    let [x1, x2] = p1;
    let [y1, y2] = p2;
    return y1 <= x1 && y2 >= x2;
}
export { Parser, sortX };
