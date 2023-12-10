const canvas = document.querySelector(".player");
ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.goingDown = false;
    this.goingUp = false;
    this.goingLeft = false;
    this.goingRight = false;
    this.row = 0;
    this.col = 0;
  }
  update(delta) {
    if (this.goingUp) {
      this.goingUp = false;
      if (!newMaze.grid[this.row][this.col].walls.topWall) {
        this.y -= cellSize;
        this.row -= 1;
      }
    } else if (this.goingDown) {
      this.goingDown = false;
      if (!newMaze.grid[this.row][this.col].walls.bottomWall) {
        this.y += cellSize;
        this.row += 1;
      }
    } else if (this.goingLeft) {
      this.goingLeft = false;
      if (!newMaze.grid[this.row][this.col].walls.leftWall) {
        this.x -= cellSize;
        this.col -= 1;
      }
    } else if (this.goingRight) {
      this.goingRight = false;
      if (!newMaze.grid[this.row][this.col].walls.rightWall) {
        this.x += cellSize;
        this.col += 1;
      }
    }
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); // begin drawing on screen
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  keydownHandler(event) {
    if (event.key === "w") {
      this.goingUp = true;
    }
    if (event.key === "s") {
      this.goingDown = true;
    }
    if (event.key === "a") {
      this.goingLeft = true;
    }
    if (event.key === "d") {
      this.goingRight = true;
    }
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

let cellSize = Math.floor(newMaze.size / newMaze.rows);
const player = new Player(cellSize / 2, cellSize / 2, cellSize / 3, "magenta");

function globDraw() {
  player.draw();
}

function globUpdate(delta) {
  player.update(delta);
}

addEventListener("keydown", (event) => {
  player.keydownHandler(event);
});

let lastFrameTime = performance.now();

function gameLoop() {
  let currentTime = performance.now();
  let delta = currentTime - lastFrameTime;
  lastFrameTime = currentTime;
  globUpdate(delta);
  globDraw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
