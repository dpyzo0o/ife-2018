function Customer(name, gender) {
  this.name = name;
  this.gender = gender;
}

/**
 * Select one dish from the menu
 * @param {Array} menu An array of dishes
 */
Customer.prototype.order = function(menu) {
  let dish = menu[Math.floor(Math.random() * menu.length)];
  console.log(this.name + ': I want to order ' + dish.name);
  return [dish];
};

Customer.prototype.eat = function() {
  console.log(this.name + ': (finished eating..) Very delicious!');
};
