import style from "./css/main.css";
import table from "./js/table";
import checkbox from "./js/checkbox";
import { drawLineChart } from "./js/line";
import { drawBarChart } from "./js/bar";

const selectWrapper = document.getElementById("select-wrapper");
selectWrapper.addEventListener("change", function() {
  table.render();
});

const regionWrapper = document.getElementById("region-wrapper");
checkbox.bind(regionWrapper);

const productWrapper = document.getElementById("product-wrapper");
checkbox.bind(productWrapper);

checkbox.init();
table.init();

const tableWrapper = document.getElementById("table-wrapper");
tableWrapper.addEventListener("mouseover", function(e) {
  let tr = e.target.parentNode;
  let data = [...tr.childNodes].map(el => el.innerText).slice(2);
  drawBarChart(data);
  drawLineChart(data);
});
