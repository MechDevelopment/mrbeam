function load(x, y, height, color = "black") {
  let symbol = loadSymbol(height, color);
  symbol.place(new Point(x, y));
}

function distload(x, y, height, width, color = "black") {
  const symbol = loadSymbol(height, color);

  const COUNT = Math.floor(width / 15);
  for (let i = 0; i < COUNT + 1; i++) {
    symbol.place(new Point(x + (width / COUNT) * i, y));
  }

  let line = new Path();
  line.add(new Point(x - 2, y - height + 2));
  line.add(new Point(x + width + 2, y - height + 2));
  line.strokeColor = color;
  line.strokeWidth = 4;
}

function moment(x, y, height, color = "black") {
  let center = new Point(x, y - height / 2);
  let r = height / 2 - 2;

  let arc = new Path.Arc({
    from: [
      center.x + r * Math.sin((30 / 180) * Math.PI),
      center.y + r * Math.cos((30 / 180) * Math.PI),
    ],
    through: [center.x - r, center.y],
    to: [
      center.x + r * Math.sin((120 / 180) * Math.PI),
      center.y + r * Math.cos((120 / 180) * Math.PI),
    ],
    strokeColor: color,
  });

  arc.strokeWidth = 4;

  let tip = new Path();
  tip.add(new Point(0, 0));
  tip.add(new Point(4.6, -10.5));
  tip.add(new Point(0, -9));
  tip.add(new Point(-4.6, -10.5));
  tip.fillColor = color;

  tip.rotate(-45);

  tip.translate(
    new Point(
      center.x + r * Math.sin((120 / 180) * Math.PI),
      center.y + r * Math.cos((120 / 180) * Math.PI) + 5
    )
  );
}

function defenition(x, y, height, color = "black") {
  let triangle = new Path.RegularPolygon(new Point(x, y), 3, height / 2);
  triangle.strokeWidth = 4;
  triangle.strokeColor = color;

  triangle.bounds.center.x = x + triangle.bounds.height / 2;
  triangle.bounds.bottom = triangle.bounds.center.y;

  let defLine = new Path();
  defLine.add(
    new Point(
      triangle.bounds.center.x - (height * 2) / 3,
      triangle.bounds.bottom
    )
  );
  defLine.add(
    new Point(
      triangle.bounds.center.x + (height * 2) / 3,
      triangle.bounds.bottom
    )
  );
  defLine.strokeColor = color;
  defLine.strokeWidth = 4;

  const COUNT = Math.floor(defLine.bounds.width / 10);
  for (let i = 0; i < COUNT; i++) {
    let path = new Path();
    path.add(
      new Point(
        triangle.bounds.center.x -
          (height * 2) / 3 +
          (defLine.bounds.width / COUNT) * i +
          2,
        triangle.bounds.bottom + 8
      )
    );
    path.add(
      new Point(
        triangle.bounds.center.x -
          (height * 2) / 3 +
          (defLine.bounds.width / COUNT) * i +
          7,
        triangle.bounds.bottom
      )
    );

    path.strokeColor = color;
    path.strokeWidth = 3;
  }
}

function material(x, y, height, color = "black") {
  y -= height;

  const COUNT = Math.floor(height / 10);
  for (let j = 0; j < COUNT; j++) {
    for (let i = 0; i < COUNT; i++) {
      let path = new Path();
      path.add(new Point(x + (height / COUNT) * i, y));
      path.add(new Point(x + (height / COUNT) * i + 6, y + 6));
      path.strokeColor = color;
      path.strokeWidth = 3;
      //path.strokeCap = 'round';

      path = new Path();
      path.add(new Point(x + (height / COUNT) * i, y));
      path.add(new Point(x + (height / COUNT) * i - 6, y + 6));
      path.strokeColor = color;
      path.strokeWidth = 3;
      path.bounds.center.x += 1;
      path.bounds.center.y += 5;
      //path.strokeCap = 'round';
    }
    y += 10;
  }
}

function loadSymbol(height, color) {
  let line = new Path();
  line.add(new Point(0, -7));
  line.add(new Point(0, -height));
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

export { load, distload, moment, defenition, material };
