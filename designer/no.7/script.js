$(function () {
  $(".form__input").change(function () {
    $(this).attr("data-changed", true);

    // if both input are filled
    if ($(".form__input").length == $(".form__input[data-changed='true']").length) {
      $(".form__wrapper__submit").addClass("animated pulse");
    }

    if ($(this).val()) {
      $(this).addClass("form__filled");
    } else {
      $(this).removeClass("form__filled");
    }
  });
});