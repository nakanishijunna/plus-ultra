const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function toggleMenu(forceState) {
  const willOpen = forceState !== undefined ? forceState : !navLinks.classList.contains("active");

  navLinks.classList.toggle("active", willOpen);
  hamburger.classList.toggle("active", willOpen);
  hamburger.setAttribute("aria-expanded", String(willOpen));
  document.body.classList.toggle("body--lock", willOpen);
}

hamburger.addEventListener("click", () => toggleMenu());

/* メニュー内リンクをクリックしたら閉じる */
navLinks.addEventListener("click", (e) => {
  if (e.target.closest("a")) toggleMenu(false);
});

/* ESCキーで閉じる */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});