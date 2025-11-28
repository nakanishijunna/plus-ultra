// editor.js ここがエディター構造の大本
import { html } from "https://esm.sh/@codemirror/lang-html";
import { css } from "https://esm.sh/@codemirror/lang-css";
import { oneDark } from "https://esm.sh/@codemirror/theme-one-dark";
import { EditorView, keymap } from "https://esm.sh/@codemirror/view";
import {lineNumbers, highlightActiveLine} from "https://esm.sh/@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "https://esm.sh/@codemirror/commands";
import { showHintBubble, showSuccessBubble } from "./ui/bubble.js";
import { initChallenge } from "./challenge.js";

// エディタ初期化
const htmlEditor = new EditorView({
  doc: ``,
  extensions: [keymap.of([...defaultKeymap, ...historyKeymap]),
  history(),lineNumbers(), highlightActiveLine(), html(), oneDark, EditorView.lineWrapping],
  parent: document.getElementById("editor-html")
});

const cssEditor = new EditorView({
  doc: ``,
  extensions: [keymap.of([...defaultKeymap, ...historyKeymap]),
  history(),lineNumbers(), highlightActiveLine(), css(), oneDark, EditorView.lineWrapping],
  parent: document.getElementById("editor-css")
});

// お題表示
let currentChallenge = initChallenge(htmlEditor, cssEditor);

// 実行ボタン
document.querySelector('.editor__run').addEventListener('click', () => {
  // コメントアウトされた見本コードを除去
  const htmlCode = htmlEditor.state.doc.toString().replace(/<!--[\s\S]*?-->/g, '');
  const cssCode = cssEditor.state.doc.toString().replace(/\/\*[\s\S]*?\*\//g, '');
  // 判定
  const htmlMatch = currentChallenge.check?.html?.test(htmlCode) ?? true;
  const cssMatch = currentChallenge.check?.css?.test(cssCode) ?? true;
  // プレビュー更新
  const preview = document.querySelector('.editor__preview');
  preview.innerHTML = `
    <iframe sandbox="allow-scripts" style="width:100%;height:100%;border:none;" srcdoc="
      <style>${cssCode}</style>
      ${htmlCode}
    "></iframe>
  `;
  console.log("HTML判定対象:", htmlCode);
console.log("CSS判定対象:", cssCode);
console.log("HTML正規表現:", currentChallenge.check?.html);
console.log("CSS正規表現:", currentChallenge.check?.css);

  if (htmlMatch && cssMatch) {
    showSuccessBubble("達成！");
  } else {
    showHintBubble("まだ達成していません。ヒントを見てみましょう！");
  }
});

document.querySelector('.editor__next').addEventListener('click', () => {
  currentChallenge = initChallenge(htmlEditor, cssEditor);
});
