import './css/main.css';
import Factory from './modules/Factory';
import cookImg from './img/cook.png';
import waiterImg from './img/waiter.png';
import customerImg from './img/customer.png';

// init restaurant
const restaurant = Factory.getInstance(Factory.RESTAURANT, {
  cash: 10000,
  seats: 20,
  staff: [],
  customerQueue: []
});

// hire staff
const cook = Factory.getInstance(Factory.COOK, {
  name: 'Ramsay',
  salary: 4000,
  img: cookImg
});
const waiter = Factory.getInstance(Factory.WAITER, {
  name: 'Cinderella',
  salary: 1000,
  img: waiterImg
});
restaurant.hire(cook);
restaurant.hire(waiter);

// init menu
const menu = [
  Factory.getInstance(Factory.DISH, {
    name: 'Sweet and Sour Pork',
    cost: 50,
    price: 100,
    time: 3
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Kung Pao Chicken',
    cost: 40,
    price: 80,
    time: 4
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Ma Po Tofu',
    cost: 30,
    price: 60,
    time: 4
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Dumplings',
    cost: 35,
    price: 70,
    time: 3
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Spring Rolls',
    cost: 20,
    price: 50,
    time: 3
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Peking Roasted Duck',
    cost: 100,
    price: 200,
    time: 5
  })
];

// init customer queue
restaurant.customerQueue = [
  Factory.getInstance(Factory.CUSTOMER, {
    name: 'David Beckham',
    gender: 'male',
    img: customerImg
  }),
  Factory.getInstance(Factory.CUSTOMER, {
    name: 'Cristiano Ronaldo',
    gender: 'male',
    img: customerImg
  }),
  Factory.getInstance(Factory.CUSTOMER, {
    name: 'Taylor Swift',
    gender: 'female',
    img: customerImg
  })
];

restaurant.initView();

document.querySelector('.start').addEventListener('click', function() {
  start();
});

function start() {
  if (restaurant.customerQueue.length === 0) {
    return;
  }

  let customer = restaurant.nextCustomer();
  waiter.welcome(customer);
  customer.order(menu.slice(), 3000)
    .then(order => waiter.work(order))
    .then(order => cook.work(order, waiter));
}
