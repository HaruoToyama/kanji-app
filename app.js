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
  // ── 1年生 ──
  {
    question: "「山」は何と読む？",
    choices: ["かわ", "やま", "そら", "もり"],
    answer: "やま",
    grades: [1, 2],
  },
  {
    question: "「火」は何と読む？",
    choices: ["みず", "かぜ", "ひ", "つち"],
    answer: "ひ",
    grades: [1, 2],
  },
  {
    question: "「木」は何と読む？",
    choices: ["き", "いし", "はな", "くさ"],
    answer: "き",
    grades: [1, 2],
  },
  {
    question: "「日」は何と読む？",
    choices: ["つき", "ほし", "ひ", "そら"],
    answer: "ひ",
    grades: [1, 2],
  },
  {
    question: "「水」は何と読む？",
    choices: ["みず", "かぜ", "ひ", "つち"],
    answer: "みず",
    grades: [1, 2],
  },
  {
    question: "「月」は何と読む？",
    choices: ["ひ", "つき", "ほし", "くも"],
    answer: "つき",
    grades: [1, 2],
  },
  {
    question: "「花」は何と読む？",
    choices: ["はな", "くさ", "き", "みず"],
    answer: "はな",
    grades: [1, 2],
  },
  {
    question: "「犬」は何と読む？",
    choices: ["ねこ", "とり", "いぬ", "うお"],
    answer: "いぬ",
    grades: [1, 2],
  },
  {
    question: "「目」は何と読む？",
    choices: ["みみ", "め", "はな", "くち"],
    answer: "め",
    grades: [1, 2],
  },
  {
    question: "「手」は何と読む？",
    choices: ["あし", "て", "かお", "かた"],
    answer: "て",
    grades: [1, 2],
  },
  {
    question: "「土」は何と読む？",
    choices: ["みず", "ひ", "つち", "いし"],
    answer: "つち",
    grades: [1, 2],
  },
  {
    question: "「空」は何と読む？",
    choices: ["やま", "かわ", "そら", "うみ"],
    answer: "そら",
    grades: [1, 2],
  },
  // ── 2年生 ──
  {
    question: "「先生」の「先」の読みは？",
    choices: ["あと", "よこ", "さき", "した"],
    answer: "さき",
    grades: [2, 3],
  },
  {
    question: "「友達」の「友」の読みは？",
    choices: ["とも", "はは", "ちち", "こ"],
    answer: "とも",
    grades: [2, 3],
  },
  {
    question: "「学校」の「校」の読みは？",
    choices: ["こう", "きょう", "だい", "しゅう"],
    answer: "こう",
    grades: [2, 3, 4, 5, 6],
  },
  {
    question: "「毎日」の「毎」の読みは？",
    choices: ["まい", "にち", "ひ", "つき"],
    answer: "まい",
    grades: [2, 3],
  },
  {
    question: "「北」は何と読む？",
    choices: ["きた", "みなみ", "ひがし", "にし"],
    answer: "きた",
    grades: [2, 3],
  },
  {
    question: "「南」は何と読む？",
    choices: ["きた", "みなみ", "ひがし", "にし"],
    answer: "みなみ",
    grades: [2, 3],
  },
  {
    question: "「東」は何と読む？",
    choices: ["きた", "みなみ", "ひがし", "にし"],
    answer: "ひがし",
    grades: [2, 3],
  },
  {
    question: "「西」は何と読む？",
    choices: ["きた", "みなみ", "ひがし", "にし"],
    answer: "にし",
    grades: [2, 3],
  },
  {
    question: "「牛」は何と読む？",
    choices: ["うま", "うし", "ひつじ", "ぶた"],
    answer: "うし",
    grades: [2, 3],
  },
  {
    question: "「馬」は何と読む？",
    choices: ["うし", "とり", "うま", "さる"],
    answer: "うま",
    grades: [2, 3],
  },
  {
    question: "「海」は何と読む？",
    choices: ["かわ", "うみ", "やま", "そら"],
    answer: "うみ",
    grades: [2, 3],
  },
  {
    question: "「雨」は何と読む？",
    choices: ["ゆき", "かぜ", "あめ", "くも"],
    answer: "あめ",
    grades: [2, 3],
  },
  // ── 3年生 ──
  {
    question: "「日曜日」の「曜」の読みは？",
    choices: ["にち", "よう", "び", "まい"],
    answer: "よう",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「電気」の「電」の読みは？",
    choices: ["でん", "き", "かぜ", "ひかり"],
    answer: "でん",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「図書館」の「館」の読みは？",
    choices: ["かん", "しょ", "ず", "へや"],
    answer: "かん",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「運動」の「運」の読みは？",
    choices: ["うん", "どう", "はし", "あそ"],
    answer: "うん",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「練習」の「練」の読みは？",
    choices: ["れん", "しゅう", "なら", "まな"],
    answer: "れん",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「昨日」は何と読む？",
    choices: ["きのう", "きょう", "あした", "あさって"],
    answer: "きのう",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「朝食」の「朝」の読みは？",
    choices: ["あさ", "ひる", "ゆう", "よる"],
    answer: "あさ",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「発表」の「発」の読みは？",
    choices: ["はつ", "おこ", "だ", "はな"],
    answer: "はつ",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「計算」の「計」の読みは？",
    choices: ["けい", "さん", "よむ", "かぞ"],
    answer: "けい",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「植物」の「植」の読みは？",
    choices: ["しょく", "ぶつ", "うえ", "はな"],
    answer: "しょく",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「地球」の「球」の読みは？",
    choices: ["きゅう", "ち", "ほし", "まる"],
    answer: "きゅう",
    grades: [3, 4, 5, 6],
  },
  // ── 4年生 ──
  {
    question: "「都道府県」の「府」の読みは？",
    choices: ["ふ", "けん", "と", "どう"],
    answer: "ふ",
    grades: [4, 5, 6],
  },
  {
    question: "「関係」の「関」の読みは？",
    choices: ["かん", "けい", "つな", "むす"],
    answer: "かん",
    grades: [4, 5, 6],
  },
  {
    question: "「観察」の「観」の読みは？",
    choices: ["かん", "さつ", "みる", "しら"],
    answer: "かん",
    grades: [4, 5, 6],
  },
  {
    question: "「結果」の「結」の読みは？",
    choices: ["けつ", "か", "むす", "おわ"],
    answer: "けつ",
    grades: [4, 5, 6],
  },
  {
    question: "「協力」の「協」の読みは？",
    choices: ["きょう", "りょく", "てつ", "たす"],
    answer: "きょう",
    grades: [4, 5, 6],
  },
  {
    question: "「議会」の「議」の読みは？",
    choices: ["ぎ", "かい", "はなし", "あつ"],
    answer: "ぎ",
    grades: [4, 5, 6],
  },
  {
    question: "「産業」の「産」の読みは？",
    choices: ["さん", "ぎょう", "つく", "うむ"],
    answer: "さん",
    grades: [4, 5, 6],
  },
  {
    question: "「季節」の「季」の読みは？",
    choices: ["き", "せつ", "とき", "はる"],
    answer: "き",
    grades: [4, 5, 6],
  },
  {
    question: "「積極」の「積」の読みは？",
    choices: ["せき", "きょく", "つ", "あつ"],
    answer: "せき",
    grades: [4, 5, 6],
  },
  {
    question: "「博物館」の「博」の読みは？",
    choices: ["はく", "ぶつ", "かん", "ひろ"],
    answer: "はく",
    grades: [4, 5, 6],
  },
  // ── 5年生 ──
  {
    question: "「経済」の「経」の読みは？",
    choices: ["けい", "ざい", "はか", "かね"],
    answer: "けい",
    grades: [5, 6],
  },
  {
    question: "「環境」の「環」の読みは？",
    choices: ["かん", "きょう", "まわ", "ちか"],
    answer: "かん",
    grades: [5, 6],
  },
  {
    question: "「貿易」の「貿」の読みは？",
    choices: ["ぼう", "えき", "かわ", "うる"],
    answer: "ぼう",
    grades: [5, 6],
  },
  {
    question: "「確認」の「確」の読みは？",
    choices: ["かく", "にん", "たしか", "しら"],
    answer: "かく",
    grades: [5, 6],
  },
  {
    question: "「賛成」の「賛」の読みは？",
    choices: ["さん", "せい", "たす", "どう"],
    answer: "さん",
    grades: [5, 6],
  },
  {
    question: "「解決」の「解」の読みは？",
    choices: ["かい", "けつ", "とく", "わか"],
    answer: "かい",
    grades: [5, 6],
  },
  {
    question: "「複雑」の「複」の読みは？",
    choices: ["ふく", "ざつ", "おも", "かさ"],
    answer: "ふく",
    grades: [5, 6],
  },
  {
    question: "「政治」の「政」の読みは？",
    choices: ["せい", "じ", "おさ", "くに"],
    answer: "せい",
    grades: [5, 6],
  },
  {
    question: "「構造」の「構」の読みは？",
    choices: ["こう", "ぞう", "つく", "かた"],
    answer: "こう",
    grades: [5, 6],
  },
  {
    question: "「批判」の「批」の読みは？",
    choices: ["ひ", "はん", "いけん", "こうぎ"],
    answer: "ひ",
    grades: [5, 6],
  },
  // ── 6年生 ──
  {
    question: "「憲法」の「憲」の読みは？",
    choices: ["けん", "ぽう", "きまり", "こく"],
    answer: "けん",
    grades: [6],
  },
  {
    question: "「就職」の「就」の読みは？",
    choices: ["しゅう", "しょく", "はたら", "つく"],
    answer: "しゅう",
    grades: [6],
  },
  {
    question: "「縮小」の「縮」の読みは？",
    choices: ["しゅく", "しょう", "ちぢ", "へ"],
    answer: "しゅく",
    grades: [6],
  },
  {
    question: "「推薦」の「推」の読みは？",
    choices: ["すい", "せん", "おし", "すす"],
    answer: "すい",
    grades: [6],
  },
  {
    question: "「暖かい」の「暖」の読みは？",
    choices: ["あたた", "さむ", "つめ", "ぬく"],
    answer: "あたた",
    grades: [6],
  },
  {
    question: "「俳句」の「俳」の読みは？",
    choices: ["はい", "く", "しょう", "うた"],
    answer: "はい",
    grades: [6],
  },
  {
    question: "「模倣」の「模」の読みは？",
    choices: ["も", "ほう", "まね", "にせ"],
    answer: "も",
    grades: [6],
  },
  {
    question: "「裁判」の「裁」の読みは？",
    choices: ["さい", "はん", "たつ", "きめ"],
    answer: "さい",
    grades: [6],
  },
  {
    question: "「尊重」の「尊」の読みは？",
    choices: ["そん", "じゅう", "たっと", "うやま"],
    answer: "そん",
    grades: [6],
  },
  {
    question: "「討論」の「討」の読みは？",
    choices: ["とう", "ろん", "はな", "ぎろん"],
    answer: "とう",
    grades: [6],
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
  selectedGrade: null, // 選択中の学年
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

function getQuestionsByGrade(grade) {
  return QUESTIONS.filter((q) => Array.isArray(q.grades) && q.grades.includes(grade));
}

// ─────────────────────────────────────────────
// クイズ表示
// ─────────────────────────────────────────────

function showStartMessage(message) {
  const messageEl = document.getElementById("start-message");
  if (!message) {
    messageEl.textContent = "";
    messageEl.classList.add("hidden");
    return;
  }
  messageEl.textContent = message;
  messageEl.classList.remove("hidden");
}

function startQuiz() {
  const selectedGrade = Number(document.getElementById("grade-select").value);
  if (!selectedGrade) {
    showStartMessage("がくねんを えらんでから はじめよう！");
    return;
  }

  const filteredQuestions = getQuestionsByGrade(selectedGrade);
  if (filteredQuestions.length === 0) {
    showStartMessage("このがくねんの もんだいは じゅんびちゅうだよ。");
    return;
  }

  const MAX_QUESTIONS = 10;
  state.selectedGrade = selectedGrade;
  state.questions = shuffle(filteredQuestions).slice(0, MAX_QUESTIONS);
  state.current = 0;
  state.score = 0;
  showStartMessage("");
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
