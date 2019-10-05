import BeamCalculation from "./BeamCalculation";
import Material from "./Material";
import Point from "./Point";
import Element from "./Element";
import nj from "numjs";

let start = new Date();
main();
console.log("Time:", (new Date() - start) * 0.001, "sec");

function main() {
  // Тут создаем пару точек, материал и один элемент
  let P1 = new Point([0, 0], [1, 1, 1]);
  let P2 = new Point([10, 0], [0, 0, 0], [1000, 0]);
  let m = new Material(9.9 * 10 ** 6, 0.04909, 0.7854);
  let E = new Element([P1, P2], m);

  // На данный момент может принимать и расчитывать только один элемент,
  // без распределенной нагрузки, возвратит только две точки.
  let BC = new BeamCalculation([E]);
  console.log(BC.displacement);
  console.log(BC.max_deflection);
  console.log(BC.max_slope);
  console.log(BC.moment);
  console.log(BC.min_moment);
  console.log(BC.shear);
  console.log(BC.max_shear);
  /*
	    Max Deflection:	δmax=0.6859 in	@ x = L
	    Max Slope:	θmax=0.1029 rad	@ x = L
	    Shear:	V=+1000 lbf	constant
	    Moment:	Mmax=−10,000 in-lbf	@ x = 0
	*/
}
