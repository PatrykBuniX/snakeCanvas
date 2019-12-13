const canvas = document.querySelector("canvas");
const button = document.querySelector("button");
const score = document.querySelector("#score");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerWidth;
let canvaSize = canvas.width;
ctx.scale(canvaSize / 40, canvaSize / 40);

let playing = false;

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
  return [Math.round(Math.random() * 39), Math.round(Math.random() * 39)];
};

let apple = getApplePos();

const drawApple = () => {
  const [appleX, appleY] = apple;
  ctx.fillStyle = "red";
  ctx.fillRect(appleX, appleY, 1, 1);
};

const draw = () => {
  ctx.clearRect(0, 0, 40, 40);
  drawApple();
  ctx.fillStyle = "black";
  snake.forEach(([x, y]) => {
    ctx.fillRect(x, y, 1, 1);
  });
};

const update = () => {
  let tail = snake[0];
  let head = snake[snake.length - 1];
  const body = [...snake];
  body.pop(); //remove head from body
  const [headX, headY] = head;
  const [tailX, tailY] = tail;
  const [appleX, appleY] = apple;

  //moving the snake depending on the direction

  if (direction === 0) {
    snake.push([headX, headY - 1]);
  } else if (direction === 1) {
    snake.push([headX + 1, headY]);
  } else if (direction === 2) {
    snake.push([headX, headY + 1]);
  } else {
    snake.push([headX - 1, headY]);
  }

  //check if the head's position matches the apple's position
  //if so: prolong the tail and draw new apple

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
    //walls collision detection:
    headX > 39 ||
    headX < 0 ||
    headY > 39 ||
    headY < 0 ||
    //body collision detection:
    body.some(cords => cords[0] == headX && cords[1] == headY)
  ) {
    playing = false;
    clearInterval(game);
    button.style.display = "block";
    apple = getApplePos();
    snake = [
      [20, 20],
      [20, 21],
      [20, 22]
    ];
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

let game;

const playGame = () => {
  if (playing) return;
  playing = true;
  button.style.display = "none";
  game = setInterval(update, 100);
};

window.addEventListener("keyup", changeDirection);
button.addEventListener("click", playGame);

// playGame();
