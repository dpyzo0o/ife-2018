export default class LineChart {
  constructor(container, config = {}) {
    this.container = container;
    this.margin = config.margin || 10;
    this.pointRadius = config.pointRadius || 2.5;
    this.width = document.documentElement.clientWidth / 2;
    this.height = document.documentElement.clientHeight - 350;
  }

  init() {
    this.container.width = this.width;
    this.container.height = this.height;
    this.ctx = this.container.getContext('2d');
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawAxes();
  }

  set(data) {
    this.data = data;
    this.init();
    this.drawLine();
  }

  drawAxes() {
    this.ctx.moveTo(this.margin, this.height - this.margin);
    this.ctx.lineTo(this.margin, this.margin);
    this.ctx.moveTo(this.margin, this.height - this.margin);
    this.ctx.lineTo(this.width - this.margin, this.height - this.margin);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'rgb(0,0,0)';
    this.ctx.stroke();
  }

  drawLine(data, ratio, color = 'rgb(0,0,0)') {
    if (data) {
      this.data = data;
    }

    let temp;
    let stride = (this.width - 2 * this.margin) / (2 * this.data.length + 1);

    if (!ratio) {
      ratio = (this.height - 2 * this.margin) / Math.max(...this.data);
    }

    this.data.forEach((el, idx) => {
      let x = this.margin + stride * (2 * idx + 1);
      let y = this.height - this.margin - ratio * el;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.pointRadius, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'rgb(0,0,0)';
      this.ctx.fill();

      if (idx) {
        this.ctx.beginPath();
        this.ctx.moveTo(temp.x, temp.y);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
      }

      temp = {
        x: x,
        y: y
      };
    });
  }

  drawLines(data, color) {
    // get max value of all data
    let max = Math.max(...data.map(el => {
        return Math.max(...el);
      })
    );

    let ratio = (this.height - 2 * this.margin) / max;

    data.forEach((el, idx) => {
      this.drawLine(el, ratio, color[idx]);
    });
  }
}
