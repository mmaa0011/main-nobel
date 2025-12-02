// ==============================
//   タッチ案内（1秒だけ表示）
// ==============================
window.addEventListener("DOMContentLoaded", () => {
  const touchHint = document.createElement("div");
  touchHint.id = "touch-hint";
  touchHint.textContent = "▶ タップして進む";
  document.body.appendChild(touchHint);

  // 1秒後にフェードアウト → DOMから削除
  setTimeout(() => {
    touchHint.style.opacity = "0";
    setTimeout(() => {
      touchHint.remove();
    }, 800); // フェードアウトに合わせる
  }, 1000); // ← ここを1秒(1000ms)に変更
});

// ==============================
//  キャラ別シナリオセット
// ==============================
const scenarioSets = [
  {
    name: "リズ",
    characterImg: "リズサイズ.png",
    scenario: [
      { name: "XX", text: "あー！　やっと起きたのだ！" },//0

      {
        type: "choice",//1
        choices: [
          { text: "どこだここ？", next: 2 },//『1』
          { text: "誰だ？", next: 17 },//『2』
          { text: "……(警戒)",next: 34},//『3』
        ]
      },
      { name: "XX", text: "ここは世界の境目なのだ！まだ詳しい説明はできないのだ！！" },//2『1』
      { name: "XX", text: "でも、これだけは言えるのだ。" },//3『1』
      { name: "XX", text: "お主は救われるべき人間なのだ！" },//4『1』

      {
        type: "choice",//5
        choices: [
          { text: "お前、名前は？", next: 6 },//『1-1』
          { text: "そこには何がある？", next: 13 },//『1-2』
        ]
      },

      { name: "XX", text: "わしの名前？" },//6『1-1』
      { name: "XX", text: "わしの名前は……" },//7『1-1』
      { name: "XX", text: "ハッ、言っちゃダメだって言われておるのだ！" },//8『1-1』
      { name: "〇〇", text: "「あー、XX見つけた!　もういくよ〜！」" },//9『1-1』
      { name: "XX", text: "わわわっ、もう時間になってしまったのだ！" },//10『1-1』
      { name: "XX", text: "わしはもういくのだ！！" },//11『1-1』
      { name: "XX", text: "また会えるのを楽しみにしてるのだ！" },//12『1-1』

      { name: "XX", text: "この先に何があるかは自分の目で確かめるべきなのだ！" },//13『1-2』
      { name: "〇〇", text: "「おーい、時間だぞー！！」" },//14『1-2』
      { name: "XX", text: "わわわっ、もう時間になってしまったのだ！" },//15『1-2』
      { name: "XX", text: "また会えるのを楽しみにしてるのだ！" },//16『1-2』

      { name: "XX", text: "わしたちはお前とは別の世界に存在する者なのだ。" },//17『2』
      { name: "XX", text: "わしたちのことはこちらの世界へ来てみればきっとわかるのだ。" },//18『2』

      {
        type: "choice",//19『2-1/2-2』
        choices: [
          { text: "お前、名前は？", next: 6 },//『2-1』
          { text: "ここはどこなんだ？", next: 27 },//『2-2』
        ]
      },

      { name: "XX", text: "わしの名前？" },//20『2-1』
      { name: "XX", text: "んー、言っちゃダメだって言われてるのだ……。" },//21『2-1』
      { name: "XX", text: "でも、これだけは言えるのだ！" },//22『2-1』
      { name: "XX", text: "お前は救われるべき人間なのだ！" },//23『2-1』
      { name: "〇〇", text: "「おーい、行くよー！」" },//24『2-1』
      { name: "XX", text: "もう時間なのだ！" },//25『2-1』
      { name: "XX", text: "またおぬしと会えること、楽しみにしてるのだ！" },//26『2-1』

      { name: "XX", text: "ここは世界の境目なのだ！まだ詳しい説明はしちゃいけないらしいのだ……。" },//27『2-2』
      { name: "XX", text: "でも、これだけは言えるのだ！" },//28『2-2』
      { name: "XX", text: "お前は救われるべき人間なのだ！" },//29『2-2』
      { name: "〇〇", text: "「XX!　どこにいったのー！」" },//30『2-2』
      { name: "XX", text: "もう時間が切っちゃったみたいなのだ" },//31『2-2』
      { name: "XX", text: "わしはもう行かなきゃなのだ……" },//32『2-2』
      { name: "XX", text: "また会えるのを楽しみにしてるのだ！" },//33『2-2』

      { name: "XX", text: "あれ、警戒されてるのだ？" },//34『3』
      { name: "XX", text: "わしたちは、敵じゃないのだ！" },//35『3』
      { name: "XX", text: "わしの口から正体を明かす、みたいなことはできないけど…… まぁ、こっちの世界に聞いてみればわかることなのだ！" },//36『3』

      {
        type: "choice",//37『3-1/3-2』
        choices: [
          { text: "その世界には何がある？", next: 38},//『3-1』
          { text: "ここはどこなんだ？", next: 43 },//『3-2』
        ]
      },

      { name: "XX", text: "わしたちの世界に何があるのか？" },//38『3-1』
      { name: "XX", text: "それは来てみればわかると思うのだ！" },//39『3-1』
      { name: "〇〇", text: "「あー、XX見つけた！　もういくよ〜！」" },//40『3-1』
      { name: "XX", text: "あれ、もう時間なのだ。" },//41『3-1』
      { name: "XX", text: "またおぬしと会えること、楽しみにしてるのだ！" },//42『3-1』

      { name: "XX", text: "ここは世界の境目なのだ！わしにも詳しい説明はできないのだ……。" },//43『3-2』
      { name: "XX", text: "でも、これだけは言える！" },//44『3-2』
      { name: "XX", text: "お前は救われるべき人間なのだ！" },//45『3-2』
      { name: "〇〇", text: "「XX!　そろそろ行かないとだぞ！」" },//46『3-2』
      { name: "XX", text: "あ、もう時間が来ちまったみたいなのだ" },//47『3-2』
      { name: "XX", text: "またおぬしと会えること、楽しみにしてるのだ！" },//48『3-2』
    ]
  },

   // ★ 3人目：シオンーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
   {
    name: "シオン",
    characterImg: "シオンサイズ.png",
    scenario: [
      { name: "シオン", text: "……やっと起きた？" },//0

      {
        type: "choice",//1,2,3
        choices: [
          { text: "ここは何？", next: 2 },//1
          { text: "あなたは誰？", next: 13 },//2
          { text:"……(警戒)",next: 29}//3
        ]
      },
      { name: "XX", text: "ここは世界の境目。まだ詳しい説明はできないの。" },//2
      { name: "XX", text: "でも、これだけは言える。" },//3
      { name: "XX",text:"貴方は救われるべき人間なの。"},//4
      {
        type: "choice",       // 5『1-1/1-2』
        choices: [
          { text: "貴方の名前は？", next: 6 },//1-1
          { text: "そこに何があるの？", next: 10 }//1-2
        ]
      },
      { name:"XX",text:"私の名前？"},//6『1-1-1』
      { name: "XX", text: "……そうね、ちらの世界に来てみればきっとわかるわ。" },//7『1-1」
      { name: "〇〇", text: "「おーい、そろそろ行くぞ！」" },//8『1-1』
      { name: "XX",text:"あら、もう時間みたい。もういくわね"},//9『1-1』
      
      { name: "XX",text:"この先に何があるかはあなたの目で確かめるべきだと思うわ。"},//10『1-2』
      { name: "〇〇",text:"「おーい、そろそろ行かなきゃだよー！」"},//11『1-2』
      { name: "XX",text:"また会えることを楽しみにしているわ"},//12『1-2』

      { name:"XX",text:"私は貴方とは別の世界に存在する者。"},//13『2』
      { name: "XX",text:"私たちのことはこちらの世界へ来てみればきっとわかるわ。"},//14『2』
      
      {
        type:"choice",//15『2-1/2-2』
        choices: [
          { text: "貴方の名前は？", next: 16},//2-1
          { text: "ここはどこ？", next: 23},//2-2
        ]
      },

      { name: "XX",text:"私の名前？"},//16『2-1』
      { name:"XX",text: "それはまだ言えないの。"},//17『2-1』
      { name:"XX",text: "でも、これだけはわかるわ。"},//18『2-1』
      { name:"XX",text: "貴方は救われるべき人間なの。"},//19『2-1』
      { name:"〇〇",text: "「おーい、そろそろ行くぞ！」"},//20『2-1』
      { name:"XX",text: "あら、もう時間みたい"},//21『2-1』
      { name:"XX",text: "また貴方に巡り会えることを期待しているわ。"},//22『2-1』

      { name:"XX",text: "ここは世界の境目。詳しい説明は、私にはできないの。"},//23『2-2』
      { name:"XX",text: "でも、これだけはわかるわ。"},//24『2-2』
      { name:"XX",text: "貴方は救われるべき人間なの。"},//25『2-2』
      { name:"〇〇",text: "「おーい、そろそろ行くぞ！」"},//26『2-2』
      { name:"XX",text: "あら、もう時間みたい"},//27『2-2』
      { name:"XX",text: "また貴方に巡り会えることを期待しているわ。"},//28『2-2』

      { name:"XX",text: "そう警戒しないで。私は貴方の敵ではないもの"},//29『3』
      { name:"XX",text: "私の口から正体は明かせないけど……、"},//30『3』
      { name:"XX",text: "そうね、こちらの世界に来てみればわかることよ。"},//31『3』

      {
        type:"choice",//32『3-1/3-2』
        choices: [
          { text: "その世界には何があるの？", next: 33},//3-1
          { text: "ここはどこ？", next: 38},//3-2
        ]
      },

      { name:"XX",text: "私たちの世界に何があるのか？"},//33『3-1』
      { name:"XX",text: "それは踏み入ってみればわかることよ。"},//34『3-1』
      { name:"〇〇",text: "「あー、××見つけた！　もういくのだ〜！」"},//35『3-1』
      { name:"XX",text: "あら、もう時間なのね。"},//36『3-1』
      { name:"XX",text: "また貴方に巡り会えることを期待しているわ。"},//37『3-1』

      { name:"XX",text: "ここは世界の境目。詳しい説明は、私にはできないのよね。"},//38『3-2』
      { name:"XX",text: "でもこれだけはわかるの。"},//39『3-2』
      { name:"XX",text: "あなたは絶対に救われるべき人間よ。"},//40『3-2』
      { name:"〇〇",text: "「XX!　そろそろ行かないとなのだ！」"},//41『3-2』
      { name:"XX",text: "あら、時間が来てしまったのね。"},//42『3-2』
      { name:"XX",text: "また貴方に巡り会えることを期待しているわ。"},//43『3-2』
    ]
  },

  {
    name: "カイト",
    characterImg: "kaitoサイズ.png",
    scenario: [
      { name: "XX", text: "おー！　やっと起きた？" },//0

      {
        type: "choice",//1
        choices: [
          { text: "どこだここ？", next: 2 },//『1』
          { text: "誰だ？", next: 17 },//『2』
          { text: "……(警戒)",next: 34},//『3』
        ]
      },
      { name: "XX", text: "ここは世界の境目だ！まだ詳しい説明はしちゃいけないらしいけど……。" },//2『1』
      { name: "XX", text: "でも、これだけは言える。" },//3『1』
      { name: "XX", text: "お前は救われるべき人間だ！" },//4『3』

      {
        type: "choice",//5
        choices: [
          { text: "お前、名前は？", next: 6 },//『1-1』
          { text: "そこには何がある？", next: 12 },//『1-2』
        ]
      },

      { name: "XX", text: "俺の名前？" },//6『1-1』
      { name: "XX", text: "俺の名前は……" },//7『1-1』
      { name: "〇〇", text: "「おーい、そろそろ行くよ！」" },//8『1-1』
      { name: "XX", text: "あれ、もうそんな時間！？" },//9『1-1』
      { name: "XX", text: "ごめん、俺はもう行かなきゃ、" },//10『1-1』
      { name: "XX", text: "また会えるのを楽しみにしてるからな！" },//11『1-1』

      { name: "XX", text: "この先に何があるかはお前の目で確かめるべきだ！" },//12『1-2』
      { name: "XX", text: "じゃなきゃ面白みもないだろ？" },//13『1-2』
      { name: "〇〇", text: "「おーい、時間なのだー！」" },//14『1-2』
      { name: "XX", text: "「おっと、もう時間になっちまったみたいだな！" },//15『1-2』
      { name: "XX", text: "じゃあ、またお前と会えるのを楽しみにしてるからな！" },//16『1-2』

      { name: "XX", text: "俺はお前とは別の世界に存在する者。" },//17『2』
      { name: "XX", text: "俺たちのことはこちらの世界へ来てみればきっとわかる。" },//18『2』

      {
        type: "choice",//19『2-1/2-2』
        choices: [
          { text: "お前、名前は？", next: 6 },//『2-1』
          { text: "ここはどこなんだ？", next: 27 },//『2-2』
        ]
      },

      { name: "XX", text: "俺の名前？" },//20『2-1』
      { name: "XX", text: "んー、言っちゃダメだって言われてんだよね……。" },//21『2-1』
      { name: "XX", text: "でも、これだけは言える！" },//22『2-1』
      { name: "XX", text: "お前は救われるべき人間だよ！" },//23『2-1』
      { name: "〇〇", text: "「おーい、行くよー！」" },//24『2-1』
      { name: "XX", text: "「もうそんな時間か" },//25『2-1』
      { name: "XX", text: "またお前と会えること、楽しみにしてるからな！" },//26『2-1』

      { name: "XX", text: "ここは世界の境目だ！まだ詳しい説明はしちゃいけないらしいけど……。" },//27『2-2』
      { name: "XX", text: "でも、これだけは言える！" },//28『2-2』
      { name: "XX", text: "お前は救われるべき人間なんだよ！" },//29『2-2』
      { name: "〇〇", text: "「XX!　どこにいったのー！」" },//30『2-2』
      { name: "XX", text: "あれ、もう時間が切っちゃったみたいだな" },//31『2-2』
      { name: "XX", text: "俺はもう行かなきゃだけど……" },//32『2-2』
      { name: "XX", text: "また会えるのを楽しみにしてるからな！" },//33『2-2』

      { name: "XX", text: "あれ、警戒されてる？" },//34『3』
      { name: "XX", text: "俺たちは、敵じゃないぞ！" },//35『3』
      { name: "XX", text: "俺の口から正体を明かす、みたいなことはできないけど…… まぁ、こっちの世界に聞いてみればわかることだ！" },//36『3』

      {
        type: "choice",//37『2-1/2-2』
        choices: [
          { text: "その世界には何がある？", next: 38},//『3-1』
          { text: "ここはどこなんだ？", next: 43 },//『3-2』
        ]
      },

      { name: "XX", text: "俺たちの世界に何があるのか？" },//38『3-1』
      { name: "XX", text: "それは来てみればわかると思うぞ！" },//39『3-1』
      { name: "〇〇", text: "「あー、XX見つけた！　もういくよ〜！」" },//40『3-1』
      { name: "XX", text: "あれ、もう時間なのか。" },//41『3-1』
      { name: "XX", text: "またお前と会えること、楽しみにしてるからな！" },//42『3-1』

      { name: "XX", text: "ここは世界の境目だ！俺にも詳しい説明はできないんだけど……。" },//43『3-2』
      { name: "XX", text: "でも、これだけは言える！" },//44『3-2』
      { name: "XX", text: "お前は救われるべき人間なんだよ！" },//45『3-2』
      { name: "〇〇", text: "「XX!　そろそろ行かないとなのだ！」" },//46『3-2』
      { name: "XX", text: "あ、もう時間が来ちまったみたいだな" },//47『3-2』
      { name: "XX", text: "またお前と会えること、楽しみにしてるからな！" },//48『3-2』
    ]
  },
]
  





