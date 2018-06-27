import _ from './Constants';

export default class Player {
  constructor(config) {
    this.radius = config.radius || 2; // default 2 meters
    this.vNum = config.vNum || Math.floor(Math.random() * 99 + 1);
    this.vMax = 3 + (this.vNum - 1) * 9 / 98;
  }
}
