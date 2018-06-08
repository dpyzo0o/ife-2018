function Waiter(name, salary) {
  Staff.call(this, name, salary);
  // singleton
  let instance = this;
  Waiter = function() {
    return instance;
  };
}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;

Waiter.prototype.work = function(order) {
  if (order && order.constructor === Array) {
    console.log(
      'Waiter: You have ordered ' +
        order[0].name +
        '. We will serve you as soon as possible.'
    );
  } else {
    console.log('Waiter: This is your order. Enjoy!');
  }
};

Waiter.prototype.welcome = function(customer) {
  let addressing = customer.gender === 'male' ? 'Mr ' : 'Ms ';
  console.log(
    'Waiter: Hello ' +
      addressing +
      customer.name +
      '. Welcome to our restaurant. What would you like to eat?'
  );
};

Waiter.prototype.bye = function() {
  console.log('Waiter: I hope you enjoyed your meal. Have a nice day! Bye~');
};
