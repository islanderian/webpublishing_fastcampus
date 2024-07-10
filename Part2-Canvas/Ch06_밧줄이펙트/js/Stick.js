export default class Stick {
  constructor(p1, p2) {
    this.startPoint = p1;
    this.endPoint = p2;

    // 시작점과 끝점 사이 선의 길이
    this.length = this.startPoint.pos.dist(this.endPoint.pos);

    // 고무줄처럼 돌아가려는 힘 (낮을 수로 쫀득해짐, 1에 가까울 수록 딱딱)
    this.tension = 0.3;
  }
  update() {
    const dx = this.endPoint.pos.x - this.startPoint.pos.x;
    const dy = this.endPoint.pos.y - this.startPoint.pos.y;

    // 피타고라스의 정리
    const dist = Math.sqrt(dx * dx + dy * dy);
    const diff = (dist - this.length) / dist;

    const offsetX = diff * dx * this.tension;
    const offsetY = diff * dy * this.tension;

    const m = this.startPoint.mass + this.endPoint.mass;
    const m1 = this.endPoint.mass / m;
    const m2 = this.startPoint.mass / m;

    if (!this.startPoint.pinned) {
      this.startPoint.pos.x += offsetX * m1;
      this.startPoint.pos.y += offsetY * m1;
    }
    if (!this.endPoint.pinned) {
      this.endPoint.pos.x -= offsetX * m2;
      this.endPoint.pos.y -= offsetY * m2;
    }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    ctx.stroke();
    ctx.closePath();
  }
}
