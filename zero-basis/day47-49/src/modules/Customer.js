export default class Customer {
  constructor(config) {
    this.name = config.name;
    this.gender = config.gender;
  }

  order(menu, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let num = Math.floor(Math.random() * menu.length) + 1;
        let dish = [];
        while (num--) {
          let idx = Math.floor(Math.random() * menu.length);
          dish.push(menu[idx]);
          menu.splice(idx, 1);
        }
        console.log(this.name + ': I want to order ' + dish.map(el => el.name));
        resolve(dish);
      }, time);
    });
  }

  eat() {
    console.log(this.name + ': (finished eating..) Very delicious!');
  }
}
