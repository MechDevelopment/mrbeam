function load(id, x, y, x1, y1) {
  window.paper.setup(document.getElementById(id));

  let triangle = new Path.RegularPolygon(new Point(x, y), 3, 5);
  triangle.fillColor = "black";

  let line = new Path();
  line.strokeColor = "black";
  line.strokeWidth = 3;

  line.add(new Point(x, y));
  line.add(new Point(x1, y1));
}

export { load };
