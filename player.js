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
    this.velocity = 0.005;
    this.distToGo = cellSize;
    this.isMoving = false;
  }
  update(delta) {
    if (this.goingUp) {
      if (!newMaze.grid[this.row][this.col].walls.topWall && !this.isMoving) {
        this.isMoving = true;
      } else if (newMaze.grid[this.row][this.col].walls.topWall) {
        this.goingUp = false;
      }
      if (this.isMoving) {
        let goDist = Math.min(cellSize * this.velocity * delta, this.distToGo);
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.isMoving = false;
          this.goingUp = false;
          this.distToGo = cellSize;
          console.log(this.isMoving);
          this.row -= 1;
        }
        this.y -= goDist;
      }
    } else if (this.goingDown) {
      if (
        !newMaze.grid[this.row][this.col].walls.bottomWall &&
        !this.isMoving
      ) {
        this.isMoving = true;
      } else if (newMaze.grid[this.row][this.col].walls.bottomWall) {
        this.goingDown = false;
      }
      if (this.isMoving) {
        let goDist = Math.min(cellSize * this.velocity * delta, this.distToGo);
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.isMoving = false;
          this.goingDown = false;
          this.distToGo = cellSize;
          console.log(this.isMoving);
          this.row += 1;
        }
        this.y += goDist;
      }
    } else if (this.goingLeft) {
      if (!newMaze.grid[this.row][this.col].walls.leftWall && !this.isMoving) {
        this.isMoving = true;
      } else if (newMaze.grid[this.row][this.col].walls.leftWall) {
        this.goingLeft = false;
      }
      if (this.isMoving) {
        let goDist = Math.min(cellSize * this.velocity * delta, this.distToGo);
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.isMoving = false;
          this.goingLeft = false;
          this.distToGo = cellSize;
          console.log(this.isMoving);
          this.col -= 1;
        }
        this.x -= goDist;
      }
    } else if (this.goingRight) {
      if (!newMaze.grid[this.row][this.col].walls.rightWall && !this.isMoving) {
        this.isMoving = true;
      } else if (newMaze.grid[this.row][this.col].walls.rightWall) {
        this.goingRight = false;
      }
      if (this.isMoving) {
        let goDist = Math.min(cellSize * this.velocity * delta, this.distToGo);
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.isMoving = false;
          this.goingRight = false;
          this.distToGo = cellSize;
          console.log(this.isMoving);
          this.col += 1;
        }
        this.x += goDist;
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
    if (!this.isMoving) {
      console.log("yo homi!");
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
