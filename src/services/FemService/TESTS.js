const { element, node } = require("./FElements");
const { beamCalculate } = require("./FBeamCalc");


const p1 = node(0, [1, 1, 1]);
const p2 = node(6, [0, 0, 0], -8, 0, true);
const p3 = node(11, [0, 1, 0]);
const p4 = node(15, [0, 1, 0]);

const e1 = element([p1, p2], [-4, -4], { E: 3, J: 1, A: 1 });
const e2 = element([p2, p3], [-4, -4], { E: 1, J: 1, A: 1 });
const e3 = element([p3, p4], [-4, -4], { E: 2, J: 1, A: 1 });

const elems = [e1, e2, e3];
beamCalculate(elems)

//////////////////////////////////////////////////////////////
const p21 = node(0, [1, 1, 1]);
const p22 = node(10, [0, 0, 0]);

const e21 = element([p21, p22], [10, 10], { E: 12.0e6, J: 0.04909, A: 0.7854 });

const elems2 = [e21];
beamCalculate(elems2)

//////////////////////////////////////////////////////////////
const p31 = node(0, [1, 1, 0]);
const p32 = node(5, [0, 0, 0], -100);
const p33 = node(10, [0, 1, 0]);

const e31 = element([p31, p32], [-60, -60], { E: 1, J: 1, A: 1 });
const e32 = element([p32, p33]);

const elems3 = [e31, e32];
beamCalculate(elems3)

// КОСАЯ НАГРУЗКА
//////////////////////////////////////////////////////////////
const p41 = node(0, [1, 1, 1]);
const p42 = node(10);

const e41 = element([p41, p42], [0, -10], { E: 1, J: 1, A: 1 });

const elems4 = [e41];
beamCalculate(elems4)

// СЛОЖНАЯ БАЛКА
//////////////////////////////////////////////////////////////
const p51 = node(0, [1, 1, 0]);
const p52 = node(2, [0, 0, 0], 0, 20);
const p53 = node(3, [0, 1, 0]);
const p54 = node(4.5, [0, 0, 0], -10);

const e51 = element([p51, p52], [-10, -10], { E: 1, J: 1, A: 1 });
const e52 = element([p52, p53], [-10, -10], { E: 1, J: 1, A: 1 });
const e53 = element([p53, p54], [0, 0], { E: 1, J: 1, A: 1 });

const elems5 = [e51, e52, e53];
beamCalculate(elems5)

// СЛОЖНАЯ БАЛКА С ШАРНИРОМ
//////////////////////////////////////////////////////////////
const p61 = node(0, [1, 1, 1]);
const p62 = node(4, [0, 0, 0], 0, 0, true);
const p63 = node(6, [0, 1, 0], 0, -5);

const e61 = element([p61, p62], [-2, -2], { E: 1, J: 1, A: 1 });
const e62 = element([p62, p63]);

const elems6 = [e61, e62];
beamCalculate(elems6)

// СУПЕР СЛОЖНАЯ БАЛКА С ШАРНИРОМ
//////////////////////////////////////////////////////////////
const p71 = node(0, [0, 0, 0], -10);
const p72 = node(2, [0, 1, 0]);
const p73 = node(4, [0, 0, 0], 0, 0, true);
const p74 = node(6, [1, 1, 0], 0, -4);
const p75 = node(8, [0, 0, 0]);
const p76 = node(10, [0, 1, 0]);

const e71 = element([p71, p72]);
const e72 = element([p72, p73]);
const e73 = element([p73, p74]);
const e74 = element([p74, p75], [-2, -2]);
const e75 = element([p75, p76], [-2, -2]);

const elems7 = [e71, e72, e73, e74, e75];
beamCalculate(elems7)
