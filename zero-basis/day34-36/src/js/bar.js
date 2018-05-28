export default class BarChart {
  constructor(container, config = {}) {
    this.data = config.data || [];
    this.margin = config.margin || 10;
    this.barColor = config.barColor || 'lightblue';
    this.axisColor = config.axisColor || 'rgb(0,0,0)';
    this.container = container;
    this.width = document.documentElement.clientWidth / 2;
    this.height = document.documentElement.clientHeight - 350;
  }

  set(data) {
    this.data = data;

    this.setAttributes(this.container, {
      width: this.width,
      height: this.height
    });

    this.clear();
    this.drawAxes();
    this.drawBars();
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  drawAxes() {
    let xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.setAttributes(xAxis, {
      x1: this.margin,
      y1: this.height - this.margin,
      x2: this.margin,
      y2: this.margin,
      stroke: this.axisColor,
      'stroke-width': 2
    });
    this.container.appendChild(xAxis);

    let yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.setAttributes(yAxis, {
      x1: this.margin,
      y1: this.height - this.margin,
      x2: this.width - this.margin,
      y2: this.height - this.margin,
      stroke: this.axisColor,
      'stroke-width': 2
    });
    this.container.appendChild(yAxis);
  }

  drawBars() {
    let barWidth = (this.width - 2 * this.margin) / (2 * this.data.length + 1);
    let ratio = (this.height - 2 * this.margin) / Math.max(...this.data);

    this.data.forEach((el, idx) => {
      let h = ratio * el;
      let bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      this.setAttributes(bar, {
        x: this.margin + barWidth * (2 * idx + 1),
        y: this.height - this.margin - h - 2,
        width: barWidth,
        height: h,
        fill: this.barColor
      });
      this.container.appendChild(bar);
    });
  }

  setAttributes(el, attrs) {
    for (let key in attrs) {
      el.setAttributeNS(null, key, attrs[key]);
    }
  }
}
