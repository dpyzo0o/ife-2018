import style from './css/main.css';
import table from './js/table';
import checkbox from './js/checkbox';
import BarChart from './js/bar';
import LineChart from './js/line';
import sourceData from './js/data';

checkbox.bind(document.getElementById('region-wrapper'));
checkbox.bind(document.getElementById('product-wrapper'));

checkbox.init();
table.init();

const barChart = new BarChart(document.getElementById('svg'), {
  data: [...document.getElementsByTagName('tr')[1].childNodes]
    .slice(-12)
    .map(el => el.innerText)
});
const lineChart = new LineChart(document.getElementById('canvas'));

window.addEventListener('mouseover', function(e) {
  if (e.target.nodeName === 'TD') {
    let tr = e.target.parentNode;
    let data = [...tr.childNodes].map(el => el.innerText).slice(-12);
    barChart.set(data);
    lineChart.set(data);
  } else if (
    e.target.nodeName !== 'INPUT' &&
    e.target.nodeName !== 'I' &&
    e.target.className !== 'input-icon'
  ) {
    lineChart.init();
  }
});

document
  .getElementById('select-wrapper')
  .addEventListener('change', function(e) {
    // add to history stack whenever user makes changes to selection
    history.pushState(
      {},
      null,
      '#' + encodeURI(JSON.stringify(checkbox.getSelectedItems()))
    );
    table.render();
    lineChart.init();
  });

window.onresize = function() {
  // workaround for firefox
  window.location.href = window.location.href;
};

// save current data into localStorage
document.getElementById('btn-save').addEventListener('click', function() {
  let data = [];
  let allData = sourceData;
  let tb = document.getElementsByTagName('tbody')[0];
  let thead = tb.childNodes[0];
  let regionFirst = thead.childNodes[0].innerHTML === '地区';
  let tempRow;

  [...tb.childNodes].slice(1).forEach((el, idx, arr) => {
    let row = [...el.childNodes];

    if (row.length === 14) {
      tempRow = row;
      let item = {
        product: regionFirst ? row[1].innerText : row[0].innerText,
        region: regionFirst ? row[0].innerText : row[1].innerText,
        sale: row.slice(-12).map(el => el.innerText)
      };
      data.push(item);
      modifySourceData(allData, item);
    } else {
      let item = {
        product: regionFirst ? row[0].innerText : tempRow[0].innerText,
        region: regionFirst ? tempRow[0].innerText : row[0].innerText,
        sale: row.slice(-12).map(el => el.innerText)
      };
      data.push(item);
      modifySourceData(allData, item);
    }
  });

  localStorage.setItem('selectedData', JSON.stringify(data));

  // save the modified source data
  localStorage.setItem('allData', JSON.stringify(allData));
});

// refresh checkboxes and table
window.addEventListener('popstate', function() {
  checkbox.init();
  table.render();
});

function modifySourceData(allData, item) {
  allData.forEach(el => {
    if (el.product === item.product && el.region === item.region) {
      el.sale = item.sale;
    }
  });
}
