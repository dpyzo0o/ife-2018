function bind(container) {
  let checkboxItem = container.querySelectorAll('[checkbox-type=single]');
  let checkboxAll = container.querySelector('[checkbox-type=all]');

  // select all logic
  container.addEventListener('change', function(e) {
    let checkedboxes = [...checkboxItem].filter(item => item.checked);
    if (e.target.getAttribute('checkbox-type') === 'all') {
      if (checkedboxes.length !== checkboxItem.length) {
        for (let i = 0; i < checkboxItem.length; i++) {
          checkboxItem[i].checked = e.target.checked;
        }
      } else {
        e.target.checked = true;
      }
    } else {
      switch (checkedboxes.length) {
        case 0:
          e.target.checked = true;
          break;
        case checkboxItem.length:
          checkboxAll.checked = true;
          break;
        default:
          checkboxAll.checked = false;
      }
    }
  });
}

function getSelectedItems() {
  let region = [];
  let product = [];

  document
    .getElementById('region-wrapper')
    .querySelectorAll('[checkbox-type=single]')
    .forEach(el => {
      if (el.checked) {
        region.push(el.value);
      }
    });

  document
    .getElementById('product-wrapper')
    .querySelectorAll('[checkbox-type=single]')
    .forEach(el => {
      if (el.checked) {
        product.push(el.value);
      }
    });

  return {
    region,
    product
  };
}

function init() {
  document
    .getElementById('select-wrapper')
    .querySelectorAll('input')
    .forEach(el => {
      el.checked = true;
    });
}

export default {
  bind,
  init,
  getSelectedItems
};
