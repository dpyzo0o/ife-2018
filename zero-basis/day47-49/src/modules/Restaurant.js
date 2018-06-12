export default class Restaurant {
  constructor(config) {
    this.cash = config.cash;
    this.seats = config.seats;
    this.staff = config.staff;
    this.timeUnit = config.timeUnit;
  }

  hire(staff) {
    this.staff.push(staff);
    this.cash -= staff.salary;
  }

  fire(staff) {
    this.staff.splice(this.staff.indexOf(staff), 1);
    this.cash += staff.salary;
  }
}
