import Staff from './Staff';
import Util from './Util';

export default class Waiter extends Staff {
  constructor(config) {
    super(config);
    this.type = 'WAITER';
    // singleton
    if (typeof Waiter.instance === 'object') {
      return Waiter.instance;
    }
    Waiter.instance = this;
  }

  work(order) {
    if (order && order.constructor === Array) { // pass order to cook
      Util.updateLog('Waiter: We will serve you as soon as possible. (Leaving...)');
      Util.move(this, 'hor', -250);
      return Util.wait(0.5).then(() => {
        return {
          dishList: order,
          waiter: this
        };
      });
    } else { // serve the dishes
      Util.move(this, 'hor', 150);
      Util.wait(0.5).then(() => {
        Util.updateLog('Waiter: This is your order. Enjoy!');
        if (!order) {
          // still have dishes, move back to kitchen
          Util.move(this, 'hor', -250);
        } else {
          // ready to collect money, stay near customer
          Util.move(this, 'hor', 100);
          Util.wait(0.5).then(() => {
            Util.updateLog('Collecting money...');
            this.bye();
          });
        }
      });
    }
  }

  welcome(customer) {
    Util.move(customer, 'hor', -150);
    Util.move(this, 'hor', 150);
    return Util.wait(0.5).then(() => {
      Util.updateLog(`Waiter: Hello ${customer.name}. Welcome to our restaurant. What would you like to eat?`);
      return customer;
    });
  }

  bye() {
    let waitingArea = document.querySelector('.waiting-area');
    let list = document.querySelectorAll('.waiting-area img');
    waitingArea.removeChild(list[0]);
    Util.renderDishList('dining', []);
    Util.updateLog('Waiter: I hope you enjoyed your meal. Have a nice day! Bye~ (Cleaning...)');
  }
}
