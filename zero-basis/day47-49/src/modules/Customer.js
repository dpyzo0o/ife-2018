export default class Customer {
  constructor(config) {
    this.id = Math.random().toString(36).substr(2, 16);
    this.name = config.name;
    this.gender = config.gender;
    this.img = config.img;
  }

  order(menu, time) {
    return new Promise(resolve => {
      setTimeout(() => {
        let num = Math.floor(Math.random() * menu.length) + 1;
        let order = [];
        while (num--) {
          let idx = Math.floor(Math.random() * menu.length);
          order.push(menu[idx]);
          menu.splice(idx, 1);
        }
        console.log(this.name + ': I want to order ' + order.map(el => el.name));
        resolve(order);
      }, time);
    });
  }

  eat() {
    console.log(this.name + ': (finished eating..) Very delicious!');
  }
}
