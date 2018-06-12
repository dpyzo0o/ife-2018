import Staff from './Staff';

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
      console.log('Waiter: You have ordered ' + order.map(el => el.name) + '. We will serve you as soon as possible.');
      console.log('Leaving...');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(order);
        }, 1000);
      });
    } else {
      console.log('Waiter: This is your order. Enjoy!');
    }
  }

  welcome(customer) {
    let addressing = customer.gender === 'male' ? 'Mr ' : 'Ms ';
    console.log(
      'Waiter: Hello ' + addressing + customer.name + '. Welcome to our restaurant. What would you like to eat?'
    );
  }

  bye() {
    console.log('Waiter: I hope you enjoyed your meal. Have a nice day! Bye~');
  }
}
