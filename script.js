let remaining = 10;
const elCountdown = document.getElementById("countdown");
const elNotify = document.getElementById("notify");

const timer = setInterval(() => {
  remaining--;
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  elCountdown.textContent = `${m}:${s}`;

  if (remaining <= 0) {
    clearInterval(timer);
    elNotify.classList.remove("hidden");
  }
}, 1000);

// 通知風バナーをタップしたら漫画へ
elNotify.addEventListener("click", () => {
  window.location.href = "comic.html";
});
