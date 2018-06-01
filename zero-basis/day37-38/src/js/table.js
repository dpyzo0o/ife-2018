import sourceData from './data';
import checkbox from './checkbox';

function render() {
  let wrapper = document.getElementById('table-wrapper');
  // empty table wrapper
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }

  let table = document.createElement('table');
  wrapper.appendChild(table);

  let tbody = document.createElement('tbody');
  table.appendChild(tbody);

  tbody.innerHTML = `<tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>`;

  // get selected regions and products
  let selected = checkbox.getSelectedItems();

  let isRegionFirst =
    selected.region.length === 1 &&
    selected.region.length < selected.product.length;

  // change order of the header
  if (isRegionFirst) {
    let temp = tbody.rows[0].cells[0].innerText;
    tbody.rows[0].cells[0].innerText = tbody.rows[0].cells[1].innerText;
    tbody.rows[0].cells[1].innerText = temp;
  }

  let selectedData = getData(selected);
  selectedData.forEach((el, idx) => {
    let tr = document.createElement('tr');

    // merge cells
    if (isRegionFirst) {
      if (idx % selected.product.length === 0) {
        tr.innerHTML = `<td rowspan=${selected.product.length}>${el.region}</td><td>${el.product}</td>`;
      } else {
        tr.innerHTML = `<td>${el.product}</td>`;
      }
    } else {
      if (idx % selected.region.length === 0) {
        tr.innerHTML = `<td rowspan=${selected.region.length}>${el.product}</td><td>${el.region}</td>`;
      } else {
        tr.innerHTML = `<td>${el.region}</td>`;
      }
    }

    el.sale.forEach(el => {
      tr.innerHTML += `<td>${el}<i class="fas fa-edit"></i></td>`;
    });

    tr.addEventListener('click', callback);

    tbody.appendChild(tr);
  });
}

function getData(selected) {
  let res = [];

  // use localStorage data if available
  let data = JSON.parse(localStorage.getItem('sourceData')) || sourceData;

  data.forEach(el => {
    if (
      selected.region.indexOf(el.region) > -1 &&
      selected.product.indexOf(el.product) > -1
    ) {
      res.push(el);
    }
  });

  return res;
}

function init() {
  render();
}

function getCurrentData() {
  let res = [];
  let tb = document.getElementsByTagName('tbody')[0];

  [...tb.childNodes].slice(1).forEach(el => {
    res.push([...el.childNodes].slice(-12).map(el => el.innerText));
  });

  return res;
}

function callback(e) {
  let t = e.target;
  if (t.nodeName === 'TD' && t.childNodes.length > 1) {
    let temp = t.innerHTML;
    t.innerHTML = `<input type="text">
                   <div class="input-icon">
                     <i class="fas fa-check"></i>
                     <i class="fas fa-times"></i>
                   </div>`;
    t.firstChild.focus();
    t.firstChild.setAttribute('placeholder', temp.slice(0, temp.indexOf('<')));

    t.firstChild.addEventListener('keydown', function(e) {
      // key enter
      if (e.keyCode === 13) {
        if (isNum(this.value)) {
          t.innerHTML = this.value + '<i class="fas fa-edit"></i>';
        }
      }

      // key esc
      if (e.keyCode === 27) {
        t.innerHTML = temp;
      }
    });

    t.firstChild.addEventListener('blur', function(e) {
      t.innerHTML = temp;
    });

    // blur is executed before click, use mousedown instead
    t.querySelector('.fa-check').addEventListener('mousedown', function(e) {
      let input = this.parentNode.previousElementSibling.value;
      if (isNum(input)) {
        t.innerHTML = this.parentNode.previousElementSibling.value + '<i class="fas fa-edit"></i>';
      }
    });

    t.querySelector('.fa-times').addEventListener('mousedown', function() {
      t.innerHTML = temp;
    });
  }
}

function isNum(value) {
  if (!isNaN(Number(value)) && value.trim() !== '') {
    return true;
  } else {
    alert('Input invalid!');
    return false;
  }
}

export default {
  render,
  init,
  getData,
  getCurrentData
};
