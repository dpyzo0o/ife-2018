import table from './table';
import checkbox from './checkbox';

export default class LineChart {
  constructor(container, config = {}) {
    this.container = container;
    this.margin = config.margin || 10;
    this.pointRadius = config.pointRadius || 5;
    this.width = document.documentElement.clientWidth / 2;
    this.height = document.documentElement.clientHeight - 350;
    this.colors = [
      '#f44242',
      '#f48c41',
      '#f4e541',
      '#9af441',
      '#41f4df',
      '#41aff4',
      '#4143f4',
      '#ca41f4',
      '#f4419d'
    ];

    this.init();
  }

  init() {
    this.container.width = this.width;
    this.container.height = this.height;
    this.ctx = this.container.getContext('2d');
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawAxes();
    this.drawLines(table.getCurrentData());
  }

  set(data) {
    this.data = data;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawLine();
    this.drawAxes();
  }

  drawAxes() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.margin, this.height - this.margin);
    this.ctx.lineTo(this.margin, this.margin);
    this.ctx.moveTo(this.margin, this.height - this.margin);
    this.ctx.lineTo(this.width - this.margin, this.height - this.margin);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'rgb(0,0,0)';
    this.ctx.stroke();
  }

  drawLine(data, ratio, color) {
    if (data) {
      this.data = data;
    }

    // pick a random color
    if (!color) {
      color = this.colors[Math.floor(Math.random() * 9)];
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
      this.ctx.fillStyle = color;
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

  drawLines(data) {
    // get max value of all data
    let max = Math.max(
      ...data.map(el => {
        return Math.max(...el);
      })
    );

    let ratio = (this.height - 2 * this.margin) / max;

    data.forEach((el, idx) => {
      this.drawLine(el, ratio, this.colors[idx]);
    });
  }
}
