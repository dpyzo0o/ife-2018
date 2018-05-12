var bgImgs = document.querySelectorAll(".wrapper > img");
var sliderImgs = document.querySelectorAll(".slider > img");

sliderImgs.forEach(function (elem, idx) {
  elem.addEventListener("click", function () {
    // keep the previous animated image as the background
    bgImgs.forEach(function (el) {
      if (el.classList.contains("incZ")) {
        el.classList.remove("incZ");
      }
      if (el.classList.contains("animated")) {
        el.classList.remove("animated");
        el.classList.add("incZ");
      }
    });
    bgImgs[idx].classList.add("animated");
  });
})