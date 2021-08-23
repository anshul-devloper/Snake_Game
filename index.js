let background_Music = new Audio("music.mp3");
let move = new Audio("move.wav");
let food_Music = new Audio("food.wav");
let gamemover = new Audio("gameover.wav");
let snakearr = [{ x: 10, y: 16 }];
let food = { x: 4, y: 9 };
let board = document.getElementById("board");
let speed = 12;
let ltime = 0;
let score = 0;

// game loop

function f(ctime) {
  window.requestAnimationFrame(f);

  if ((ctime - ltime) / 1000 < 1 / speed) {
    return;
  }

  ltime = ctime;
  allinOne();
}

window.requestAnimationFrame(f);

//    Real Story

function collide() {
  for (let i = 1; i < snakearr.length; i++) {
    if (snakearr[0].x == snakearr[i].x && snakearr[0].y == snakearr[i].y) {
      return true;
    }
  }

  if (
    snakearr[0].x <= 0 ||
    snakearr[0].x >= 19 ||
    snakearr[0].y <= 0 ||
    snakearr[0].y >= 19
  ) {
    return true;
  }

  return false;
}

function allinOne() {
  //   gameover story
  if (collide()) {
    gamemover.play();
    background_Music.pause();
    direction.x = 0;
    direction.y = 0;
    alert("GAME OVER : press ok start again ..");
    snakearr = [{ x: 10, y: 16 }];
    food = { x: 4, y: 9 };
    score = 0;
    points.innerHTML = "Score : " + score;
  }

  // food eaten
  if (snakearr[0].x == food.x && snakearr[0].y == food.y) {
    food_Music.play();
    food_Music.volume = 1;

    // add snake part
    snakearr.unshift({
      x: snakearr[0].x + direction.x,
      y: snakearr[0].y + direction.y,
    });

    // food positioning
    let a1 = 1;
    let b2 = 18;
    food.x = Math.round(a1 + (b2 - a1) * Math.random());
    food.y = Math.round(a1 + (b2 - a1) * Math.random());
    score++;
    points.innerHTML = "Score : " + score;
  }

  //  snake move
  for (let i = snakearr.length - 1; i >= 0; i--) {
    if (i == 0) {
      snakearr[i].x += direction.x;
      snakearr[i].y += direction.y;
    } else {
      snakearr[i].x = snakearr[i - 1].x;
      snakearr[i].y = snakearr[i - 1].y;
    }
  }

  //  display
  board.innerHTML = "";
  //    1.food
  let fooddiv = document.createElement("div");
  fooddiv.style.gridColumnStart = food.x;
  fooddiv.style.gridRowStart = food.y;
  fooddiv.classList.add("foodOfSnake");
  board.appendChild(fooddiv);

  // 2.Snake
  for (let i = 0; i < snakearr.length; i++) {
    let snakediv = document.createElement("div");
    snakediv.style.gridColumnStart = snakearr[i].x;
    snakediv.style.gridRowStart = snakearr[i].y;
    board.appendChild(snakediv);
    if (i == 0) {
      snakediv.classList.add("head");
    } else {
      snakediv.classList.add("snakebody");
    }
  }
}

// direction process

let direction = {
  x: 0,
  y: 0,
};

window.addEventListener("keydown", function func(obj) {
  if (
    obj.key == "ArrowUp" ||
    obj.key == "ArrowDown" ||
    obj.key == "ArrowLeft" ||
    obj.key == "ArrowRight"
  ) {
    background_Music.play();
    move.play();
    move.volume = 1;
    background_Music.volume = 0.5;
  }
  if (obj.key == "ArrowUp") {
    direction.x = 0;
    direction.y = -1;
  }

  if (obj.key == "ArrowDown") {
    direction.x = 0;
    direction.y = 1;
  }

  if (obj.key == "ArrowLeft") {
    direction.x = -1;
    direction.y = 0;
  }

  if (obj.key == "ArrowRight") {
    direction.x = 1;
    direction.y = 0;
  }
});
