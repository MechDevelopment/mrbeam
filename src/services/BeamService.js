// node -r esm
import Material from './FemService/Material';
import Point from './FemService/Point';
import Element from './FemService/Element';
import BeamCalculation from './FemService/BeamCalculation';

class BeamService {
    /** Service for Beam Calculation
   *
   * @method import(objects, fragmentation)
   * @method results() or results
   *
   * @static generator(count_of_points)
   */
    constructor() {
        this.results;
    }

    /** Import objects from "store"
   *
   * @param {Array<Object>} objects
   *
   * @todo
   * load = [x, y, angle],
   * defenition = [x, y, z],
   * several results
   */
    import(objects, split_coeff = 0.5) {
        // Variables
        console.log('BeamService Imported: ' + objects);
        let push_flag; // flag for point push

        let point; // point class instance
        let element; // element class instance

        let points = []; // list of point class instance
        let elements = []; // list of element class instance

        let distloads = [];

        let material = new Material(12 * 10 ** 6, 0.04909, 0.7854);

        /*
        Было бы удобно передавать распределенную нагрузку функцией
        Так как функция у нас для двух точек [x1, y1] [x2, y2]
        Она линейная и может быть найдена по формулам

        y = k*x + b где 
        k = (y1 - y2) / (x1 - x2)
        b = y1 - x1 * k

        Работать путь будет как замыкание

        function dist_func(p1, p2){
            let [x1, y1] = p1;
            let [x2, y2] = p2;
            return function(x){
                let k = (y1 - y2) / (x1 - x2);
                let b = y1 - x1 * k;
                return k*x + b;
            }
        }

        let distload = dist_func([1,2], [5,4]);
        console.log(distload(3))

        Остается вопрос на счет нескольких распределенных нагрузок
        Тоесть нужно будет передавать не функцию, а массив функций, 
        а при вычислении складывать их все.

        + 1. Пусть в Element distload теперь массив с функциями.
        + 2. Необходимо пересчитать вектор решений в Element
        и класс BeamCalculate не пострадает вообще.
        3. Останется переписать костыли в BeamService и все
        На первый случай их можно заменить на такие же костыли ;)
        */

        // Находим распределенную нагрузку и дублируем её
        objects.forEach(object => {
            if (object['type'] == 'Distload') {
                object['x'] = object['distload'][0];
                objects.push({
                    type: 'Distload',
                    x: object['distload'][1],
                    load: 0,
                    def: '__vue_devtool_undefined__',
                    distload: object['distload'],
                    id: object['id'],
                });
            }
        });

        // List of objects sort by X
        BeamService.sort(objects);

        // Create points
        objects.forEach(object => {
            push_flag = true;

            // Determine the coordinate
            if (points.length > 0) {
                if (object['x'] == points[points.length - 1].coordinates[0]) {
                    point = points[points.length - 1];
                    push_flag = false;
                } else {
                    point = new Point([object['x'], 0]);
                }
            } else {
                point = new Point([object['x'], 0]);
            }

            // Add values in point
            switch (object['type']) {
                case 'Load':
                    point.load = [0, point.load[1] - object['load']];
                    break;
                case 'Defenition':
                    point.defenitions = object['def'];
                    break;
                case 'Momentum':
                    point.moment += object['load'];
                    break;
                case 'Distload':
                    let dist_flag = true;
                    distloads.forEach(dists => {
                        if (dists[0] == object['id']) {
                            dist_flag = false;
                        }
                    });
                    if (dist_flag) {
                        distloads.push([object['id'], object['distload']]);
                    }
                    break;
                default:
                    break;
            }

            // Push point
            if (push_flag) {
                points.push(point);
            }
        });

        // Create elements
        for (let i = 0; i < points.length - 1; i++) {
            elements.push(new Element([points[i], points[i + 1]], material));
        }

        // Fucking distload
        createDistload(elements, distloads);

        // Calculation
        let BC = new BeamCalculation(elements, split_coeff);

        // Save results calculation
        this.results = BC.getSolution();
        output(this.results);
    }

    // Getter
    getResults() {
        return this.results;
    }

