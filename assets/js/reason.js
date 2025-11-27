$(function () {
  $(".grid-item").on("click", function () {
    const target = $(this).data("target");
    $("#" + target).addClass("show");
    $(".mask").addClass("open");
  });

  $(".mask,.mask-content").on("click", function () {
    $(".mask").removeClass("open");
    $(".mask-content").removeClass("show");
  });
});
