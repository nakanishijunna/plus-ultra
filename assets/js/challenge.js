// challenge.js お題の引き出しの格納場所と判定式
const challenges = [
    {
    text: '見出しの文字を「こんにちは！」に変えてみよう',
    html: '<h1>こんにちは！</h1>',
    css: '',
    check: {
      html: /<h1>\s*こんにちは！\s*<\/h1>/i
    }
  },
  {
    text: '見出しの色を青に変えてみよう',
    html: '<h1>こんにちは！</h1>',
    css: 'h1 { color: blue; }',
    check: {
      html: /<h1>\s*こんにちは！\s*<\/h1>/i,
      css: /h1\s*{[^}]*color\s*:\s*blue[^}]*}/i
    }
  },
  {
    text: '段落の文字を太字にしてみよう',
    html: '<p>これは段落です。</p>',
    css: 'p { font-weight: bold; }',
    check: {
      html: /<p>\s*これは段落です。\s*<\/p>/i,
      css: /p\s*{[^}]*font-weight\s*:\s*bold[^}]*}/i
    }
  },
  {
    text: '背景色を薄い黄色にしてみよう',
    html: '<h1>こんにちは！</h1>',
    css: 'body { background-color: #fff9c4; }',
    check: {
      html: /<h1>\s*こんにちは！\s*<\/h1>/i,
      css: /body\s*{[^}]*background-color\s*:\s*#fff9c4[^}]*}/i
    }
  },
  {
    text: '見出しのサイズをもっと大きくしてみよう',
    html: '<h1>こんにちは！</h1>',
    css: 'h1 { font-size: 48px; }',
    check: {
      html: /<h1>\s*こんにちは！\s*<\/h1>/i,
      css: /h1\s*{[^}]*font-size\s*:\s*48px[^}]*}/i
    }
  },
  {
    text: '段落の文字を中央揃えにしてみよう',
    html: '<p>これは段落です。</p>',
    css: 'p { text-align: center; }',
    check: {
      html: /<p>\s*これは段落です。\s*<\/p>/i,
      css: /p\s*{[^}]*text-align\s*:\s*center[^}]*}/i
    }
  },
  {
    text: '見出しに下線をつけてみよう',
    html: '<h1>こんにちは！</h1>',
    css: 'h1 { text-decoration: underline; }',
    check: {
      html: /<h1>\s*こんにちは！\s*<\/h1>/i,
      css: /h1\s*{[^}]*text-decoration\s*:\s*underline[^}]*}/i
    }
  },
  {
    text: '段落の文字を斜体にしてみよう',
    html: '<p>これは段落です。</p>',
    css: 'p { font-style: italic; }',
    check: {
      html: /<p>\s*これは段落です。\s*<\/p>/i,
      css: /p\s*{[^}]*font-style\s*:\s*italic[^}]*}/i
    }
  },
  {
    text: '見出しの文字を英語にしてみよう（例: Hello!）',
    html: '<h1>Hello!</h1>',
    css: '',
    check: {
      html: /<h1>\s*Hello!\s*<\/h1>/i,
    }
  },
  {
    text: '段落の色をグレーにしてみよう',
    html: '<p>これは段落です。</p>',
    css: 'p { color: gray; }',
    check: {
      html: /<p>\s*これは段落です。\s*<\/p>/i,
      css: /p\s*{[^}]*color\s*:\s*gray[^}]*}/i
    }
  }

];

export function initChallenge(htmlEditor, cssEditor) {
  const challengeBox = document.querySelector('.editor__challenge');
  if (!challengeBox) return;

  const randomIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges[randomIndex];

  challengeBox.textContent = challenge.text;

  // コメントアウトして注入
  htmlEditor.dispatch({
    changes: { from: 0, 
              to: htmlEditor.state.doc.length, 
              insert: `<!-- ${challenge.html} -->`
 }
  });

  cssEditor.dispatch({
    changes: { from: 0, to: cssEditor.state.doc.length, insert: `/* ${challenge.css} */`
 }
  });
  return challenge;
}
