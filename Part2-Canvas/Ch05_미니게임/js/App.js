import Background from "./Background.js";

export default class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio;
  static fps = 60;
  static interval = 1000 / App.fps;
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector("bg3-image"), speed: -1 }),
      new Background({ img: document.querySelector("bg2-image"), speed: -1 }),
      new Background({ img: document.querySelector("bg1-image"), speed: -1 }),
    ];

    // addEventListener 에서 bind(this) 를 안하면 window 로 this가 바인딩 됨. App으로 바인딩 유지되도록
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width =
      innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
    App.canvas.style.width = width + "px";
    App.canvas.style.height = width * (3 / 4) + "px";
  }

  render() {
    let now, delta;
    let then = Date.now();
    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;
      if (delta < App.interval) return;

      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });

      this.background.update();
      this.background.draw();

      then = now - (delta % App.interval);
    };
    requestAnimationFrame(frame);
  }
}
