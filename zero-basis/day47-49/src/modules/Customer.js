import Util from './Util';
import Constants from './Constants';

export default class Customer {
  constructor(config) {
    this.id = Math.random()
      .toString(36)
      .substr(2, 16);
    this.name = config.name;
    // this.gender = config.gender;
    this.img = config.img;
  }

  order(menu) {
    Util.startCountdown(3, '.dining-area .status', 'ordering');
    return Util.wait(3).then(() => {
      // order 1-4 dishes
      let num = Math.floor(Math.random() * 4) + 1;
      let order = [];
      while (num--) {
        let idx = Math.floor(Math.random() * menu.length);
        order.push(menu[idx]);
        menu.splice(idx, 1);
      }
      // finish ordering
      this.setStatus('');
      Util.updateLog(this.name + ': I want to order ' + order.map(el => el.name));
      Util.renderDishList('dining', order);
      return order;
    });
  }

  eat() {
    Util.updateLog(this.name + ': (finished eating..) Very delicious!');
  }

  setStatus(status) {
    document.querySelector('.dining-area .status').innerHTML = status;
  }
}
