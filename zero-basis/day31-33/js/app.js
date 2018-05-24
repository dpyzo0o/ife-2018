const selectWrapper = document.getElementById("select-wrapper");
selectWrapper.addEventListener("change", function() {
  renderTable();
});

const regionWrapper = document.getElementById("region-wrapper");
bindCheckbox(regionWrapper);

const productWrapper = document.getElementById("product-wrapper");
bindCheckbox(productWrapper);

initCheckbox();
initTable();
