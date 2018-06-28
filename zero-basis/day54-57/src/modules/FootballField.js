import Util from './Util';
import _ from './Constants';

export default class FootballField {
  constructor(config) {
    _.RATIO = Math.max(_.FIELD_WIDTH / config.containerHeight, _.FIELD_LENGTH / config.containerWidth);
    this.containerWidth = config.containerWidth;
    this.containerHeight = config.containerHeight;
    this.width = Math.round(_.FIELD_LENGTH / _.RATIO);
    this.height = Math.round(_.FIELD_WIDTH / _.RATIO);

    const playerWrapper = document.querySelector('.player-wrapper');
    playerWrapper.style.width = `${this.width}px`;
    playerWrapper.style.height = `${this.height}px`;
  }

  render() {
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
    ctx.arc(0, 0, _.CORNER_RADIUS / _.RATIO, 0, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.width, 0, _.CORNER_RADIUS / _.RATIO, Math.PI / 2, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.width, this.height, _.CORNER_RADIUS / _.RATIO, Math.PI, -Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, this.height, _.CORNER_RADIUS / _.RATIO, -Math.PI, 0);
    ctx.stroke();

    // center line
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2, this.height);
    ctx.stroke();

    // center circle
    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, _.MAIN_RADIUS / _.RATIO, 0, 2 * Math.PI);
    ctx.stroke();

    // left goal area
    ctx.beginPath();
    ctx.moveTo(0, this.height / 2 - _.GOAL_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(_.GOAL_AREA_WIDTH / _.RATIO, this.height / 2 - _.GOAL_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(_.GOAL_AREA_WIDTH / _.RATIO, this.height / 2 + _.GOAL_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(0, this.height / 2 + _.GOAL_AREA_LENGTH / _.RATIO / 2);
    ctx.stroke();

    // right goal area
    ctx.beginPath();
    ctx.moveTo(this.width, this.height / 2 - _.GOAL_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(this.width - _.GOAL_AREA_WIDTH / _.RATIO, this.height / 2 - _.GOAL_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(this.width - _.GOAL_AREA_WIDTH / _.RATIO, this.height / 2 + _.GOAL_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(this.width, this.height / 2 + _.GOAL_AREA_LENGTH / _.RATIO / 2);
    ctx.stroke();

    // left penalty area
    ctx.beginPath();
    ctx.moveTo(0, this.height / 2 - _.PENALTY_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(_.PENALTY_AREA_WIDTH / _.RATIO, this.height / 2 - _.PENALTY_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(_.PENALTY_AREA_WIDTH / _.RATIO, this.height / 2 + _.PENALTY_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(0, this.height / 2 + _.PENALTY_AREA_LENGTH / _.RATIO / 2);
    ctx.stroke();

    // left penalty mark
    ctx.beginPath();
    ctx.arc(_.PENALTY_MARK_TO_GOAL_LINE / _.RATIO, this.height / 2, 2, 0, 2 * Math.PI);
    ctx.fill();

    // right penalty area
    ctx.beginPath();
    ctx.moveTo(this.width, this.height / 2 - _.PENALTY_AREA_LENGTH / _.RATIO / 2);
    ctx.lineTo(
      this.width - _.PENALTY_AREA_WIDTH / _.RATIO,
      this.height / 2 - _.PENALTY_AREA_LENGTH / _.RATIO / 2
    );
    ctx.lineTo(
      this.width - _.PENALTY_AREA_WIDTH / _.RATIO,
      this.height / 2 + _.PENALTY_AREA_LENGTH / _.RATIO / 2
    );
    ctx.lineTo(this.width, this.height / 2 + _.PENALTY_AREA_LENGTH / _.RATIO / 2);
    ctx.stroke();

    // right penalty mark
    ctx.beginPath();
    ctx.arc(this.width - _.PENALTY_MARK_TO_GOAL_LINE / _.RATIO, this.height / 2, 2, 0, 2 * Math.PI);
    ctx.fill();

    // left goal area arc
    ctx.beginPath();
    ctx.arc(
      _.PENALTY_MARK_TO_GOAL_LINE / _.RATIO,
      this.height / 2,
      _.MAIN_RADIUS / _.RATIO,
      -Math.acos((_.PENALTY_AREA_WIDTH - _.PENALTY_MARK_TO_GOAL_LINE) / _.MAIN_RADIUS),
      Math.acos((_.PENALTY_AREA_WIDTH - _.PENALTY_MARK_TO_GOAL_LINE) / _.MAIN_RADIUS)
    );
    ctx.stroke();

    // right goal area arc
    ctx.beginPath();
    ctx.arc(
      this.width - _.PENALTY_MARK_TO_GOAL_LINE / _.RATIO,
      this.height / 2,
      _.MAIN_RADIUS / _.RATIO,
      Math.PI - Math.acos((_.PENALTY_AREA_WIDTH - _.PENALTY_MARK_TO_GOAL_LINE) / _.MAIN_RADIUS),
      -Math.PI + Math.acos((_.PENALTY_AREA_WIDTH - _.PENALTY_MARK_TO_GOAL_LINE) / _.MAIN_RADIUS)
    );
    ctx.stroke();
  }
}
