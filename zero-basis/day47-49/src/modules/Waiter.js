import Staff from './Staff';
import Util from './Util';

export default class Waiter extends Staff {
  constructor(config) {
    super(config);
    // singleton
    if (typeof Waiter.instance === 'object') {
      return Waiter.instance;
    }
    Waiter.instance = this;
  }

  work(order) {
    if (order && order.constructor === Array) {
      console.log('Waiter: We will serve you as soon as possible. (Leaving...)');
      Util.move(this, 'hor', -300);
      return Util.wait(1000).then(() => {
        return {
          dishList: order,
          waiter: this
        };
      });
      // return new Promise(resolve => {
      //   console.log('We will serve you as soon as possible.');
      //   console.log('Leaving...');
      //   Util.move(this, 'hor', -300);
      //   setTimeout(() => {
      //     resolve(order);
      //   }, 1000);
      // });
    } else {
      Util.move(this, 'hor', 150);
      Util.wait(1000).then(() => {
        console.log('Waiter: This is your order. Enjoy!');
        if (!order) {
          // still have dishes in kitchen
          Util.move(this, 'hor', -300);
        } else {
          // ready to collect money
          Util.move(this, 'hor', 100);
          Util.wait(1000).then(() => {
            console.log('Collecting money...');
            this.bye();
          });
        }
      });
      // Util.move(this, 'hor', 150);
      // if (!order) {
      //   Util.wait(1000).then(() => {
      //     console.log('Waiter: This is your order. Enjoy!');
      //     // still have dishes in kitchen
      //     Util.move(this, 'hor', -300);
      //   });
      // } else {
      //   console.log('Waiter: This is your order. Enjoy!');
      //   return Util.wait(1000).then(() => Util.move(this, 'hor', 100));
      // }
    }
  }

  welcome(customer) {
    Util.move(customer, 'hor', -200);
    Util.move(this, 'hor', 150);
    return Util.wait(1000).then(() => {
      console.log(`Waiter: Hello ${customer.name}. Welcome to our restaurant. What would you like to eat?`);
      return customer;
    });
    // let addressing = customer.gender === 'male' ? 'Mr' : 'Ms';
  }

  bye() {
    let waitingArea = document.querySelector('.waiting-area');
    let list = document.querySelectorAll('.waiting-area img');
    waitingArea.removeChild(list[0]);
    Util.renderDiningDishList([]);
    console.log('Waiter: I hope you enjoyed your meal. Have a nice day! Bye~ (Cleaning...)');
  }
}
