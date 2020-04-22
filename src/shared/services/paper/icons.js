function load(x, y, height, color = "black") {
  let symbol = loadSymbol(height, color);
  symbol.place(new Point(x, y));
}

function distload(x, y, height, width, color = "black") {
  const symbol = loadSymbol(height, color);

  const COUNT = Math.floor(width / 15)
  for (let i = 0; i < COUNT+1; i++) {
    symbol.place(new Point(x + width / COUNT * i, y));
  }

  let line = new Path();
  line.add(new Point(x - 2, y - height +2 ));
  line.add(new Point(x + width + 2 , y - height +2));
  line.strokeColor = color;
  line.strokeWidth = 4;
}

function loadSymbol(height, color) {
  let line = new Path();
  line.add(new Point(0, -7));
  line.add(new Point(0, - height));
  line.strokeColor = color;
  line.strokeWidth = 4;

  let tip = new Path();
  tip.add(new Point(0, 0));
  tip.add(new Point(4.6, -10.5));
  tip.add(new Point(0, -9));
  tip.add(new Point(-4.6, -10.5));
  tip.fillColor = color;

  let symbol = new Symbol(new Group([tip, line]));
  symbol.item.bounds.center.y -= symbol.item.bounds.height / 2;

  return symbol;
}

export { load, distload };
