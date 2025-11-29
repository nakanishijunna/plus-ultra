$(function(){
  $(".accordion-header").on("click",function(){
    $(".accordion-header").not(this).next().slideUp();
    $(".accordion-header").not(this).removeClass("active");
    $(this).next().slideToggle();
    $(this).toggleClass("active");
  });
});
