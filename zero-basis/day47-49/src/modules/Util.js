function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  };
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
  };
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

export default {
  wait,
  move,
  renderKitchenDishList,
  renderDiningDishList,
  startCountdown
};
