/* Данный файл и все связанные с ним строки кода
 * в релизе программы должны будут удалены. 
 *
 * Необходим для удобного отслеживания 
 * работы программы, а также для её отладки.
 */

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

export {output}