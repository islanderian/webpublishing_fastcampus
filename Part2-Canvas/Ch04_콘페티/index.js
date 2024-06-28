const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1; // 최대 dpr 을 2로 지정(퍼포먼스 이슈)
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const fps = 60;
const interval = 1000 / fps;

function init() {
  // window resize 될 때 canvas 크기 재조정
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
}

function render() {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;

    // 테스트 그리기
    ctx.fillStyle = "red";
    ctx.fillRect(200, 200, 50, 50);

    then = now - (delta % interval);
  };
  requestAnimationFrame(frame); // frame 최초 실행
}

window.addEventListener("load", () => {
  init();
  render();
});
window.addEventListener("resize", init);
