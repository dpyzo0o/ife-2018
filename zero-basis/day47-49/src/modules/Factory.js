import Restaurant from './Restaurant';
import Cook from './Cook';
import Waiter from './Waiter';
import Customer from './Customer';
import Dish from './Dish';

// factory pattern
export default class Factory {
  static get RESTAURANT() {
    return 0;
  }
  static get COOK() {
    return 1;
  }
  static get WAITER() {
    return 2;
  }
  static get CUSTOMER() {
    return 3;
  }
  static get DISH() {
    return 4;
  }

  static getInstance(id, config) {
    switch (id) {
      case this.RESTAURANT:
        return new Restaurant(config);
      case this.COOK:
        return new Cook(config);
      case this.WAITER:
        return new Waiter(config);
      case this.CUSTOMER:
        return new Customer(config);
      case this.DISH:
        return new Dish(config);
      default:
        throw new Error('Unknown object type.');
    }
  }
}
