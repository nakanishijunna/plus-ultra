// 達成できたときに表示する
export function showSuccessBubble(text) {
  const bubble = document.createElement('div');
  bubble.className = 'editor__bubble';
  bubble.textContent = text;
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2000);
}

// 達成できていないときに表示
export function showHintBubble(text) {
  const bubble = document.createElement('div');
  bubble.className = 'editor__bubble';
  bubble.style.background = '#ff9800';
  bubble.textContent = text;
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 3000);
}