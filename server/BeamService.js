const beamCalculate = require("./CalculateService/Calculate")();
const Generator = require("./ElementService/Generator")();
const parseUnits = require("./ElementService/Parser")();

class BeamService {
  /** Service for interface and server communication */
  constructor() {
    this._results;
  }

  /** Use to import objects from "store" */
  import(units, split_coeff = 0.5) {
    // Parse units to elements for FEM
    let elems = parseUnits(units);

    // Create FEM solution
    const BC = beamCalculate(elems);
    this._results = BC;
  }

  /** Use to get points for charts */
  getResults() {
    return this._results;
  }

  /** Use to generate JSON units */
  static generate(count_of_point, complexity = 2) {
    // Control the Generator !!!
    Generator.setSettings("ones");
    return Generator.generate(5, [0, 5]);
  }
}
const gen = BeamService.generate(5);

const BC = new BeamService();
BC.import(gen);

module.exports = function() {
  return BeamService;
};
