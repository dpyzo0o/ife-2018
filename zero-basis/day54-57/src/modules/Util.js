function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function setStyles(el, styles) {
  Object.assign(el.style, styles);
}

export default {
  setAttributes,
  setStyles
}
