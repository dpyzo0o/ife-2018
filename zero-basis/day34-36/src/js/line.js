export function drawLineChart(data) {
  let cvsWidth = 400;
  let cvsHeight = 300;
  let margin = 10;
  let axisWidth = cvsWidth - 2 * margin;
  let axisHeight = cvsHeight - 2 * margin;
  let pRadius = 2.5;
  let pColor = "rgb(0,0,0)";
  let lineWidth = 2;
  let lineColor = "rgb(0,0,0)";
  let stride = axisWidth / (2 * data.length + 1);

  let max = Math.max(...data);
  let ratio = axisHeight / max;

  let canvas = document.getElementById("canvas");
  canvas.width = cvsWidth;
  canvas.height = cvsHeight;

  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.moveTo(margin, cvsHeight - margin);
  ctx.lineTo(margin, margin);
  ctx.moveTo(margin, cvsHeight - margin);
  ctx.lineTo(cvsWidth - margin, cvsHeight - margin);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.stroke();

  let temp;
  data.forEach((el, idx) => {
    let x = margin + stride * (2 * idx + 1);
    let y = cvsHeight - ratio * el;
    ctx.beginPath();
    ctx.arc(x, y, pRadius, 0, 2 * Math.PI);
    ctx.fillStyle = pColor
    ctx.fill();

    if (idx) {
      ctx.moveTo(temp.x, temp.y);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    temp = {
      x: x,
      y: y
    };
  });
}