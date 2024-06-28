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

  const x = innerWidth / 2;
  let y = innerHeight / 2;
  let widthAlpha = 0;
  const width = 50;
  const height = 50;
  let deg = 0.1;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    widthAlpha += 0.1;
    deg += 0.1;
    y += 1;

    // 기본 rotate 를 하면 캔버스 (0, 0)을 중심축으로 회전함
    ctx.translate(x + width, y + height); // 회전 시키고자 하는 객체의 중심축으로 이동
    ctx.rotate(deg);
    ctx.translate(-(x + width), -(y + height)); // 중심축 원위치

    ctx.fillStyle = "red";
    ctx.fillRect(
      x,
      y,
      width * Math.cos(widthAlpha),
      height * Math.sin(widthAlpha)
    );
    // ctx.fillRect(x, y, width, height);

    ctx.resetTransform(); // rotate 값이 누적해서 더해지지 않도록
    ctx.scale(dpr, dpr); // resetTransform 해주기 때문에 scale 도 같이 풀림. dpr 위해 다시 scaling

    then = now - (delta % interval);
  };
  requestAnimationFrame(frame); // frame 최초 실행
}

window.addEventListener("load", () => {
  init();
  render();
});
window.addEventListener("resize", init);
