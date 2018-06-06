function Waiter(name, salary) {
  Staff.call(this, name, salary);
}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;

Waiter.prototype.doJob = function(order) {
  if (order.constructor === Array) {
    console.log('Customer has ordered...');
  } else {
    console.log('Serve the dishes.');
  }
};
