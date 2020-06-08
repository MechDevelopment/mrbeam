class PaperBeam {
  constructor(canvasHeight = 75, padding = 50) {
    // constants
    this.canvasHeight = canvasHeight;
    this.padding = padding;

    // variables
    this.elements = undefined;
    this.canvasWidth = undefined;
    this.beamSize = undefined;
  }

  createBeam(elements, canvasWidth) {
    // variables
    this.elements = elements;
    this.canvasWidth = canvasWidth;
    this.beamSize = this._getBeamSize();

    console.table(this);

    // draw
    this.beamSize.points.forEach((el) => this._paperPoint(this._getX(el)));

    let rect = new Path.Rectangle(0, 0, this.canvasWidth, this.canvasHeight * 2);
    rect.strokeColor = "black";
    rect.strokeWidth = 3;
  }

  _paperPoint(x) {
    let point = Path.Circle(new Point(x, this.canvasHeight), 3);
    point.strokeColor = "black";
    point.strokeWidth = 2;
  }

  _getBeamSize() {
    const points = Array.from(new Set(this.elements.map((el) => el.x).flat()));
    let [x, y] = [Math.min(...points), Math.max(...points)];
    let [length, center] = [y - x, (y + x) / 2];

    return { x, y, length, center, points };
  }

  _getX(x) {
    const scale = (this.canvasWidth - 2 * this.padding) / this.beamSize.length;
    return (x - this.beamSize.x) * scale + this.padding;
  }
}

export default PaperBeam;
