import FootballField from './FootballField';

export default class Factory {
  static get FootballField() {
    return 0;
  }

  static getInstance(id, config) {
    switch (id) {
      case this.FootballField:
        return new FootballField(config);
      default:
        throw new Error('Unknown object type.');
    }
  }
}
