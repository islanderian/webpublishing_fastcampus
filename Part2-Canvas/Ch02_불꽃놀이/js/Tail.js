// 불꽃 쏘아 올리는 Class

import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./utils.js";

export default class Tail extends CanvasOption {
  constructor(x, vy, color) {
    super();
    this.x = x;
    this.y = this.canvasHeight;
    this.vy = vy;
    this.color = color;
    this.angle = randomNumBetween(0, 2);
    this.friction = 0.985;
  }
  update() {
    this.vy *= this.friction;
    this.y += this.vy;

    // 꼬불꼬불 올라가도록
    this.angle += 1;
    this.x += Math.cos(this.angle) * this.vy * 0.2;

    this.opacity = -this.vy * 0.1;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
