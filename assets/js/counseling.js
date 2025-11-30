
const tab = document.querySelector('.g__counseling__tab');
const empathy = document.querySelector('#empathy');

function toggleClassByWidth() {

  //768px以下のときにだけ制御
  if (window.innerWidth <= 768) {

    const empathyBottom = empathy.offsetTop + empathy.offsetHeight;

    if (window.scrollY >= empathyBottom) {
      tab.classList.add('g__counseling__sp');
    } else {
      tab.classList.remove('g__counseling__sp');
    }
  }
}

toggleClassByWidth();

//スクロール時
window.addEventListener('scroll', toggleClassByWidth);
//リサイズ時
window.addEventListener('resize', toggleClassByWidth);
