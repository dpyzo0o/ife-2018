import Staff from './Staff';

export default class Cook extends Staff {
  constructor(config) {
    super(config);
    // singleton
    if (typeof Cook.instance === 'object') {
      return Cook.instance;
    }
    Cook.instance = this;
  }

  work(dish) {
    console.log('Cook: ' + dish.name + ' is cooked.');
  }
}
