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
