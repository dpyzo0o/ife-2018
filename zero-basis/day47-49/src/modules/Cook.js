import Staff from './Staff';
import Util from './Util';

export default class Cook extends Staff {
  constructor(config) {
    super(config);
    this.status = 'free';
    // singleton
    if (typeof Cook.instance === 'object') {
      return Cook.instance;
    }
    Cook.instance = this;
  }

  work(order) {
    this.setStatus('busy');
    Util.renderKitchenDishList(order.dishList);
    return order.dishList.reduce(
      (promise, dish, index, arr) =>
        promise.then(() => {
          Util.startCountdown(dish.time, '.kitchen .status', `cooking ${dish.name}`);
          return Util.wait(dish.time * 1000).then(() => {
            Util.updateLog(`Cook: ${dish.name} cooked.`);
            Util.renderKitchenDishList(arr.slice(index + 1));
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
