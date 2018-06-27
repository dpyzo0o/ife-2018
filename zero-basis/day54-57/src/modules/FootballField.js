import Util from './Util';
import { fieldDimensions as _ } from './Constants';

export default class FootballField {
  constructor(config) {
    this.ratio = Math.max(config.fieldWidth / config.containerHeight, config.fieldLength / config.containerWidth);
    this.containerWidth = config.containerWidth;
    this.containerHeight = config.containerHeight;
    this.width = Math.round(config.fieldLength / this.ratio);
    this.height = Math.round(config.fieldWidth / this.ratio);
  }

  init() {
    const container = document.getElementById('container');
    container.setAttribute('style', `width: ${this.containerWidth}px; height: ${this.containerHeight}px`);

    const canvas = document.getElementById('field');
    const ctx = canvas.getContext('2d');

    // make canvas sharp
    Util.setAttributes(canvas, {
      width: this.width * 2,
      height: this.height * 2,
      style: `width: ${this.width}px; height: ${this.height}px; border: 1px solid white;`
    });
    ctx.scale(2, 2);

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';

    // corners
    ctx.beginPath();
    ctx.arc(0, 0, _.cornerRadius / this.ratio, 0, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.width, 0, _.cornerRadius / this.ratio, Math.PI / 2, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.width, this.height, _.cornerRadius / this.ratio, Math.PI, -Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, this.height, _.cornerRadius / this.ratio, -Math.PI, 0);
    ctx.stroke();

    // center line
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2, this.height);
    ctx.stroke();

    // center circle
    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, _.mainRadius / this.ratio, 0, 2 * Math.PI);
    ctx.stroke();

    // left goal area
    ctx.beginPath();
    ctx.moveTo(0, this.height / 2 - _.goalAreaLength / this.ratio / 2);
    ctx.lineTo(_.goalAreaWidth / this.ratio, this.height / 2 - _.goalAreaLength / this.ratio / 2);
    ctx.lineTo(_.goalAreaWidth / this.ratio, this.height / 2 + _.goalAreaLength / this.ratio / 2);
    ctx.lineTo(0, this.height / 2 + _.goalAreaLength / this.ratio / 2);
    ctx.stroke();

    // right goal area
    ctx.beginPath();
    ctx.moveTo(this.width, this.height / 2 - _.goalAreaLength / this.ratio / 2);
    ctx.lineTo(this.width - _.goalAreaWidth / this.ratio, this.height / 2 - _.goalAreaLength / this.ratio / 2);
    ctx.lineTo(this.width - _.goalAreaWidth / this.ratio, this.height / 2 + _.goalAreaLength / this.ratio / 2);
    ctx.lineTo(this.width, this.height / 2 + _.goalAreaLength / this.ratio / 2);
    ctx.stroke();

    // left penalty area
    ctx.beginPath();
    ctx.moveTo(0, this.height / 2 - _.penaltyAreaLength / this.ratio / 2);
    ctx.lineTo(_.penaltyAreaWidth / this.ratio, this.height / 2 - _.penaltyAreaLength / this.ratio / 2);
    ctx.lineTo(_.penaltyAreaWidth / this.ratio, this.height / 2 + _.penaltyAreaLength / this.ratio / 2);
    ctx.lineTo(0, this.height / 2 + _.penaltyAreaLength / this.ratio / 2);
    ctx.stroke();

    // left penalty mark
    ctx.beginPath();
    ctx.arc(_.penaltyMarkToGoalLine / this.ratio, this.height / 2, 2, 0, 2 * Math.PI);
    ctx.fill();

    // right penalty area
    ctx.beginPath();
    ctx.moveTo(this.width, this.height / 2 - _.penaltyAreaLength / this.ratio / 2);
    ctx.lineTo(this.width - _.penaltyAreaWidth / this.ratio, this.height / 2 - _.penaltyAreaLength / this.ratio / 2);
    ctx.lineTo(this.width - _.penaltyAreaWidth / this.ratio, this.height / 2 + _.penaltyAreaLength / this.ratio / 2);
    ctx.lineTo(this.width, this.height / 2 + _.penaltyAreaLength / this.ratio / 2);
    ctx.stroke();

    // right penalty mark
    ctx.beginPath();
    ctx.arc(this.width - _.penaltyMarkToGoalLine / this.ratio, this.height / 2, 2, 0, 2 * Math.PI);
    ctx.fill();

    // left goal area arc
    ctx.beginPath();
    ctx.arc(
      _.penaltyMarkToGoalLine / this.ratio,
      this.height / 2,
      _.mainRadius / this.ratio,
      -Math.acos((_.penaltyAreaWidth - _.penaltyMarkToGoalLine) / _.mainRadius),
      Math.acos((_.penaltyAreaWidth - _.penaltyMarkToGoalLine) / _.mainRadius)
    );
    ctx.stroke();

    // right goal area arc
    ctx.beginPath();
    ctx.arc(
      this.width - _.penaltyMarkToGoalLine / this.ratio,
      this.height / 2,
      _.mainRadius / this.ratio,
      Math.PI - Math.acos((_.penaltyAreaWidth - _.penaltyMarkToGoalLine) / _.mainRadius),
      -Math.PI + Math.acos((_.penaltyAreaWidth - _.penaltyMarkToGoalLine) / _.mainRadius)
    );
    ctx.stroke();
  }
}
