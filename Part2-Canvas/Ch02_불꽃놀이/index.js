import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import Tail from "./js/Tail.js";
import { hypotenuse, randomNumBetween } from "./js/utils.js";
import Spark from "./js/Spark.js";

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.tails = [];
    this.particles = [];
    this.sparks = [];
  }

  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";

    this.createParticles();
  }

  createTail() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
    const colorDeg = randomNumBetween(0, 360);
    this.tails.push(new Tail(x, vy, colorDeg));
  }

  createParticles(x, y, colorDeg) {
    const PARTICLE_NUM = 400;

    for (let i = 0; i < PARTICLE_NUM; i++) {
      // 원 모양으로 생성
      const r =
        randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001; // 반지름 범위
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);
      const opacity = randomNumBetween(0.6, 0.9);
      const _colorDeg = randomNumBetween(-20, 20) + colorDeg;

      this.particles.push(new Particle(x, y, vx, vy, opacity, _colorDeg));
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;

      // canvas 초기화 (안하면 계속 이어져서 그려짐)
      this.ctx.fillStyle = this.bgColor + "20"; // #00000020 , rgba 에서 마지막 alpha 값
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Particle 배열의 갯수에 비례해서 전체 밝기가 조절되도록
      this.ctx.fillStyle = `rgba(255, 255, 255, ${
        this.particles.length / 50000
      })`;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 랜덤으로 Tail 발생시킴
      if (Math.random() < 0.03) this.createTail();

      // 그리는 부분  ///////////////////////
      this.tails.forEach((tail, index) => {
        tail.update();
        tail.draw();

        // tail 을 따라서 spark 튀도록
        for (let i = 0; i < Math.round(-tail.vy * 0.5); i++) {
          const vx = randomNumBetween(-5, 5) * 0.05;
          const vy = randomNumBetween(-5, 5) * 0.05;
          const opacity = Math.min(-tail.vy, 0.5);

          this.sparks.push(
            new Spark(tail.x, tail.y, vx, vy, opacity, tail.colorDeg)
          );
        }

        // vy 가 0 에 까까워 질때
        if (tail.vy > -0.7) {
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.colorDeg);
        }
      });

      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // 성능 이슈로 인해 Spark 횟수를 줄임
        if (Math.random() < 0.1) {
          this.sparks.push(new Spark(particle.x, particle.y, 0, 0, 0.3, 45));
        }

        // opacity 0 이하(화면에서 안보이는) Particle 배열에서 없애기
        if (particle.opacity < 0) {
          this.particles.splice(index, 1);
        }
      });

      this.sparks.forEach((spark, index) => {
        spark.update();
        spark.draw();

        if (spark.opacity < 0) {
          this.sparks.splice(index, 1);
        }
      });

      ////////////////////////////////////
      then = now - (delta % this.interval);
    };
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});
window.addEventListener("resize", () => {
  canvas.init();
});
