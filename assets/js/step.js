$('.accordion-header').click(function () {
    // クリックした以外のアコーディオンを閉じる
    $('.accordion-header').not(this).next().slideUp();
    $('.accordion-header').not(this).removeClass('active');

    // クリックしたアコーディオンを開閉
    $(this).next().slideToggle();
    $(this).toggleClass('active');
});