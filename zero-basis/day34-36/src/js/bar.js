export function drawBarChart(data) {
  let svgWidth = 400;
  let svgHeight = 300;
  let margin = 10;
  let axisWidth = svgWidth - 2 * margin;
  let axisHeight = svgHeight - 2 * margin;
  let barWidth = axisWidth / (2 * data.length + 1);
  let barColor = "lightblue";
  let axisColor = "black";

  let max = Math.max(...data);
  let ratio = axisHeight / max;

  let svg = document.getElementById("svg");
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  setAttributes(svg, {
    width: svgWidth,
    height: svgHeight
  });

  let xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  setAttributes(xAxis, {
    x1: margin,
    y1: svgHeight - margin,
    x2: margin,
    y2: margin,
    stroke: axisColor,
    "stroke-width": 2
  });

  let yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  setAttributes(yAxis, {
    x1: margin,
    y1: svgHeight - margin,
    x2: svgWidth - margin,
    y2: svgHeight - margin,
    stroke: axisColor,
    "stroke-width": 2
  });

  svg.appendChild(xAxis);
  svg.appendChild(yAxis);

  data.forEach((el, idx) => {
    let h = ratio * el;
    let bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    setAttributes(bar, {
      x: margin + barWidth * (2 * idx + 1),
      y: svgHeight - margin - h - 2,
      width: barWidth,
      height: h,
      fill: barColor
    });
    svg.appendChild(bar);
  });
}

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttributeNS(null, key, attrs[key]);
  }
}
