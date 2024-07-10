import Dot from "./Dot.js";
import Stick from "./Stick.js";

export default class Rope {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.segments = config.segments || 10;
    this.gap = config.gap || 50;
    this.iterations = config.iterations || 10;

    this.dots = [];
    this.sticks = [];

    this.create();
  }

  pin(index) {
    this.dots[index].pinned = true;
  }

  // 일정 이상 당겨지면 Rope 가 뽑히는 이펙트
  checkPullingOut() {
    // 실제로 늘어난 길이
    const dist = this.dots[0].pos.dist(this.dots[1].pos);

    // 늘어난 길이와 원래 길이의 비율이 1.2 보다 커지면
    if (dist / this.sticks[0].length > 1.2) {
      this.dots[0].pinned = false;
    }
  }

  create() {
    for (let i = 0; i < this.segments; i++) {
      this.dots.push(new Dot(this.x, this.y + i * this.gap));
    }
    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
    }
  }

  update(mouse) {
    this.checkPullingOut();

    this.dots.forEach((dot) => {
      dot.update(mouse);
    });

    // side effect 줄이기 위해 한 프레임에 여러번 실행
    // 너무 많이 돌리면 퍼포먼스에 영향을 줌
    for (let i = 0; i < this.iterations; i++) {
      this.sticks.forEach((stick) => {
        stick.update();
      });
    }
  }
  draw(ctx) {
    this.dots.forEach((dot) => {
      dot.draw(ctx);
    });
    this.sticks.forEach((stick) => {
      stick.draw(ctx);
    });

    // Rope 끝에만 growing 이미지 넣기
    this.dots[this.dots.length - 1].drawLight(ctx);
  }
}
