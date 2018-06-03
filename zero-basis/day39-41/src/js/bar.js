export default class BarChart {
  constructor(container, config = {}) {
    this.data = config.data || [];
    this.margin = config.margin || 20;
    this.barColor = config.barColor || '#2669ef';
    this.axisColor = config.axisColor || 'rgb(0,0,0)';
    this.container = container;
    this.width = document.documentElement.clientWidth / 2;
    this.height = document.documentElement.clientHeight - 370;

    this.init();
  }

  init() {
    this.setAttributes(this.container, {
      width: this.width,
      height: this.height
    });
    this.drawAxes();
    this.drawBars();
  }

  set(data) {
    this.data = data;

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
    let stride = (this.width - 2 * this.margin) / this.data.length;
    let barW = 0.65 * stride;
    let ratio = (this.height - 2 * this.margin) / Math.max(...this.data);

    this.data.forEach((el, idx) => {
      let h = ratio * el;
      let bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      let x = this.margin + stride * (idx + 0.5) - 0.5 * barW;
      let y = this.height - this.margin - h - 2;
      // draw bar
      this.setAttributes(bar, {
        x,
        y,
        width: barW,
        height: h,
        fill: this.barColor
      });
      this.container.appendChild(bar);
      // draw x label
      this.container.appendChild(this.drawLabelX(x + 0.5 * barW, this.height, idx + 1));
    });
  }

  drawLabelX(x, y, index) {
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.innerHTML = `${index}月`;
    this.setAttributes(text, {
      x,
      y,
      dy: -2,
      style: 'text-anchor: middle;font-size: 0.8em;'
    });
    return text;
  }

  setAttributes(el, attrs) {
    for (let key in attrs) {
      el.setAttributeNS(null, key, attrs[key]);
    }
  }
}
