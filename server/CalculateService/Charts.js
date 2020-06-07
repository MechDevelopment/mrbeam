function chartResults(elems) {
  // variables
  let labels = [];
  let displacement = [];
  let shear = [];
  let moment = [];
  let slopeRadians = [];
  let slopeDegrees = [];

  // Create charts
  for (let i in elems) {
    labels.push(elems[i].nodes[0].x, elems[i].nodes[1].x);
    shear.push(elems[i].reaction[0], -elems[i].reaction[2]);
    moment.push(elems[i].reaction[1], -elems[i].reaction[3]);

    displacement.push(elems[i].solution[0], elems[i].solution[2]);
    slopeRadians.push(elems[i].solution[1], elems[i].solution[3]);
    slopeDegrees.push(
      (elems[i].solution[1] * 180) / Math.PI,
      (elems[i].solution[3] * 180) / Math.PI
    );
  }

  return {
    labels,
    shear,
    moment,
    displacement,
    slopeRadians,
    slopeDegrees,

    // max_displacement: Math.max(..._disp),
    // min_displacement: Math.min(..._disp),
    // shear: _shear,
    // max_shear: Math.max(..._shear),
    // min_shear: Math.min(..._shear)
  };
}

module.exports = function() {
  return chartResults;
}

