//import { element, node } from "./FElements";
//import { indexM, globalM, globalF, defM, defF } from "./FAlgebra";
//import { solve, reaction } from "./FAlgebra";

const { element, node } = require("./FElements");
const { indexM, globalM, globalF, defM, defF } = require("./FAlgebra");
const { solve, reaction } = require("./FAlgebra");

function beamCalculate(elems, split_coeff = 1.0) {
  const index = indexM(elems);
  const GM = globalM(elems, index);
  const GV = globalF(elems, index);
  const DGM = defM(GM, index);
  const DGV = defF(GV, index);
  const solution = solve(DGM, DGV);
  console.log("Solution: ", solution);
  console.log("Reactions: ", reaction(elems, solution, index));
}

const p1 = node(0, [1, 1, 1]);
const p2 = node(6, [0, 0, 0], -8, 0, true);
const p3 = node(11, [0, 1, 0]);
const p4 = node(15, [0, 1, 0]);

const e1 = element([p1, p2], [-4, -4], { E: 3, J: 1, A: 1 });
const e2 = element([p2, p3], [-4, -4], { E: 1, J: 1, A: 1 });
const e3 = element([p3, p4], [-4, -4], { E: 2, J: 1, A: 1 });

const elems = [e1, e2, e3];
beamCalculate(elems);
