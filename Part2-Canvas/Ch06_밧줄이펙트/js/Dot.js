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
  }
  update() {
    // 해당 위치에 draw 하고 고정해 놓기
    if (this.pinned) return;

    // 한 프레임 당 속도 (velocity)
    let vel = Vector.sub(this.pos, this.oldPos);

    // 지금 위치에서 이전 위치를 빼서 속도 구하기
    this.oldPos.setXY(this.pos.x, this.pos.y);
    vel.mult(this.friction);
    vel.add(this.gravity);
    // console.log(vel);
    this.pos.add(vel);
  }
  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
