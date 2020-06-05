function createBeam(x, y) {
  let color = "black";
  let height = 50;
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

export { createBeam };