// 終わりセリフリスト
const endTexts = [
  "あら、もう時間みたい。もういくわね",
  "また会えることを楽しみにしているわ",
  "また貴方に巡り会えることを期待しているわ。",
  "また会えるのを楽しみにしてるからな！",
  "じゃあ、またお前と会えるのを楽しみにしてるからな！" ,
  "またお前と会えること、楽しみにしてるからな！",
  "また会えるのを楽しみにしてるのだ！",
  "またおぬしと会えること、楽しみにしてるのだ！",
  "また会えるのを楽しみにしてるのだ！",
  "またおぬしと会えること、楽しみにしてるのだ！",
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

// 次へ進む処理
function next() {
  if (choicesBox.style.display === "flex") return;

  if (charIndex < scenario[index].text.length) {
    charIndex = scenario[index].text.length;
    textBox.innerHTML = scenario[index].text;
  } else {
    index++;

    if (index >= scenario.length) {
      showEnd();
      return;
    }

    // 終わりセリフだったらエンド表示
    if (endTexts.includes(scenario[index - 1].text)) {
      showEnd();
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

// 最後のボタン表示処理を関数化
function showEnd() {
  nameBox.innerHTML = "";
  textBox.innerHTML = "……君の選択が、未来を動かす。";

  setTimeout(() => {
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = "auto";
    endButton.style.opacity = 1;
    endButton.style.pointerEvents = "auto";
  }, 500);
}
