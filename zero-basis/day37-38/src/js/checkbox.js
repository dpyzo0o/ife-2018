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
  if (localStorage.getItem('selectedData')) {
    let data = JSON.parse(localStorage.getItem('selectedData'));
    let product = [];
    let region = [];

    data.forEach(el => {
      if (product.indexOf(el.product) === -1) {
        product.push(el.product);
        document.getElementsByName(el.product)[0].checked = true;
      }

      if (region.indexOf(el.region) === -1) {
        region.push(el.region);
        document.getElementsByName(el.region)[0].checked = true;
      }
    });

    document.getElementById('regionAll').checked = region.length === 3;
    document.getElementById('productAll').checked = product.length === 3;
  } else {
    document
      .getElementById('select-wrapper')
      .querySelectorAll('input')
      .forEach(el => {
        el.checked = true;
      });
  }
}

export default {
  bind,
  init,
  getSelectedItems
};
