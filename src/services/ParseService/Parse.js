class Parser {
    /** Parse JSON points to Elements
     * @param {Array<Object>} points JSON points
     */
    constructor(objects) {
        /*
        Нужна функция создания пустого объета

        Последовательность парсинга
        1. Проходимся по всем объектам и делим их на две группы по типам
        group_1 = [1, 2, 3] и group_2 = [4, 5]
        2. Проходимся по объектам второй группы и добавляем пустые объекты в первую группу.
        3. Сортируем объекты первой группы по х
        
        // способ 1
        4. Разбиваем все объекты первой группы на элементы.
        5. Отдельно проходимся по второй группе и для каждого объекта находим и дополняем элементы.

        // способ 2
        4. При разбиении объектов их первой группы на элементы, проверять каждый раз входит
        ли промежуток нового созданного элемента в объекты из второй группы, если входит, то добавлять 
        характеристики для элемента
    
        Так как способом 1 было сделано в первый раз, то в это раз сделаю способом 2.

        */
    }
}
/*

function createPoint(_id, _type, _x, parameter) {
    let dict = {
        id: _id,
        type: _type, //"Defenition", "Momentum", "Distload",
        x: _x
    };

    switch (_type) {
        case "Load":
            dict["load"] = parameter;
            break;
        case "Defenition":
            dict["def"] = parameter;
            break;
        case "Momentum":
            dict["load"] = parameter;
            break;
        case "Distload":
            dict["distload"] = parameter;
            break;
        default:
            break;
    }
    return dict;
}


[x, type, parameter]

{id, x, type, value}


type = {
    1 = "load",
    2 = "moment",
    3 = "defenition",
    4 = "distload",
    5 = "material",
}

for 1, 2, 3
x = Number
for 4, 5
x = [Number, Number]

def = {
    1 = [0, 1, 0],
    2 = [1, 1, 0],
    3 = [1, 1, 1],
    4 = "oh fuck!"
}

*/

// Обычная сила
let point = {
    id: 0,
    x: 0,
    type: 1,
    value: -50
};

// Шарнир в точке
let point = {
    id: 1,
    x: 1,
    type: 3,
    value: 4
};

// Распределенная нагрузка
let point = {
    id: 2,
    x: [1, 2],
    type: 4,
    value: [3, 4]
};

// Материал
let point = {
    id: 3,
    x: [0, 2],
    type: 5,
    value: [10 ** -10, null, 25]
};
