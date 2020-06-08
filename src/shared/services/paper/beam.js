function createBeam(elems, x, y, w, h) {
  const SIZE = getBeamSize(elems);

  console.log(SIZE);

  let rect = new Path.Rectangle(x, y, w, h);
  rect.strokeColor = "black";
  rect.strokeWidth = 3;
}

function getBeamSize(elems) {
  const xArray = elems.map((el) => el.x).flat();
  let [x, y] = [Math.min(...xArray), Math.max(...xArray)];
  return { x, y, length: y - x };
}

export { createBeam };
