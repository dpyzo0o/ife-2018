function Cook(name, salary) {
  Staff.call(this, name, salary);
}

Cook.prototype = new Staff();

Cook.prototype.doJob = function() {
  console.log('Dish is cooked.');
};
