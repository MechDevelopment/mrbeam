import BeamCalculation from "./FemService/BeamCalculation";
import Generator from "./ParseService/Generator";
import { Parser } from "./ParseService/Parser";


class BeamService {
    /** Class for communication with front end
     * 
     *  @method import(args) Use to import and calculate
     *  @method getResults() Use to get points for charts 
     */
    constructor() {
        // Private
        this.results = {};
    }

    /** Import objects from "store" */
    import(objects, split_coeff = 0.5) {
        const PARSER = new Parser();
        let elements = PARSER.parse(objects)
        let BC = new BeamCalculation(elements, split_coeff);

        this.results = BC.getSolution();
    }

    getResults() {
        return this.results;
    }

    /** Generate JSON points as biutifil beam */
    static generate(count_of_point, complexity = 0) {
        const GENERATOR = new Generator();
        return GENERATOR.generate(...arguments);
    }
}

export default BeamService;
