function Restaurant(config) {
  this.asset = config.asset;
  this.seats = config.seats;
  this.staff = config.staff;
}

Restaurant.prototype.hire = function(staff) {
  this.staff.push(staff);
  this.asset -= staff.salary;
};

Restaurant.prototype.fire = function(staff) {
  this.staff.splice(this.staff.indexOf(staff), 1);
  this.asset += staff.salary;
};
