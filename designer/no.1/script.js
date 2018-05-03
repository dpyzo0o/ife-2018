var el = document.getElementById("target");
var btn = document.getElementById("myBtn");

btn.onclick = function () {
  el.classList.toggle("underline");
}