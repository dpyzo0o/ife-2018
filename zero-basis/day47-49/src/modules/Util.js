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

export default {
  wait,
  move
}
