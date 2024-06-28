export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

// 빗변(대각선) 의 길이를 구하는 함수
export const hypotenuse = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
