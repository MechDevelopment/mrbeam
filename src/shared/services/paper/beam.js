class PaperBeam {
  constructor(canvasHeight = 75, padding = 50) {
    // constants
    this.canvasHeight = canvasHeight;
    this.padding = padding;

    // variables
    this.elements = undefined;
    this.canvasWidth = undefined;
    this.beamSize = undefined;

    // colors
    this.colors = {
      point: new Color("#f0bc18"),
      line: new Color("#f0bc18"),
    }
  }

  createBeam(elements, canvasWidth) {
    // variables
    this.elements = elements;
    this.canvasWidth = canvasWidth;
    this.beamSize = this._getBeamSize();

    console.table(this);

    // draw

    // Lines
    this.beamSize.points.reduce((x, y) => {
      this._paperLine(this._getX(x), this._getX(y));
      return y;
    });

    // Points
    this.beamSize.points.forEach((el) => {
      this._paperPoint(this._getX(el));
    });


  }

  _paperPoint(x) {
    let point = Path.Circle(new Point(x, this.canvasHeight), 3);
    point.strokeColor = this.colors.point;
    point.strokeWidth = 2;
  }

  _paperLine(x, y) {
    let line = Path.Line(
      new Point(x + 3, this.canvasHeight),
      new Point(y - 3, this.canvasHeight)
    );
    line.strokeColor = this.colors.line;
    line.strokeWidth = 4;
  }

  _getBeamSize() {
    const setOfPoints = new Set(this.elements.map((el) => el.x).flat());
    const points = Array.from(setOfPoints).sort((a, b) => a - b);

    let [x, y] = [points[0], points[points.length - 1]];
    let [length, center] = [y - x, (y + x) / 2];

    return { x, y, length, center, points };
  }

  _getX(x) {
    const scale = (this.canvasWidth - 2 * this.padding) / this.beamSize.length;
    return (x - this.beamSize.x) * scale + this.padding;
  }
}

export default PaperBeam;
