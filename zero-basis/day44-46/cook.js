function Cook(name, salary) {
  Staff.call(this, name, salary);
  // singleton
  let instance = this;
  Cook = function() {
    return instance;
  };
}

Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;

Cook.prototype.work = function(dish) {
  console.log('Cook: ' + dish.name + ' is cooked.');
};
