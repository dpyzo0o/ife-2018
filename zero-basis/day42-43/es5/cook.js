function Cook(name, salary) {
  Staff.call(this, name, salary);
}

Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;

Cook.prototype.doJob = function() {
  console.log('Dish is cooked.');
};
