import Staff from './Staff';
import Util from './Util';

export default class Cook extends Staff {
  constructor(config) {
    super(config);
    // singleton
    if (typeof Cook.instance === 'object') {
      return Cook.instance;
    }
    Cook.instance = this;
  }

  work(order, waiter) {
    order.reduce(
      (promise, dish, index, arr) =>
        promise.then(
          () =>
            Util.wait(dish.time * 2000).then(() => {
              console.log(`${dish.name} cooked.`);
              let finish = index === arr.length - 1;
              waiter.work(finish); // serve the dish
            })
          // new Promise(resolve => {
          //   setTimeout(() => {
          //     console.log(`${dish.name} cooked.`);
          //     waiter.work(); // serve the dish
          //     resolve();
          //   }, dish.time * 2000);
          // })
        ),
      Promise.resolve()
    );
  }
}
