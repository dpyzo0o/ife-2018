import Util from "./Util";

export default class Restaurant {
  constructor(config) {
    this.cash = config.cash;
    this.seats = config.seats;
    this.staff = config.staff;
    this.customerQueue = config.customerQueue;
  }

  hire(staff) {
    this.staff.push(staff);
    this.cash -= staff.salary;
  }

  fire(staff) {
    this.staff.splice(this.staff.indexOf(staff), 1);
    this.cash += staff.salary;
  }

  nextCustomer() {
    Util.updateWaitingNum(this.customerQueue.length - 1);
    return this.customerQueue.shift();
  }

  addCash(value) {
    this.cash += value;
  }

  getCash() {
    return this.cash;
  }

  updateCash(order) {
    order.forEach(dish => {
      this.addCash(dish.price - dish.cost);
    });
    return order;
  }
}
