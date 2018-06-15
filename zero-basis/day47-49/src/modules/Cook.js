import Staff from './Staff';
import Util from './Util';
import Constants from './Constants';

export default class Cook extends Staff {
  constructor(config) {
    super(config);
    this.status = 'free';
    this.type = 'COOK';
    // singleton
    if (typeof Cook.instance === 'object') {
      return Cook.instance;
    }
    Cook.instance = this;
  }

  work(order) {
    this.setStatus('busy');
    Util.renderDishList('kitchen', order.dishList.slice(1));
    return order.dishList.reduce(
      (promise, dish, index, arr) =>
        promise.then(() => {
          Util.startCountdown(dish.time, '.kitchen .status', `cooking ${dish.name}`);
          return Util.wait(dish.time).then(() => {
            Util.updateLog(`Cook: ${dish.name} cooked.`);
            Util.renderDishList('kitchen', arr.slice(index + 2));
            let finish = index === arr.length - 1;
            if (finish) {
              this.setStatus('free');
            }
            order.waiter.work(finish); // serve the dish
          });
        }),
      Promise.resolve()
    );
  }

  setStatus(status) {
    document.querySelector('.kitchen .status').innerHTML = status;
  }
}
