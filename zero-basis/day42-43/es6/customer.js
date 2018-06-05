class Customer {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }

  order(dish) {
    console.log(this.name + ' ordered ' + dish.name + '(RMB' + dish.cost + ')');
  }

  eat() {
    console.log('Start eating.');
  }
}
