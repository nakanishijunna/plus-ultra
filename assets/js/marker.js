window.addEventListener('scroll', function () {
  const markers = document.querySelectorAll('.marker');

  markers.forEach(el => {
    const rect = el.getBoundingClientRect();
    const trigger = window.innerHeight * 0.85; // 画面下から15%の位置

    // 要素が画面内に入ったら実行
    if (rect.top < trigger) {
      el.classList.add('on');
    }
  });
});
