function renderTable() {
  let wrapper = document.getElementById("table-wrapper");
  // empty table wrapper
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }

  let table = document.createElement("table");
  wrapper.appendChild(table);

  let tbody = document.createElement("tbody");
  table.appendChild(tbody);

  tbody.innerHTML = `<tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>`;

  // get selected regions and products
  let selected = getSelectedItems();

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
    let tr = document.createElement("tr");

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
      tr.innerHTML += `<td>${el}</td>`;
    });

    tbody.appendChild(tr);
  });
}

function getData(selected) {
  let res = [];
  sourceData.forEach(el => {
    if (
      selected.region.indexOf(el.region) > -1 &&
      selected.product.indexOf(el.product) > -1
    ) {
      res.push(el);
    }
  });

  return res;
}

function initTable() {
  renderTable();
}
