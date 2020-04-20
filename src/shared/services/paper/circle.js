export default function circle(id) {
  window.paper.setup(document.getElementById(id));

  let myCircle = new Path.Circle(new Point(0, 0), 50);
  myCircle.fillColor = "black";

  var rectangle = new Rectangle(new Point(50, 50), new Point(150, 100));
  var path = new Path.Rectangle(rectangle);
  path.fillColor = "#e9e9ff";
  path.selected = true;
  console.log(1);
}
