// 表示したいテキストを配列で管理
const scenario = [
  { name: "？？？", text: "……やっと起きた？" },
  { name: "？？？", text: "ここは、あなたが来るはずの場所だったの。" },

  // ★ここで選択肢
  {
    type: "choice",
    choices: [
      { text: "ここはどこ？", next: 3 },
      { text: "あなたは誰？", next: 5 }
    ]
  },

  // ルートA
  { name: "？？？", text: "ここは境目の世界。まだ説明はできないの。" },
  { name: "？？？", text: "でも、あなたは戻るべき。そう思う。" },

  // ルートB
  { name: "？？？", text: "……私？ そうね、名前はまだ言えない。" },
  { name: "？？？", text: "でも覚えていて。あなたが選んだことを。" }
];

let index = 0;
let charIndex = 0;
let speed = 40;

const nameBox = document.getElementById("name");
const textBox = document.getElementById("text");
const choicesBox = document.getElementById("choices");
const endButton = document.getElementById("end-button"); // ← 購入ボタン要素を追加予定

function typeWriter() {
  let sentence = scenario[index].text;
  if (charIndex < sentence.length) {
    textBox.innerHTML += sentence.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, speed);
  }
}

function showChoice() {
  textBox.innerHTML = "";
  nameBox.innerHTML = "";
  choicesBox.innerHTML = "";
  choicesBox.style.display = "flex";

  scenario[index].choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = choice.text;
    btn.onclick = () => {
      choicesBox.style.display = "none";
      index = choice.next;
      nameBox.innerHTML = scenario[index].name || "";
      textBox.innerHTML = "";
      charIndex = 0;
      typeWriter();
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

    // ★終了演出
    if (index >= scenario.length) {
      nameBox.innerHTML = "";
      textBox.innerHTML = "……君の選択が、未来を動かす。";

      // ボタンを2秒後に表示
      setTimeout(() => {
        endButton.style.opacity = "1";
        endButton.style.pointerEvents = "auto";
      }, 2000);

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

nameBox.innerHTML = scenario[0].name;
typeWriter();
document.getElementById("game").addEventListener("click", next);
