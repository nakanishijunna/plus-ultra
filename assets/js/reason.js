/*それぞれ開いたら説明画面が出る*/
$(function () {
  $(".grid-item").on("click", function () {
    const target = $(this).data("target");
    $("#" + target).addClass("show");
    $(".mask").addClass("open");

    document.body.classList.add("body--lock")
  });

  $(".mask,.mask-content").on("click", function () {
    $(".mask").removeClass("open");
    $(".mask-content").removeClass("show");

    document.body.classList.remove("body--lock");
  });
});

/*スクロールしたらセクションタイトルがフェードインする*/
$(function(){
  const $targets =$(".title-box.js-scroll-trigger");

  function checkAnimation(){
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();

    $targets.each(function(){
      const $target = $(this);
      const targetPos = $target.offset().top;

    if(scroll > targetPos - windowHeight * 0.8) {
      if(!$target.hasClass("is-animated")){
        $target.addClass("is-animated");
      }
    }
  });
  }

  $(window).on("scroll",checkAnimation);

  checkAnimation();
});
