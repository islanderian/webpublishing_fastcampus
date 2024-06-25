const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// CSS 1px 그릴 때 사용되는 장치의 px 수, 맥북은 2
const dpr = window.devicePixelRatio;

const canvasWidth = 300;
const canvasHeight = 300;

// 레티나에서 더 선명하게 Canvas 조정 ////////////////
// canvas 의 실제 크기와 CSS 에서의 크기를 같게 맞춰주어야 함
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

// dpr 1이 아닌 기기에서 더 선명하게 보이도록 처리
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

ctx.fillRect(10, 10, 50, 50);
