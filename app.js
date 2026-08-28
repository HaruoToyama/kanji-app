/**
 * かんじクイズ アプリ
 *
 * 構成：
 *   - QUESTIONS   : 問題データ（増やしやすい）
 *   - State       : クイズの状態管理
 *   - Functions   : 画面制御・ロジック
 *   - Init        : 起動
 */

// ─────────────────────────────────────────────
// 問題データ
// 増やす場合はこの配列に追加するだけでOK
// ─────────────────────────────────────────────
const QUESTIONS = [
  {
    question: "「山」は何と読む？",
    choices: ["かわ", "やま", "そら", "もり"],
    answer: "やま",
  },
  {
    question: "「火」は何と読む？",
    choices: ["みず", "かぜ", "ひ", "つち"],
    answer: "ひ",
  },
  {
    question: "「木」は何と読む？",
    choices: ["き", "いし", "はな", "くさ"],
    answer: "き",
  },
  {
    question: "「学校」の「校」の読みは？",
    choices: ["こう", "きょう", "だい", "しゅう"],
    answer: "こう",
  },
  {
    question: "「先生」の「先」の読みは？",
    choices: ["あと", "よこ", "さき", "した"],
    answer: "さき",
  },
  {
    question: "「日曜日」の「曜」の読みは？",
    choices: ["にち", "よう", "び", "まい"],
    answer: "よう",
  },
  {
    question: "「電気」の「電」の読みは？",
    choices: ["でん", "き", "かぜ", "ひかり"],
    answer: "でん",
  },
  {
    question: "「友達」の「友」の読みは？",
    choices: ["とも", "はは", "ちち", "こ"],
    answer: "とも",
  },
];

// ─────────────────────────────────────────────
// 状態
// ─────────────────────────────────────────────
const state = {
  questions: [],   // シャッフル後の問題リスト
  current: 0,      // 現在の問題インデックス
  score: 0,        // 正解数
  answered: false, // 現在の問題に回答済みか
};

// ─────────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────────

/** 配列をシャッフル（Fisher-Yates） */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────
// 画面切り替え
// ─────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ─────────────────────────────────────────────
// クイズ表示
// ─────────────────────────────────────────────

function startQuiz() {
  state.questions = shuffle(QUESTIONS);
  state.current = 0;
  state.score = 0;
  showScreen("screen-quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.current];
  const total = state.questions.length;
  state.answered = false;

  // 進捗バー
  document.getElementById("progress-bar").style.width =
    `${(state.current / total) * 100}%`;

  // カウント・得点
  document.getElementById("question-count").textContent =
    `もんだい ${state.current + 1} / ${total}`;
  document.getElementById("score-display").textContent =
    `⭐ ${state.score}てん`;

  // 問題文
  document.getElementById("question-text").textContent = q.question;

  // 選択肢（シャッフルして表示）
  const choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";
  shuffle(q.choices).forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => onChoiceClick(btn, choice, q.answer));
    choicesEl.appendChild(btn);
  });

  // フィードバック・次へボタンを隠す
  const feedback = document.getElementById("feedback");
  feedback.className = "hidden";
  feedback.textContent = "";
  document.getElementById("btn-next").classList.add("hidden");
}

function onChoiceClick(clickedBtn, chosen, answer) {
  if (state.answered) return;
  state.answered = true;

  const correct = chosen === answer;
  if (correct) state.score += 1;

  // 選択肢ボタンにスタイルを付ける
  const allBtns = document.querySelectorAll(".choice-btn");
  allBtns.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === answer) btn.classList.add("correct");
  });
  if (!correct) clickedBtn.classList.add("incorrect");

  // フィードバックメッセージ
  const feedback = document.getElementById("feedback");
  feedback.classList.remove("hidden");
  if (correct) {
    feedback.className = "correct";
    feedback.textContent = "⭕ せいかい！すごい！";
  } else {
    feedback.className = "incorrect";
    feedback.textContent = `❌ ざんねん… こたえは「${answer}」だよ`;
  }

  // 得点を即時更新
  document.getElementById("score-display").textContent =
    `⭐ ${state.score}てん`;

  // 次へボタン表示
  document.getElementById("btn-next").classList.remove("hidden");
}

function nextQuestion() {
  state.current += 1;
  if (state.current < state.questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// ─────────────────────────────────────────────
// 結果画面
// ─────────────────────────────────────────────

function showResult() {
  // 進捗バーを100%に
  document.getElementById("progress-bar").style.width = "100%";

  showScreen("screen-result");

  const total = state.questions.length;
  const score = state.score;

  // メッセージをスコアに応じて変える
  let message;
  if (score === total) {
    message = "🎊 ぜんもんせいかい！さいこう！";
  } else if (score >= Math.ceil(total * 0.7)) {
    message = "😊 よくできました！";
  } else {
    message = "😄 またちょうせんしてみよう！";
  }

  document.getElementById("result-message").textContent = message;
  document.getElementById("result-score").textContent =
    `${total}もんちゅう ${score}もんせいかい`;
}

// ─────────────────────────────────────────────
// イベントリスナー
// ─────────────────────────────────────────────

document.getElementById("btn-start").addEventListener("click", startQuiz);
document.getElementById("btn-next").addEventListener("click", nextQuestion);
document.getElementById("btn-retry").addEventListener("click", startQuiz);
