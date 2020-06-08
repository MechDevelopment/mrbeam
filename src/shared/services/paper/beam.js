const HEIGHT = 75;
const PADDING = 30;

function createBeam(elements, canvasWidth) {
  const beamSize = getBeamSize(elements);
  console.log(beamSize)
  console.log(getX(1, beamSize, canvasWidth), canvasWidth);

  paperPoint(getX(beamSize.center, beamSize, canvasWidth))

  let rect = new Path.Rectangle(0, 0, canvasWidth, HEIGHT * 2);
  rect.strokeColor = "black";
  rect.strokeWidth = 3;
}

function getBeamSize(elements) {
  const xArray = elements.map((el) => el.x).flat();
  let [x, y] = [Math.min(...xArray), Math.max(...xArray)];
  let [length, center] = [y - x, (y + x) / 2];
  return { x, y, length, center };
}

function getX(x, beamSize, canvasWidth,) {
  const scale = (canvasWidth - 2 * PADDING) / beamSize.length;
  return (x - beamSize.x) * scale + PADDING;
}

function paperPoint(x) {
  let point = Path.Circle(new Point(x, HEIGHT), 3);
  point.strokeColor = "black";
  point.strokeWidth = 2;
}

export { createBeam };
