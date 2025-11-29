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


$(function(){
  const $target =$(".title-box.js-scroll-trigger");

  function checkAnimation(){
    const targetPos = $target.offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();

    if(scroll > targetPos - windowHeight * 0.8) {
      if(!$target.hasClass("is-animated")){
        $target.addClass("is-animated");
      }
    }
  }

  $(window).on("scroll",checkAnimation);

  checkAnimation();
});
