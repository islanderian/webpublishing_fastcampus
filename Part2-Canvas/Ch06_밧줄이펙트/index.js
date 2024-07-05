import App from "./js/App.js";
import Vector from "./js/Vector.js";

window.addEventListener("load", () => {
  const app = new App();

  app.render();
});

// Vector Test
const v1 = new Vector(100, 100);
const v2 = new Vector(50, 50);

console.log(v1.add(v2));
console.log(v1.sub(v2.x, v2.y));

const v3 = Vector.add(v1, v2);
console.log(v3);

console.log(v3.mult(v1));

console.log(v1.dist(v2));
