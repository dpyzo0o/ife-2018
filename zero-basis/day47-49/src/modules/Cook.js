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

  work(order, waiter) {
    for (let i = 0, p = Promise.resolve(); i < order.length; i++) {
      p = p.then(
        _ =>
          new Promise((resolve, reject) =>
            setTimeout(() => {
              console.log(`${order[i].name} cooked.`);
              waiter.work();
              resolve();
            }, order[i].time * 1000)
          )
      );
    }
  }
}
