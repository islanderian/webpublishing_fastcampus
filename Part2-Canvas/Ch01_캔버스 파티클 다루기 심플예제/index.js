const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// CSS 1px 그릴 때 사용되는 장치의 px 수, 맥북은 2
const dpr = window.devicePixelRatio;

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

// 레티나에서 더 선명하게 Canvas 조정 ////////////////
// canvas 의 실제 크기와 CSS 에서의 크기를 같게 맞춰주어야 함
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

// dpr 1이 아닌 기기에서 더 선명하게 보이도록 처리
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);
// //////////////////////////////////////

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.03; // 가속도
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }
}

// 5개의 랜덤 Particle 생성
const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];
for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);

  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

// 주파수 다른 사양의 기기에서도 동일하게 애니메이션을 적용하기 위한 코드
const fps = 60;
let interval = 1000 / fps;
let now, delta;
let then = Date.now();

// animate 함수 , 매 프레임마다 해당 함수 실행시킴
function animate() {
  window.requestAnimationFrame(animate);

  now = Date.now();
  delta = now - then;
  if (delta < interval) return;

  // 매 프레임마다 전체 캔버스 지우기 (초기화)
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // 애니메이션 코드
  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    // 바닥으로 떨어지면 다시 위에서 떨어지는 애니메이션 구현
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });
  // ///////////////////////////////////////////

  then = now - (delta % interval);
}

animate();