    static sort(objects) {
        objects.sort(function(a, b) {
            if (a['x'] < b['x']) {
                return -1;
            }
            if (a['x'] > b['x']) {
                return 1;
            }
            return 0;
        });
    }
    /** Easy beam random generator
   *
   * @param {Number} count_of_points
   *
   * @return {Array<Object>}
   */
    static generator(count_of_points) {
        let points = [];
        const N = count_of_points - 1;
        let shift = null;
        let type;

        /** Заполняем массив points словарями вида:
        {
            id: Number,
            type: "Load", "Defenition", "Momentum", "Distload",
            x: Number,
            load: Number,
            def: [Bool, Bool, Bool],
            distload: [Number, Number]
        }; */

        // Первым делом сгенерируем закрепление(ия)
        if (randomInteger(0, 1)) {
            // Жесткое
            if (randomInteger(0, 1)) {
                // В начале отрезка
                points.push(createPoint(0, 'Defenition', 0, [1, 1, 1]));
            } else {
                // В конце отрезка
                points.push(createPoint(N, 'Defenition', N, [1, 1, 1]));
            }
        } else {
            // Шарнирное
            shift = randomInteger(0, ((N - 1) / 2) >> 0);
            points.push(
                createPoint(0 + shift, 'Defenition', 0 + shift, [1, 1, 0])
            );
            points.push(
                createPoint(N - shift, 'Defenition', N - shift, [0, 1, 0])
            );
        }

        // Сгенерируем тип нагрузки
        if (randomInteger(0, 1)) {
            type = 'Load';
        } else {
            type = 'Momentum';
        }

        for (let id = 0; id < count_of_points; id++) {
            // Не стоит создавать лишние точки
            if (shift != null) {
                if (points[0].id != id && points[1].id != id) {
                    points.push(
                        createPoint(id, type, id, randomInteger(-3, 3) * 50)
                    );
                }
            } else {
                if (points[0].id != id) {
                    points.push(
                        createPoint(id, type, id, randomInteger(-3, 3) * 50)
                    );
                }
            }
        }

        BeamService.sort(points);
        return points;
    }
}

/** Get a random integer number from (min-0.5) to (max + 0.5)
 *
 * @param {Number} min
 * @param {Number} max
 *
 * @return {Number}
 */
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function createDistload(el, dl) {
    // Нужно вставить в елементы el распределенную нагрузку dl

    /**
   * Мой тупой алгоритм
   *
   * Идем по распределенным нагрузкам
   * Ищем начальную координату
   * Ищем конечную координату
   * Получается что элементы между точками существуют заранее и нам непридется их создавать
   *
   * Теперь нужно пройтись по всем элементам до и после и добавить в каждый распределенную нагрузку
   */

    // Чекаем распределенную нагрузку
    if (dl[0] == null) {
        return null;
    }

    // Будем идти по распределенным нагрузкам dist_list == [id,[x1,x2,load1,load2]]
    dl.forEach(dist_list => {
        // Забираем первую координату
        let x1 = dist_list[1][0];
        let x2 = dist_list[1][1];
        let yes = false;
        for (let i = 0; i < el.length; i++) {
            // Ищем элемент который начинается с координаты x1
            if (el[i].points[0].coordinates[0] == x1) {
                yes = true;
                // break; - И вот нахуя я потратил 20 минут чтобы найти этот break
            }

            // Добавляем распределенную нагрузку
            if (yes) {
                el[i].distributed_load = [
                    el[i].distributed_load[0] + dist_list[1][2] / (x2 - x1),
                    el[i].distributed_load[1] + dist_list[1][3] / (x2 - x1),
                ];
            }

            // Ищем элемент который заканчивается координатой x2
            if (el[i].points[1].coordinates[0] == x2) {
                yes = false;
                break;
            }
        }
    });

    // Теперь массив с элементами переделался и все хорошо!
}
export default BeamService;

/** Функция подсчета количества выводов */
function counter() {
    let counter = 1;
    return function(res) {
        console.log(
            '%cCalculation number:',
            'color: royalblue; font-weight: bold; font-size: 14px;',
            counter
        );
        counter++;
        for (const key in res) {
            console.log(
                '%c ' + key + ': ',
                'color: white; font-weight: bold; background: linear-gradient(violet, royalblue);',
                res[key]
            );
        }
    };
}

/** Функция вывода словаря */
let output = counter();

function createPoint(_id, _type, _x, parameter) {
    let dict = {
        id: _id,
        type: _type, //"Defenition", "Momentum", "Distload",
        x: _x,
    };

    switch (_type) {
        case 'Load':
            dict['load'] = parameter;
            break;
        case 'Defenition':
            dict['def'] = parameter;
            break;
        case 'Momentum':
            dict['load'] = parameter;
            break;
        case 'Distload':
            dict['distload'] = parameter;
            break;
        default:
            break;
    }
    return dict;
}
