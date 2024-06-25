const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// CSS 1px 그릴 때 사용되는 장치의 px 수, 맥북은 2
const dpr = window.devicePixelRatio;

const canvasWidth = 300;
const canvasHeight = 300;

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
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "red";
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

// animate 함수 , 매 프레임마드 해당 함수 실행시킴
function animate() {
  window.requestAnimationFrame(animate);

  // 매 프레임마다 전체 캔버스 지우기 (초기화)
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particle.draw();
}

animate();
