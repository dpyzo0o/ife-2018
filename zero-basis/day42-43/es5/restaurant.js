function Restaurant(config) {
  this.cash = config.cash;
  this.seats = config.seats;
  this.staff = config.staff;
}

Restaurant.prototype.hire = function(staff) {
  this.staff.push(staff);
};

Restaurant.prototype.fire = function(staff) {
  this.staff.splice(this.staff.indexOf(staff), 1);
};
