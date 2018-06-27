import FootballField from './FootballField';
import Player from './Player';

export default class Factory {
  static get FOOTBALLFIELD() {
    return 0;
  }

  static get PLAYER() {
    return 1;
  }

  static getInstance(id, config) {
    switch (id) {
      case this.FOOTBALLFIELD:
        return new FootballField(config);
      case this.PLAYER:
        return new Player(config);
      default:
        throw new Error('Unknown object type.');
    }
  }
}
