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

/** Get a random integer number from (min-0.5) to (max + 0.5) */
function randint(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export {output, randint}