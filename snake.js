const canvas = document.querySelector("canvas");
const score = document.querySelector("#score");
const ctx = canvas.getContext("2d");
ctx.scale(10, 10);

const boxW = 400;
const boxH = 400;

let snake = [
  [20, 20],
  [20, 21],
  [20, 22]
];

//directions:
//0-top
//1-right
//2-bottom
//3-left

let direction = Math.round(Math.random() * 3);

const getApplePos = () => {
  const cords = [
    Math.round(Math.random() * 39),
    Math.round(Math.random() * 39)
  ];
  return cords;
};

let apple = getApplePos();

const setApple = () => {
  const [appleX, appleY] = apple;
  ctx.fillStyle = "red";
  ctx.fillRect(appleX, appleY, 1, 1);
};

const draw = () => {
  ctx.clearRect(0, 0, boxW, boxH);
  setApple();
  ctx.fillStyle = "black";
  snake.forEach(([x, y]) => {
    ctx.fillRect(x, y, 1, 1);
  });
};

const update = () => {
  let tail = snake[0];
  let head = snake[snake.length - 1];
  const body = [...snake];
  body.pop();
  const [headX, headY] = head;
  const [tailX, tailY] = tail;
  const [appleX, appleY] = apple;
  if (direction === 0) {
    snake.push([headX, headY - 1]);
  } else if (direction === 1) {
    snake.push([headX + 1, headY]);
  } else if (direction === 2) {
    snake.push([headX, headY + 1]);
  } else {
    snake.push([headX - 1, headY]);
  }
  if (headX == appleX && headY == appleY) {
    if (direction === 0) {
      snake.unshift([tailX, tailY + 1]);
    } else if (direction === 1) {
      snake.unshift([tailX - 1, tailY]);
    } else if (direction === 2) {
      snake.unshift([tailX, tailY - 1]);
    } else {
      snake.unshift([tailX + 1, tailY]);
    }
    apple = getApplePos();
  }
  snake.shift();
  if (
    headX > 39 ||
    headX < 0 ||
    headY > 39 ||
    headY < 0 ||
    body.some(cords => cords[0] == headX && cords[1] == headY)
  ) {
    snake = [
      [20, 20],
      [20, 21],
      [20, 22]
    ];
    apple = getApplePos();
  }
  score.innerText = `🐍\nSCORE:\n👉${snake.length}👈`;
  draw();
};

const changeDirection = e => {
  if (e.which === 38) {
    direction = 0; //top
  } else if (e.which === 39) {
    direction = 1;
  } else if (e.which === 40) {
    direction = 2;
  } else if (e.which === 37) {
    direction = 3;
  }
};

window.addEventListener("keyup", changeDirection);

setInterval(update, 100);
