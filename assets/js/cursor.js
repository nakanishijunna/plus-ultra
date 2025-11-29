// main.js
(function () {
  const stalker = document.querySelector('.cursor-stalker');
  const label = stalker.querySelector('.label');
  const teacherBoxes = document.querySelectorAll('.p-teacher__box');

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  const ease = 0.2;

  let hoverTimer = null;

  // マウス移動で座標更新
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // リンクホバー時
  const links = document.querySelectorAll('a, button, [role="button"], [tabindex="0"], .icon, .grid-item, .accordion-header');
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      stalker.classList.add('is-link-hover');
      label.textContent = 'click';
    });
    link.addEventListener('mouseleave', () => {
      stalker.classList.remove('is-link-hover');
      label.textContent = '';
    });
  });

  // teacherBox 全てにホバーイベントを付与
  teacherBoxes.forEach((box) => {
    box.addEventListener('mouseenter', () => {
      stalker.classList.add('is-teacher-hover');
      label.textContent = 'place cursor';

      // 2秒後に戻すタイマー
      hoverTimer = setTimeout(() => {
        stalker.classList.remove('is-teacher-hover');
        label.textContent = '';
        hoverTimer = null;
      }, 2000);

      // 中央に誘導
      const rect = box.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    });

    box.addEventListener('mouseleave', () => {
      stalker.classList.remove('is-teacher-hover');
      label.textContent = '';
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
    });
  });

  // アニメーションループ
  function tick() {
    let size = 18;

    if (stalker.classList.contains('is-teacher-hover')) {
      size = 70;
    } else if (stalker.classList.contains('is-link-hover')) {
      size = 50;
    }

    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    stalker.style.transform = `translate3d(${currentX - size / 2}px, ${currentY - size / 2}px, 0)`;

    requestAnimationFrame(tick);
  }

  tick();
})();