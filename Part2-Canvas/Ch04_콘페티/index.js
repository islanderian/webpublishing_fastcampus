import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1; // 최대 dpr 을 2로 지정(퍼포먼스 이슈)
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const fps = 60;
const interval = 1000 / fps;

const particles = [];

function init() {
  // window resize 될 때 canvas 크기 재조정
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  // confetti({
  //   x: canvasWidth / 2,
  //   y: canvasHeight / 2,
  //   count: 10,
  // });
}

function confetti({ x, y, count, deg, colors }) {
  for (let i = 0; i < count; i++)
    particles.push(new Particle(x, y, deg, colors));
}

function render() {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);

      // resetTransform 때문에 다시 dpr 설정
      ctx.scale(dpr, dpr);

      if (particles[i].opacity < 0) {
        particles.splice(i, 1);
      }
    }

    then = now - (delta % interval);
  };
  requestAnimationFrame(frame); // frame 최초 실행
}

window.addEventListener("load", () => {
  init();
  render();
});
window.addEventListener("resize", init);
window.addEventListener("click", () => {
  confetti({
    x: 0, // 0 ~ 1
    y: 0.5, // 0 ~ 1
    count: 10,
    deg: -50,
    colors: ["FF0000"],
  });
});
