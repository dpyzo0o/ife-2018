class Waiter extends Staff {
  constructor(name, salary) {
    super(name, salary);
  }

  doJob(order) {
    if (order.constructor === Array) {
      console.log('Customer has ordered...');
    } else {
      console.log('Serve the dishes.');
    }
  }
}
