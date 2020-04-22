function load(x, y, height, color = "black") {
  let symbol = loadSymbol(height, color);
  symbol.place(new Point(x, y));
}

function distload(x, y, height, width, color = "black") {
  let symbol = loadSymbol(height, color);
  symbol.place(new Point(x, y));
  symbol.place(new Point(x + width, y));
}

function loadSymbol(height, color) {
  let line = new Path();
  line.add(new Point(0, -7));
  line.add(new Point(0, -7 - height));
  line.strokeColor = color;
  line.strokeWidth = 4;

  let tip = new Path();
  tip.add(new Point(0, 0));
  tip.add(new Point(4.6, -10.5));
  tip.add(new Point(0, -9));
  tip.add(new Point(-4.6, -10.5));
  tip.fillColor = color;

  return new Symbol(new Group([tip, line]));
}

export { load, distload };
