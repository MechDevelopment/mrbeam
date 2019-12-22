import BeamCalculation from "./FemService/BeamCalculation";
import { generateUnits } from "./ParseService/Generator";
import { parseUnits } from "./ParseService/Parser";
import { output } from "./Temporary";

class BeamService {
  /** Service for interface and server communication */
  constructor() {
    this._results;
  }

  /** Use to import objects from "store" */
  import(units, split_coeff = 0.5) {
    // Material
    units.push({ type: 5, value: [12e6, 0.04909, 0.7854] }); // [E, J, A]

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
    return generateUnits(count_of_point, complexity);
  }
}

export default BeamService;
