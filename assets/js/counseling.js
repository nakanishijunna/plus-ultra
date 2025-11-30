
const tab = document.querySelector('.g__counseling__tab');
const worry = document.querySelector('.p-empathy__worries__wrapper');

function toggleClassByWidth() {

  //768px以下のときにだけ制御
  if (window.innerWidth <= 768) {

    const worryBottom = worry.offsetTop + worry.offsetHeight;

    if (window.scrollY >= worryBottom) {
      tab.classList.add('g__counseling__sp');
    } else {
      tab.classList.remove('g__counseling__sp');
    }
    }else{
    tab.classList.remove('g__counseling__sp');

  }
}

toggleClassByWidth();

//スクロール時
window.addEventListener('scroll', toggleClassByWidth);
//リサイズ時
window.addEventListener('resize', toggleClassByWidth);
