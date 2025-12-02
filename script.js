// -----------------
// カウントダウン（日時ベースで正確に）
// -----------------
const totalSeconds = 3;  // ← ここを3秒に変更
let countdownText = document.querySelector(".countdown-text");
let meterFill = document.querySelector(".meter-fill");
const elNotify = document.getElementById("notify");

// 初期表示
countdownText.textContent = totalSeconds;
meterFill.style.width = "100%";

let endTime = Date.now() + totalSeconds * 1000;
let rafId = null;

function update() {
  const now = Date.now();
  const msLeft = Math.max(0, endTime - now); // ミリ秒の残り
  const secondsLeft = Math.ceil(msLeft / 1000); // 表示は切り上げで 1 秒単位
  const percent = (msLeft / (totalSeconds * 1000)) * 100;

  countdownText.textContent = secondsLeft;
  meterFill.style.width = percent + "%";

  if (msLeft === 0) {
    showNotify();
    if (rafId) cancelAnimationFrame(rafId);
    return;
  }

  rafId = requestAnimationFrame(update);
}

// アニメ開始
rafId = requestAnimationFrame(update);

// 通知クリック
elNotify.addEventListener('click', () => {
  window.location.href = 'comic.html';
});

// -----------------
// iPhone風通知
// -----------------
function showNotify() {
  elNotify.style.display = "flex";
  if(navigator.vibrate) navigator.vibrate([100,50,100]); // バイブレーション
}

elNotify.addEventListener('click', ()=>{
  window.location.href = 'comic.html';
});

// -----------------
// 魔法陣背景（3層・文字控えめ・奥行き控えめ）
// -----------------
const canvas = document.getElementById("magic-circle");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let layers = 3;
let angleLayers = Array(layers).fill(0);

// 文字列少なめ
let magicChars = "★魔法陣★呪文★サークル★1★";
magicChars = magicChars.repeat(4);

function drawMagicCircle(){
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0,0,w,h);

  ctx.save();
  ctx.translate(w/2, h/2);

  for(let l=0; l<layers; l++){
    const rOffset = 50 + l*30; // 奥行き控えめ
    const alpha = 0.15 + 0.15*l; // 透明度控えめ
    const rotateSpeed = 0.002*(l+1);

    ctx.save();
    ctx.rotate(angleLayers[l]);

    // 円
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0,191,255,${alpha})`;
    ctx.lineWidth = 2;
    ctx.shadowColor = "cyan";
    ctx.shadowBlur = 5;
    ctx.arc(0,0,rOffset,0,Math.PI*2);
    ctx.stroke();

    // 文字
    ctx.font = `${16+l*1}px monospace`;
    ctx.fillStyle = `rgba(0,191,255,${alpha})`;
    ctx.shadowColor = "cyan";
    ctx.shadowBlur = 4;
    for(let i=0;i<magicChars.length;i++){
      const theta = (i/magicChars.length)*Math.PI*2;
      ctx.save();
      ctx.rotate(theta);
      ctx.fillText(magicChars[i], rOffset,0);
      ctx.restore();
    }

    ctx.restore();

    angleLayers[l] += rotateSpeed;
  }

  ctx.restore();
  requestAnimationFrame(drawMagicCircle);
}
drawMagicCircle();
