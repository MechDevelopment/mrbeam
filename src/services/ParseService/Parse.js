class Parser {
    /** Parse JSON points to Elements
     * @param {Array<Object>} points JSON points
     */
    constructor(points) {}
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
