import style from "./css/main.css";
import table from "./js/table";
import checkbox from "./js/checkbox";

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
