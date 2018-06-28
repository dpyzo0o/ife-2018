import _ from './Constants';
import Util from './Util';

export default class Player {
  constructor(config = {}) {
    this.x = config.x || Math.floor(Math.random() * _.FIELD_LENGTH + 1);
    this.y = config.y || Math.floor(Math.random() * _.FIELD_WIDTH + 1);
    this.radius = config.radius || 1; // default 1 meters
    this.vNum = config.vNum || Math.floor(Math.random() * 99 + 1);
    this.vMax = 3 + (this.vNum - 1) * 9 / 98;
    this.player = document.createElement('div');
  }

  init() {
    const wrapper = document.querySelector('.player-wrapper');
    wrapper.appendChild(this.player);

    Util.setAttributes(this.player, {
      class: 'player'
    });

    Util.setStyles(this.player, {
      width: `${this.radius * 2 / _.RATIO}px`,
      height: `${this.radius * 2 / _.RATIO}px`,
      top: `${(this.y - this.radius) / _.RATIO}px`,
      left: `${(this.x - this.radius) / _.RATIO}px`
    });

    return this;
  }

  setPosition(x, y) {
    Util.setStyles(this.player, {
      left: `${(x - this.radius) / _.RATIO}px`,
      top: `${(y - this.radius) / _.RATIO}px`
    });
  }

  runTo(x, y) {
    Util.setStyles(this.player, {
      transition: `all 3s linear`
    });
    // for the transition to take effect
    setTimeout(() => {
      Util.setStyles(this.player, {
        left: `${(x - this.radius) / _.RATIO}px`,
        top: `${(y - this.radius) / _.RATIO}px`
      });
    });
  }
}
