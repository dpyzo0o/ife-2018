var ifeRestaurant = new Restaurant({
  cash: 1000000,
  seats: 20,
  staff: []
});

var newCook = new Cook('Tony', 10000);
ifeRestaurant.hire(newCook);

var newWaiter = new Waiter('Tom', 3000);
ifeRestaurant.hire(newWaiter);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);

newWaiter.doJob(['11', '22']);
newWaiter.doJob('test');

var newCustomer = new Customer('customer1', 'male');
newCustomer.order(new Dish('Fish', 100, 200));
