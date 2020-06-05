function createBeam(x, y, w, h) {
  let rect = new Path.Rectangle(x, y, w, h);
  rect.strokeColor = "black"
  rect.strokeWidth = 3;
}

export { createBeam };
