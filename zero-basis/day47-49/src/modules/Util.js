function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function initView(restaurant) {
  for (let staff of restaurant.staff) {
    switch (staff.constructor.name) {
      case 'Cook':
        let cookImg = new Image();
        cookImg.src = staff.img;
        document.querySelector('.kitchen').appendChild(cookImg);
        break;
      case 'Waiter':
        let waiterImg = new Image();
        waiterImg.src = staff.img;
        waiterImg.setAttribute('id', staff.id);
        document.querySelector('.dining-area').appendChild(waiterImg);
        break;
    }
  }
  for (let customer of restaurant.customerQueue) {
    let customerImg = new Image();
    customerImg.src = customer.img;
    customerImg.setAttribute('id', customer.id);
    document.querySelector('.waiting-area').appendChild(customerImg);
  }
  updateCash(restaurant);
  updateWaitingNum(restaurant.customerQueue.length);
}

function updateCash(restaurant) {
  document.querySelector('.cash').innerHTML = `Cash: ${restaurant.getCash()}`;
}

function updateWaitingNum(num) {
  document.querySelector('.waiting-num').innerHTML = `Waiting: ${num}`;
}

function move(element, direction, distance) {
  let dom = document.getElementById(element.id);
  if (direction === 'hor') {
    dom.style.left = distance + 'px';
  } else {
    dom.style.top = distance + 'px';
  }
}

function renderKitchenDishList(order) {
  let list = document.querySelector('.kitchen .dish-list');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  order.forEach(dish => {
    let li = document.createElement('li');
    li.innerHTML = dish.name;
    list.appendChild(li);
  });
}

function renderDiningDishList(order) {
  let list = document.querySelector('.dining-area .dish-list');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  if (order.length) {
    order.forEach(dish => {
      let li = document.createElement('li');
      li.innerHTML = dish.name;
      list.appendChild(li);
    });
  }
}

function startCountdown(time, selector, text) {
  let dom = document.querySelector(selector);
  (function timer() {
    dom.innerHTML = `${text} (${time--}s)`;
    if (time > 0) {
      setTimeout(timer, 1000);
    }
  })();
}

function updateLog(text) {
  let p = document.createElement('p');
  p.innerHTML = text;
  let log = document.querySelector('.log');
  log.appendChild(p);
  // auto scrolling to added text
  log.scrollTop = log.scrollHeight;
}

export default {
  wait,
  move,
  renderKitchenDishList,
  renderDiningDishList,
  startCountdown,
  initView,
  updateCash,
  updateLog,
  updateWaitingNum
};
