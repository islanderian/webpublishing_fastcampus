export default class App {
  static width = innerWidth;
  static height = innerHeight;
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static fps = 60;
  static interval = 1000 / App.fps;

  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }
  resize() {
    App.width = innerWidth;
    App.height = innerHeight;

    this.canvas.style.width = App.width + "px";
    this.canvas.style.height = App.height + "px";

    this.canvas.width = App.width * App.dpr;
    this.canvas.height = App.height * App.dpr;
    this.ctx.scale(App.dpr, App.dpr);
  }
  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;
      if (delta < App.interval) return;
      // 이곳에 그리기 관련

      then = now - (delta % App.interval);
      this.ctx.clearRect(0, 0, App.width, App.height);
      this.ctx.fillRect(100, 100, 100, 100);
    };
    requestAnimationFrame(frame);
  }
}
