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
  // 1・2年生向け
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
    question: "「水」は何と読む？",
    choices: ["ひ", "かぜ", "みず", "そら"],
    answer: "みず",
    grades: [1, 2],
  },
  {
    question: "「月」は何と読む？",
    choices: ["ほし", "つき", "ひ", "かぜ"],
    answer: "つき",
    grades: [1, 2],
  },
  {
    question: "「川」は何と読む？",
    choices: ["やま", "うみ", "かわ", "いけ"],
    answer: "かわ",
    grades: [1, 2],
  },
  {
    question: "「日」は何と読む？",
    choices: ["つき", "ひ", "ほし", "はな"],
    answer: "ひ",
    grades: [1, 2],
  },
  {
    question: "「犬」は何と読む？",
    choices: ["ねこ", "とり", "いぬ", "うま"],
    answer: "いぬ",
    grades: [1, 2],
  },
  {
    question: "「花」は何と読む？",
    choices: ["くさ", "き", "はな", "は"],
    answer: "はな",
    grades: [1, 2],
  },
  {
    question: "「雨」は何と読む？",
    choices: ["かぜ", "ゆき", "あめ", "くも"],
    answer: "あめ",
    grades: [1, 2],
  },
  // 2・3年生向け
  {
    question: "「先生」の「先」の読みは？",
    choices: ["あと", "よこ", "さき", "した"],
    answer: "さき",
    grades: [1, 2, 3],
  },
  {
    question: "「友達」の「友」の読みは？",
    choices: ["とも", "はは", "ちち", "こ"],
    answer: "とも",
    grades: [1, 2, 3],
  },
  {
    question: "「空」は何と読む？",
    choices: ["うみ", "そら", "やま", "かわ"],
    answer: "そら",
    grades: [1, 2, 3],
  },
  {
    question: "「気持ち」の「気」の読みは？",
    choices: ["き", "けい", "ちから", "こころ"],
    answer: "き",
    grades: [1, 2, 3],
  },
  {
    question: "「時間」の「間」の読みは？",
    choices: ["かん", "まえ", "うち", "そと"],
    answer: "かん",
    grades: [2, 3],
  },
  {
    question: "「兄弟」の「兄」の読みは？",
    choices: ["あに", "おとうと", "いもうと", "ちち"],
    answer: "あに",
    grades: [2, 3],
  },
  {
    question: "「家族」の「族」の読みは？",
    choices: ["ぞく", "かぞく", "か", "そく"],
    answer: "ぞく",
    grades: [3, 4],
  },
  {
    question: "「学校」の「校」の読みは？",
    choices: ["こう", "きょう", "だい", "しゅう"],
    answer: "こう",
    grades: [2, 3, 4, 5, 6],
  },
  {
    question: "「日曜日」の「曜」の読みは？",
    choices: ["にち", "よう", "び", "まい"],
    answer: "よう",
    grades: [2, 3, 4, 5, 6],
  },
  {
    question: "「電気」の「電」の読みは？",
    choices: ["でん", "き", "かぜ", "ひかり"],
    answer: "でん",
    grades: [2, 3, 4, 5, 6],
  },
  // 3〜6年生向け
  {
    question: "「都市」の「都」の読みは？",
    choices: ["と", "まち", "し", "けん"],
    answer: "と",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「地図」の「図」の読みは？",
    choices: ["ず", "え", "か", "がら"],
    answer: "ず",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「音楽」の「楽」の読みは？",
    choices: ["らく", "がく", "おと", "ね"],
    answer: "がく",
    grades: [2, 3, 4, 5, 6],
  },
  {
    question: "「使う」の「使」の読みは？",
    choices: ["つか", "もち", "おく", "はこ"],
    answer: "つか",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「植物」の「植」の読みは？",
    choices: ["うえ", "しょく", "は", "み"],
    answer: "しょく",
    grades: [3, 4, 5, 6],
  },
  {
    question: "「世界」の「界」の読みは？",
    choices: ["さかい", "かい", "せか", "せ"],
    answer: "かい",
    grades: [3, 4, 5, 6],
  },
  // 4〜6年生向け
  {
    question: "「勉強」の「勉」の読みは？",
    choices: ["べん", "きょう", "まな", "ちから"],
    answer: "べん",
    grades: [4, 5, 6],
  },
  {
    question: "「科学」の「科」の読みは？",
    choices: ["か", "かがく", "がく", "き"],
    answer: "か",
    grades: [4, 5, 6],
  },
  {
    question: "「説明」の「説」の読みは？",
    choices: ["せつ", "めい", "はなし", "こと"],
    answer: "せつ",
    grades: [4, 5, 6],
  },
  {
    question: "「試験」の「験」の読みは？",
    choices: ["けん", "ため", "し", "ひ"],
    answer: "けん",
    grades: [4, 5, 6],
  },
  {
    question: "「観察」の「察」の読みは？",
    choices: ["さつ", "かん", "み", "さ"],
    answer: "さつ",
    grades: [4, 5, 6],
  },
  // 5・6年生向け
  {
    question: "「経験」の「経」の読みは？",
    choices: ["けい", "へ", "ふ", "とお"],
    answer: "けい",
    grades: [5, 6],
  },
  {
    question: "「環境」の「境」の読みは？",
    choices: ["きょう", "さかい", "ところ", "けい"],
    answer: "きょう",
    grades: [5, 6],
  },
  {
    question: "「責任」の「責」の読みは？",
    choices: ["せき", "にん", "せ", "め"],
    answer: "せき",
    grades: [5, 6],
  },
  {
    question: "「複雑」の「複」の読みは？",
    choices: ["ふく", "ざつ", "はば", "かえ"],
    answer: "ふく",
    grades: [5, 6],
  },
  {
    question: "「評価」の「評」の読みは？",
    choices: ["ひょう", "か", "あたい", "ほめ"],
    answer: "ひょう",
    grades: [5, 6],
  },
  {
    question: "「独立」の「独」の読みは？",
    choices: ["どく", "ひとり", "りつ", "たつ"],
    answer: "どく",
    grades: [5, 6],
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

  state.selectedGrade = selectedGrade;
  state.questions = shuffle(filteredQuestions).slice(0, 10);
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
