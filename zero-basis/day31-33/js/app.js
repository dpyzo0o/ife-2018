const selectWrapper = document.getElementById("select-wrapper");
selectWrapper.addEventListener("change", function() {
  renderTable();
});

initCheckbox();
initTable();
