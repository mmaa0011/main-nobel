const scenario = [
  { name: "？？？", text: "……やっと起きた？" },
  { name: "？？？", text: "ここは、あなたが来るはずの場所だったの。" },

  {
    type: "choice",
    choices: [
      { text: "ここはどこ？", next: 3 },
      { text: "あなたは誰？", next: 5 }
    ]
  },

  { name: "？？？", text: "ここは境目の世界。まだ説明はできないの。" },
  { name: "？？？", text: "でも、あなたは戻るべき。そう思う。" },

  { name: "？？？", text: "……私？ そうね、名前はまだ言えない。" },
  { name: "？？？", text: "でも覚えていて。あなたが選んだことを。" }
];

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

      // ★オーバーレイ＆ボタン表示
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

// ページロード時フェードイン
window.addEventListener("load", () => {
  setTimeout(() => bg.classList.add("fade-in"), 200);
  setTimeout(() => character.classList.add("fade-in"), 700);
  setTimeout(() => textbox.classList.add("fade-in"), 1200);

  nameBox.innerHTML = scenario[0].name;
  typeWriter();
});

document.getElementById("game").addEventListener("click", next);

endButton.onclick = function() {
  window.location.href = "https://store.steampowered.com/app/3764400/LIMIT_ZERO_BREAKERS/?l=japanese";
};
