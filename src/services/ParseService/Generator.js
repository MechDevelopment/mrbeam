import {sortX} from "./Parser.js"

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
    }
}
