class Restaurant {
  constructor(config) {
    this.cash = config.cash;
    this.seats = config.seats;
    this.staff = config.staff;
  }

  hire(staff) {
    this.staff.push(staff);
  }

  fire(staff) {
    this.staff.splice(this.staff.indexOf(staff), 1);
  }
}
