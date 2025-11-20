// ==============================
//  キャラ別シナリオセット
// ==============================
const scenarioSets = [

  // ★ 1人目：リーズ
  {
    name: "リーズ",
    characterImg: "리즈_2.png",
    scenario: [
      { name: "リーズ", text: "……起きた？ 思ったより早かったわね。" },
      { name: "リーズ", text: "ここは、あなたが来るべき“境界”よ。" },
      {
        type: "choice",
        choices: [
          { text: "ここはどこなんだ？", next: 3 },
          { text: "あなたは誰？", next: 5 }
        ]
      },
      { name: "リーズ", text: "焦らなくていい。まだ全部は話せないの。" },
      { name: "リーズ", text: "でも覚えておいて。あなたはすでに選択を始めてる。" },
      { name: "リーズ", text: "私？ 名前は……そうね、今は秘密にしておくわ。" },
      { name: "リーズ", text: "最後まで見届けて。あなたの選択を。" }
    ]
  },

  // ★ 2人目：カイト
  {
    name: "カイト",
    characterImg: "카이토_2.png",
    scenario: [
      { name: "カイト", text: "やっと起きたな。かなり深く眠ってたぞ。" },
      { name: "カイト", text: "ここがどこか、今はまだ言えない。" },
      {
        type: "choice",
        choices: [
          { text: "説明しろ", next: 3 },
          { text: "状況を教えてくれ", next: 5 }
        ]
      },
      { name: "カイト", text: "落ち着け。順番に話すから。" },
      { name: "カイト", text: "ただし、戻れない選択肢もあるってことは覚悟しとけよ。" },
      { name: "カイト", text: "名前？ ……まあ、カイトって呼べばいい。" },
      { name: "カイト", text: "さあ、どうする？ お前の選択次第だ。" }
    ]
  },

  // ★ 3人目：シオン
  {
    name: "シオン",
    characterImg: "시온_2.png",
    scenario: [
      { name: "シオン", text: "……起きた？ よかった。心配してたの。" },
      { name: "シオン", text: "ここは、あなたが迷い込んだ“狭間”の世界だよ。" },
      {
        type: "choice",
        choices: [
          { text: "ここは何？", next: 3 },
          { text: "君は誰？", next: 5 }
        ]
      },
      { name: "シオン", text: "まだ言えないことが多いの、ごめんね。" },
      { name: "シオン", text: "でも信じて。あなたは間違ってないから。" },
      { name: "シオン", text: "私の名前は……今は秘密。でもすぐ分かるよ。" },
      { name: "シオン", text: "さあ、あなたの選択を聞かせて。" }
    ]
  }
];

// ==============================
//  ランダムに1キャラセット選択
// ==============================
const selectedSet = scenarioSets[Math.floor(Math.random() * scenarioSets.length)];
let scenario = selectedSet.scenario;

// ==============================
//  元の処理
// ==============================
let index = 0;
let charIndex = 0;
let speed = 40;

const nameBox = document.getElementById("name");
const textBox = document.getElementById("text");
const choicesBox = document.getElementById("choices");
const endButton = document.getElementById("end-button");
const overlay = document.getElementById("overlay");
const bg = document.getElementById("bg");
const character = document.getElementById("character");
const textbox = document.getElementById("textbox");

// ★キャラ画像差し替え
character.src = selectedSet.characterImg;

// タイピング処理
function typeWriter() {
  let sentence = scenario[index].text;
  if (charIndex < sentence.length) {
    textBox.innerHTML += sentence.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, speed);
  }
}

// 選択肢表示
function showChoice() {
  textBox.innerHTML = "";
  nameBox.innerHTML = "";
  choicesBox.innerHTML = "";
  choicesBox.style.display = "flex";

  setTimeout(() => choicesBox.classList.add("fade-in"), 50);

  scenario[index].choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = choice.text;
    btn.onclick = () => {
      choicesBox.style.opacity = 0;
      setTimeout(() => {
        choicesBox.style.display = "none";
        choicesBox.classList.remove("fade-in");
        index = choice.next;
        nameBox.innerHTML = scenario[index].name || "";
        textBox.innerHTML = "";
        charIndex = 0;
        typeWriter();
      }, 300);
    };
    choicesBox.appendChild(btn);
  });
}

function next() {
  if (choicesBox.style.display === "flex") return;

  if (charIndex < scenario[index].text.length) {
    charIndex = scenario[index].text.length;
    textBox.innerHTML = scenario[index].text;
  } else {
    index++;

    if (index >= scenario.length) {
      nameBox.innerHTML = "";
      textBox.innerHTML = "……君の選択が、未来を動かす。";

      setTimeout(() => {
        overlay.style.opacity = 1;
        overlay.style.pointerEvents = "auto";
        endButton.style.opacity = 1;
        endButton.style.pointerEvents = "auto";
      }, 500);

      return;
    }

    if (scenario[index].type === "choice") {
      showChoice();
      return;
    }

    nameBox.innerHTML = scenario[index].name;
    textBox.innerHTML = "";
    charIndex = 0;
    typeWriter();
  }
}

// ==============================
// ページロード時の演出
// ==============================
window.addEventListener("load", () => {
  setTimeout(() => bg.classList.add("fade-in"), 200);
  setTimeout(() => character.classList.add("fade-in"), 700);
  setTimeout(() => textbox.classList.add("fade-in"), 1200);

  nameBox.innerHTML = scenario[0].name;
  typeWriter();
});

document.getElementById("game").addEventListener("click", next);

// 最後のボタン
endButton.onclick = function() {
  window.location.href = "https://store.steampowered.com/app/3764400/LIMIT_ZERO_BREAKERS/?l=japanese";
};
