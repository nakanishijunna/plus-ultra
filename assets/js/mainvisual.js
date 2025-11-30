/* ------------------------------
  背景動画 3 本をループ再生
------------------------------ */
const videoList = [
  "/img/VidnozImageToVideo (1).mp4",
  "/img/VidnozImageToVideo (2).mp4",
  "/img/VidnozImageToVideo (3).mp4"
];

let currentVideo = 0;
const bgVideo = document.getElementById("bgVideo");

// 最初の動画を設定
bgVideo.src = videoList[currentVideo];
bgVideo.load();
bgVideo.play();

// 動画が終わったら次へ
bgVideo.addEventListener("ended", () => {
  currentVideo = (currentVideo + 1) % videoList.length; // 0→1→2→0
  bgVideo.src = videoList[currentVideo];
  bgVideo.load();
  bgVideo.play();
});


/* ------------------------------
  スクロールロック
------------------------------ */
function preventScroll(e) { e.preventDefault(); }
function preventKeyboard(e) {
  const keys = ["ArrowUp","ArrowDown","PageUp","PageDown","Space"," "];
  if (keys.includes(e.key)) e.preventDefault();
}

function disableScroll() {
  document.body.style.overflow = "hidden";
  window.addEventListener("wheel", preventScroll, { passive:false });
  window.addEventListener("touchmove", preventScroll, { passive:false });
  window.addEventListener("keydown", preventKeyboard, { passive:false });
}

function enableScroll() {
  document.body.style.overflow = "auto";
  window.removeEventListener("wheel", preventScroll);
  window.removeEventListener("touchmove", preventScroll);
  window.removeEventListener("keydown", preventKeyboard);
}


/* ------------------------------
  メイン処理
------------------------------ */
document.addEventListener("DOMContentLoaded", () => {

  const hero = document.getElementById("hero");
  const arrowBody = document.getElementById("arrowBody");
  const video = document.querySelector(".bg-video video");

  /* ▼ メインビジュアル中はスクロール禁止 */
  disableScroll();

  /* ▼ 背景動画フェードイン（ゆっくり） */
  video.style.opacity = "0";
  video.style.transform = "scale(1.15)";
  video.style.transition = "opacity 3.5s ease-out, transform 3.5s ease-out";

  requestAnimationFrame(() => {
    video.style.opacity = "1";
    video.style.transform = "scale(1)";
  });


  /* ---------------- SVG 手書き ---------------- */
  const paths = document.querySelectorAll("#logoSVG path");

  setTimeout(() => {
    paths.forEach(path => {
      const L = path.getTotalLength();
      path.style.strokeDasharray = L;
      path.style.strokeDashoffset = L;
    });

    const tl = gsap.timeline({ defaults:{ duration:1.4, ease:"power2.out" }});

    paths.forEach((path, i) => {
      tl.to(path, { strokeDashoffset:0 }, i===0 ? 0 : "-=1.0");
    });

    tl.fromTo(
      [".hero-tagline", ".hero-sub", ".drag-area"],
      { opacity:0, y:15 },
      { opacity:1, duration:1.4, y:0, stagger:0.2 }
    );
  }, 300);


  /* ---------------- ドラッグ処理 ---------------- */
  let dragging = false;
  let startX = 0;
  let delta = 0;

  const getX = e => (e.touches ? e.touches[0].clientX : e.clientX);


  /* --- 開始 --- */
  function startDrag(e) {
    dragging = true;
    startX = getX(e);
    hero.style.transition = "none";
  }

  /* --- 移動 --- */
  function moveDrag(e) {
    if (!dragging) return;

    delta = getX(e) - startX;   // 右ドラッグ → positive

    /* ▼ 左ドラッグは完全に無効 */
    if (delta < 0) {
      hero.style.transform = "translateX(0)";
      arrowBody.style.width = "20px";
      return;
    }

    /* ▼ 右ドラッグだけ動かす */
    const moveX = Math.min(delta, window.innerWidth);
    hero.style.transform = `translateX(${moveX}px)`;

    /* ▼ 矢印の棒を伸ばす（右方向用） */
    arrowBody.style.width = 20 + Math.min(moveX, 120) + "px";

    e.preventDefault();
  }

  /* --- 終了 --- */
  function endDrag() {
    if (!dragging) return;
    dragging = false;

    arrowBody.style.width = "20px";

    const threshold = 100; // ▼ 右へ100px動いたら発火

    if (delta > threshold) {

      /* ▼ 背景動画ズームアウト */
      gsap.to(video, {
        scale: 1.25,
        opacity: 0,
        duration: 1.2,
        ease: "power1.out"
      });

      /* ▼ HERO を右へフェードアウト */
      gsap.to(hero, {
        x: window.innerWidth,
        opacity: 0,
        duration: 1.1,
        ease: "power2.inOut",
        onComplete: () => {
          hero.style.display = "none";

          /* ▼ 下層セクションを表示 */
          const sections = document.querySelectorAll('.normal-section');
          sections.forEach(sec => sec.classList.remove("hidden"));

          /* ▼ 下層フェードイン */
          gsap.fromTo(
            ".normal-section",
            { opacity: 0 },
            { opacity: 1, duration: 1.2, stagger: 0.2 }
          );

          enableScroll();
        }
      });

    } else {
      /* ▼ 右へ行かなかった場合は戻す */
      hero.style.transition = "transform .5s ease";
      hero.style.transform = "translateX(0)";
    }

    delta = 0;
  }


  /* --- イベント登録 --- */
  hero.addEventListener("mousedown", startDrag);
  hero.addEventListener("touchstart", startDrag, { passive:false });

  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("touchmove", moveDrag, { passive:false });

  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);

});
