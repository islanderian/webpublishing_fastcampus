import Vector from "./Vector.js";

export default class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y); // 현재 위치
    this.oldPos = new Vector(x, y); // 직전 위치

    this.gravity = new Vector(0, 1);
    this.friction = 0.97;

    // 고정해 놓으려는 객체
    this.pinned = false;

    // 무게
    this.mass = 1;

    this.lightImg = document.querySelector("#light-img");
    this.lightSize = 15;
  }
  update(mouse) {
    // 해당 위치에 draw 하고 고정해 놓기
    if (this.pinned) return;

    // 한 프레임 당 속도 (velocity)
    let vel = Vector.sub(this.pos, this.oldPos);

    // 지금 위치에서 이전 위치를 빼서 속도 구하기
    this.oldPos.setXY(this.pos.x, this.pos.y);
    vel.mult(this.friction);
    vel.add(this.gravity);
    // console.log(vel);

    let { x: dx, y: dy } = Vector.sub(mouse.pos, this.pos);
    const dist = Math.sqrt(dx * dx + dy * dy);
    // if (dist > mouse.radius) return;

    const direction = new Vector(dx / dist, dy / dist);

    // 0보다 작을 땐 force 에 0으로 고정
    const force = Math.max((mouse.radius - dist) / mouse.radius, 0);

    // 마우스가 거의 근접했을때 움직이지 않도록 (딱 달라붙어 있도록)
    if (force > 0.6) {
      this.pos.setXY(mouse.pos.x, mouse.pos.y);
    } else {
      this.pos.add(vel);
      this.pos.add(direction.mult(force).mult(5));
    }
  }
  draw(ctx) {
    // ctx.fillStyle = "#000";
    // ctx.beginPath();
    // ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    ctx.fillStyle = "#999";
    ctx.fillRect(
      this.pos.x - this.mass,
      this.pos.y - this.mass,
      this.mass * 2,
      this.mass * 2
    );
  }
  drawLight(ctx) {
    ctx.drawImage(
      this.lightImg,
      this.pos.x - this.lightSize / 2,
      this.pos.y - this.lightSize / 2,
      this.lightSize,
      this.lightSize
    );
  }
}
