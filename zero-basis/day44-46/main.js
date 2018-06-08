// init restaurant
const restaurant = new Restaurant({
  asset: 10000,
  seats: 20,
  staff: []
});

// hire staff
const cook = new Cook('Ramsay', 4000);
const waiter = new Waiter('Cinderella', 1000);
restaurant.hire(cook);
restaurant.hire(waiter);

// init menu
const menu = [
  new Dish('Sweet and Sour Pork', 20),
  new Dish('Kung Pao Chicken', 30),
  new Dish('Ma Po Tofu', 15),
  new Dish('Dumplings', 20),
  new Dish('Spring Rolls', 15),
  new Dish('Peking Roasted Duck', 50)
];

// init customer queue
const customer1 = new Customer('David Beckham', 'male');
const customer2 = new Customer('Cristiano Ronaldo', 'male');
const customer3 = new Customer('Taylor Swift', 'female');
let customerQueue = [customer1, customer2, customer3];

document.querySelector('.start').addEventListener('click', function() {
  operate();
});

function operate() {
  while (true) {
    let customer = customerQueue.shift();
    waiter.welcome(customer);
    let order = customer.order(menu);
    waiter.work(order);
    restaurant.cash += order[0].price - order[0].cost;
    cook.work(order[0]);
    waiter.work();
    customer.eat();
    waiter.bye();
    if (customerQueue.length === 0) {
      break;
    }
    console.log('Next customer...');
  }

  console.log('Finished today. Current asset: ' + restaurant.asset);
}
