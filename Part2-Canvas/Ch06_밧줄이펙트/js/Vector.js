export default class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  // 직접 사용하는 메소드 Vector.add()
  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }
  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  // new 인스턴스로 만든후 사용하는 메소드
  add(x, y) {
    if (arguments.length === 1) {
      // 인자를 1개 받을 때 (Vector 자체를 인자로 받을 때)
      this.x += x.x;
      this.y += x.y;
    } else if (arguments.length === 2) {
      // 인자를 2개 받을 때 (Vector 의 x, y를 따로 인자로 받을 때)
      this.x += x;
      this.y += y;
    }
    return this; // 더해진 Vector 인스턴스를 바로 return
  }

  sub(x, y) {
    if (arguments.length === 1) {
      this.x -= x.x;
      this.y -= x.y;
    } else if (arguments.length === 2) {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }

  // 곱하기
  mult(v) {
    if (typeof v === "number") {
      this.x *= v;
      this.y *= v;
    } else {
      // type 이 number가 아닌 Vector 이면
      this.x *= v.x;
      this.y *= v.y;
    }
    return this;
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
  }

  // Vector 와 Vector 사이의 거리값 return
  dist(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    // 피타고라스의 정리
    return Math.sqrt(dx * dx + dy * dy);
  }
}
