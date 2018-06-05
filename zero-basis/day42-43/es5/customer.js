function Customer(name, gender) {
  this.name = name;
  this.gender = gender;
}

Customer.prototype.order = function(dish) {
  console.log(this.name + ' ordered ' + dish.name + '(RMB' + dish.cost + ')');
};

Customer.prototype.eat = function() {
  console.log('Start eating.')
};
