import './css/main.css';
import Factory from './modules/Factory';
import cookImg from './img/cook.png';
import waiterImg from './img/waiter.png';
import customerImg from './img/customer.png';
import Util from './modules/Util';

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
    time: 4
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Kung Pao Chicken',
    cost: 40,
    price: 80,
    time: 6
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Ma Po Tofu',
    cost: 30,
    price: 60,
    time: 6
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Dumplings',
    cost: 35,
    price: 70,
    time: 8
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Spring Rolls',
    cost: 20,
    price: 50,
    time: 6
  }),
  Factory.getInstance(Factory.DISH, {
    name: 'Peking Roasted Duck',
    cost: 100,
    price: 200,
    time: 8
  })
];

// init customer queue
restaurant.customerQueue = [
  Factory.getInstance(Factory.CUSTOMER, {
    name: 'David',
    img: customerImg
  }),
  Factory.getInstance(Factory.CUSTOMER, {
    name: 'Tom',
    img: customerImg
  }),
  Factory.getInstance(Factory.CUSTOMER, {
    name: 'Lily',
    img: customerImg
  })
];

restaurant.initView();

document.querySelector('.start').addEventListener('click', function() {
  serving();
});

function serving() {
  if (restaurant.customerQueue.length === 0) {
    return;
  }

  waiter.welcome(restaurant.nextCustomer())
    .then(customer => customer.order(menu.slice()))
    .then(order => waiter.work(order))
    .then(order => cook.work(order))
    .then(() => Util.wait(4000))
    .then(serving);
}
