/** Beam calculation
 *
 * Calculation progress:
 *  1. fragmentation elements / увеличение количества элементов
 *  2. global matrix and global vector formation / ансамблирование элементов
 *  3. SLAU solution and finding reactions / решение СЛАУ и отыскание реакций опор
 *  4. chart results creation / создание результатов и графиков
 */

//import { element, node } from "./FElements";
//import { supporting, globalM, globalV, solve, reaction } from "./FAlgebra";

const { element, node } = require("./FElements");
const { supporting, globalM, globalV, solve, reaction } = require("./FAlgebra");

function beamCalculate(elems, split_coeff = 1) {
  // fragmenetation
  fragmentation(elems, split_coeff);

  // ansamblirovanie elements
  const support = supporting(elems);
  const GM = globalM(elems, support);
  const GV = globalV(elems, support);

  const solution = solve(GM, GV);
  reaction(elems, solution, support);

  console.log("Solution: ", solution);
  // console.log(
  //   "Reactions: ",
  //   elems.map(e => e.reaction)
  // );
}

function fragmentation(elems, split_coeff) {
  // variables
  let count, new_node, new_elem;

  // go array elements from the end
  for (let i = elems.length - 1; i >= 0; i--) {
    count = elems[i].len / split_coeff;

    for (let j = 1; j < count; j++) {
      // create an additional node
      new_node = node(elems[i].nodes[1].x - split_coeff);

      // duplicate the element by changing the second node
      new_elem = element(
        [elems[i].nodes[0], new_node],
        elems[i].distload,
        elems[i].mat
      );

      // reduce the "old" element
      elems[i].nodes[0] = new_node;

      // add a new element before the "old"
      elems.splice(i, 0, new_elem);
    }
  }
}

//export { beamCalculate }
module.exports = { beamCalculate };
