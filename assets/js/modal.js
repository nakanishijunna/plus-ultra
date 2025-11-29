/****************************************************
 *  追従ボタンの表示（SP時・スクロール後）
 ****************************************************/
const floatingLinks = document.getElementById("floatingLinks");

window.addEventListener("scroll", () => {
  const mvHeight = document.querySelector(".hero").offsetHeight;

  if (window.innerWidth <= 768) {
    floatingLinks.style.display =
      window.scrollY > mvHeight ? "flex" : "none";
  }
});

/****************************************************
 *  追従ボタン → モーダルを開く
 ****************************************************/
/****************************************************
 *  追従ボタン → モーダルを開く（SPのみ）
 ****************************************************/
document.querySelectorAll(".floating-item").forEach(item => {
  const target = item.dataset.target;

  item.querySelector(".floating-open").addEventListener("click", () => {

    // ▼ PC（768以上）ではモーダルを開かない
    if (window.innerWidth > 768) return;

    const modal = document.getElementById(target);
    modal.classList.add("show");

    // ▼ モーダル2（エディタ）の初期化（SPのみ）
    if (target === "modal2") {
      initEditor();
    }
  });
});

/****************************************************
 *  追従ボタンの個別閉じる（ボタン自体を非表示）
 ****************************************************/
document.querySelectorAll(".floating-close").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".floating-item").style.display = "none";
  });
});

/****************************************************
 *  モーダル1（YouTube）停止処理
 ****************************************************/
function stopYoutube(modal) {
  const iframe = modal.querySelector("iframe");
  if (iframe) {
    const src = iframe.src;
    iframe.src = "";   // 強制停止
    iframe.src = src;  // 次回再生のため復帰
  }
}

/****************************************************
 *  モーダル2（エディタ用）CodeMirror 初期化 / 破棄
 ****************************************************/
let cmHtml = null;
let cmCss = null;

function initEditor() {
  // すでに生成済みなら何もしない
  if (cmHtml || cmCss) return;

  cmHtml = CodeMirror(document.getElementById("editor-html"), {
    mode: "htmlmixed",
    lineNumbers: true
  });

  cmCss = CodeMirror(document.getElementById("editor-css"), {
    mode: "css",
    lineNumbers: true
  });

  // レイアウト安定後に refresh
  setTimeout(() => {
    cmHtml.refresh();
    cmCss.refresh();
  }, 50);
}

function destroyEditor() {
  if (cmHtml) {
    cmHtml.toTextArea?.();
    cmHtml = null;
  }
  if (cmCss) {
    cmCss.toTextArea?.();
    cmCss = null;
  }
}

/****************************************************
 *  モーダル閉じる（×ボタン）
 ****************************************************/
document.querySelectorAll(".modal-close").forEach(closeBtn => {
  closeBtn.addEventListener("click", e => {
    const modal = e.target.closest(".modal");
    modal.classList.remove("show");

    // モーダル1：YouTubeを停止
    stopYoutube(modal);

    // モーダル2：エディタを破棄
    if (modal.id === "modal2") {
      destroyEditor();
    }
  });
});

/****************************************************
 *  モーダル外クリックで閉じる
 ****************************************************/
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("show");

      // モーダル1：YouTube停止
      stopYoutube(modal);

      // モーダル2：エディタ破棄
      if (modal.id === "modal2") {
        destroyEditor();
      }
    }
  });
});

/****************************************************
 *  SP/PC で editor の DOM を移動
 ****************************************************/
const editorSection = document.getElementById("editor-section");
const modalEditorContainer = document.getElementById("modal-editor-container");
const originalEditorParent = editorSection.parentElement;

function moveEditorToModal() {
  if (!modalEditorContainer.contains(editorSection)) {
    modalEditorContainer.appendChild(editorSection);
  }
}

function moveEditorToOriginal() {
  if (!originalEditorParent.contains(editorSection)) {
    originalEditorParent.appendChild(editorSection);
  }
}

function checkResponsive() {
  if (window.innerWidth <= 768) {
    // SP → editor は常にモーダル内
    moveEditorToModal();
  } else {
    // PC → editor は通常位置
    moveEditorToOriginal();
  }
}

window.addEventListener("DOMContentLoaded", checkResponsive);
window.addEventListener("resize", checkResponsive);
