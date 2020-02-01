import beamCalculate from "./FemService/FBeamCalc";
import Generator from "./UnitService/Generator";
import parseUnits from "./UnitService/FParser";
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
    const BC = beamCalculate();
    this._results = BC;

    // Console output
    output(BC);
  }

  /** Use to get points for charts */
  getResults() {
    return this._results;
  }

  /** Use to generate JSON units */
  static generate(count_of_point, complexity = 2) {
    // Control the Generator !!!
    const GEN = new Generator();
    GEN.setSettings('ones')
    return GEN.generate(5, [0, 5]);
  }
}

export default BeamService;
