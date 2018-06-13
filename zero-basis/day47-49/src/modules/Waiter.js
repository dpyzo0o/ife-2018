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
      console.log('We will serve you as soon as possible.');
      console.log('Leaving...');
      Util.move(this, 'hor', -300);
      return Util.wait(1000).then(() => order);
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
        // still have dishes in kitchen
        if (!order) {
          Util.move(this, 'hor', -300);
        }
      });
    }
  }

  welcome(customer) {
    Util.move(customer, 'hor', -200);
    Util.move(this, 'hor', 150);
    let addressing = customer.gender === 'male' ? 'Mr ' : 'Ms ';
    console.log(
      'Waiter: Hello ' + addressing + customer.name + '. Welcome to our restaurant. What would you like to eat?'
    );
  }

  bye() {
    console.log('Waiter: I hope you enjoyed your meal. Have a nice day! Bye~');
  }
}
