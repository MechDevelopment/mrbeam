function chartResults(elems) {
  // variables
  let labels = [];
  let displacement = [];
  let shear = [];

  // Create charts
  for (let i in elems) {
    labels.push(elems[i].nodes[0].x, elems[i].nodes[1].x);
    displacement.push(elems[i].solution[0], elems[i].solution[2]);
    shear.push(elems[i].reaction[0], -elems[i].reaction[2]);
  }

  console.log(elems);
  return {
    labels,
    displacement,
    shear
    // max_displacement: Math.max(..._disp),
    // min_displacement: Math.min(..._disp),
    // shear: _shear,
    // max_shear: Math.max(..._shear),
    // min_shear: Math.min(..._shear)
  };
}

export { chartResults };
