import BeamCalculation from "./FemService/BeamCalculation";
import Generator from "./UnitService/Generator";
import { parseUnits } from "./UnitService/Parser";
import { output } from "./Temporary";

class BeamService {
  /** Service for interface and server communication */
  constructor() {
    this._results;
  }

  /** Use to import objects from "store" */
  import(units, split_coeff = 0.5) {
    // Parse units to elements for FEM
    let elements = parseUnits(units);

    // Create FEM solution
    let BC = new BeamCalculation(elements, split_coeff);
    this._results = BC.getSolution();

    // Console output
    output(BC.getSolution());
  }

  /** Use to get points for charts */
  getResults() {
    return this._results;
  }

  /** Use to generate JSON units */
  static generate(count_of_point, complexity = 2) {
    // Control the Generator !!!
    const G = new Generator();

    return G.generate(5, [-5, 5]);
  }
}

export default BeamService;
