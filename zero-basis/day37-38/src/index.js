import style from './css/main.css';
import table from './js/table';
import checkbox from './js/checkbox';
import BarChart from './js/bar';
import LineChart from './js/line';

checkbox.bind(document.getElementById('region-wrapper'));
checkbox.bind(document.getElementById('product-wrapper'));

checkbox.init();
table.init();

const barChart = new BarChart(document.getElementById('svg'));
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
    table.render();
    lineChart.init();
  });

window.onresize = function() {
  location.reload();
};

// save current data into localStorage
document.getElementById('btn-save').addEventListener('click', function() {
  let data = [];
  let tb = document.getElementsByTagName('tbody')[0];

  [...tb.childNodes].slice(1).forEach((el, idx, arr) => {
    let row = [...el.childNodes];
    if (row.length === 14) {
      data.push({
        product: row[0].innerText,
        region: row[1].innerText,
        sale: row.slice(-12).map(el => el.innerText)
      });
    } else {
      data.push({
        product: [...arr[Math.floor(idx / 3) * 3].childNodes][0].innerText,
        region: row[0].innerText,
        sale: row.slice(-12).map(el => el.innerText)
      });
    }
  });

  localStorage.setItem('sourceData', JSON.stringify(data));
});
