import table from './table';
import checkbox from './checkbox';

export default class LineChart {
  constructor(container, config = {}) {
    this.container = container;
    this.ctx = this.container.getContext('2d');
    this.margin = config.margin || 20;
    this.pointRadius = config.pointRadius || 4;
    this.width = document.documentElement.clientWidth / 2;
    this.height = document.documentElement.clientHeight - 370;
    this.colors = [
      '#f71111',
      '#f9c300',
      '#43ed00',
      '#00edd1',
      '#006eed',
      '#9600ed',
      '#ed00b5',
      '#ca41f4',
      '#f4419d'
    ];

    this.init();
  }

  init() {
    // make canvas sharp
    this.container.width = this.width * 2;
    this.container.height = this.height * 2;
    this.container.style.width = this.width + 'px';
    this.container.style.height = this.height + 'px';
    this.ctx.scale(2, 2);

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

      this.drawLabelX(x, this.height - 2, idx + 1);

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

  drawLabelX(x, y, idx) {
    this.ctx.beginPath();
    this.ctx.font = '12px arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'rgb(0,0,0)';
    this.ctx.fillText(`${idx}月`, x , y);
  }
}
