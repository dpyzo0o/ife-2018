import style from './css/main.css';
import table from './js/table';
import checkbox from './js/checkbox';
import BarChart from './js/bar';
import LineChart from './js/line';

const regionWrapper = document.getElementById('region-wrapper');
checkbox.bind(regionWrapper);

const productWrapper = document.getElementById('product-wrapper');
checkbox.bind(productWrapper);

checkbox.init();
table.init();

const barChart = new BarChart(document.getElementById('svg'));
const lineChart = new LineChart(document.getElementById('canvas'));
const tableWrapper = document.getElementById('table-wrapper');

tableWrapper.addEventListener('mouseover', function(e) {
  if (e.target.nodeName === 'TD') {
    let tr = e.target.parentNode;
    let data = [...tr.childNodes].map(el => el.innerText).slice(2);
    barChart.set(data);
    lineChart.set(data);
  }
});

const COLOR = [
  '#f44242',
  '#f48c41',
  '#f4e541',
  '#9af441',
  '#41f4df',
  '#41aff4',
  '#4143f4',
  '#ca41f4',
  '#f4419d'
];
const selectWrapper = document.getElementById('select-wrapper');
selectWrapper.addEventListener('change', function() {
  table.render();
  lineChart.init();
  let selectedData = table.getData(checkbox.getSelectedItems()).map(el => el.sale);
  lineChart.drawLines(selectedData, COLOR);
});
