function Waiter(name, salary) {
  Staff.call(this, name, salary);
}

Waiter.prototype = new Staff();

Waiter.prototype.doJob = function(order) {
  if (order.constructor === Array) {
    console.log('Customer has ordered...');
  } else {
    console.log('Serve the dishes.');
  }
};
