class Player {
  constructor(x, y, radius, color, maze) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.goingDown = false;
    this.goingUp = false;
    this.goingLeft = false;
    this.goingRight = false;
    this.downPressed = false;
    this.upPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
    this.row = 0;
    this.col = 0;
    this.velocity = 0.005;
    this.distToGo = Math.floor(maze.size / maze.rows);
    this.isMoving = false;
    this.maze = maze;
    addEventListener("keydown", (event) => {
      this.keydownHandler(event);
    });
    addEventListener("keyup", (event) => {
      this.keyupHandler(event);
    });
  }
  update(delta) {
    if (this.goingUp) {
      if (!this.maze.grid[this.row][this.col].walls.topWall && !this.isMoving) {
        this.isMoving = true;
      } else if (this.maze.grid[this.row][this.col].walls.topWall) {
        this.goingUp = false;
      }
      if (this.isMoving) {
        let goDist = Math.min(
          (this.maze.size / this.maze.rows) * this.velocity * delta,
          this.distToGo
        );
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.isMoving = false;
          this.goingUp = false;
          this.distToGo = this.maze.size / this.maze.rows;
          this.row -= 1;
        }
        this.y -= goDist;
      }
    } else if (this.goingDown) {
      if (
        !this.maze.grid[this.row][this.col].walls.bottomWall &&
        !this.isMoving
      ) {
        this.isMoving = true;
      } else if (this.maze.grid[this.row][this.col].walls.bottomWall) {
        this.goingDown = false;
      }
      if (this.isMoving) {
        let goDist = Math.min(
          Math.floor(this.maze.size / this.maze.rows) * this.velocity * delta,
          this.distToGo
        );
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.row += 1;
          console.log(this.row);
          this.distToGo = Math.floor(this.maze.size / this.maze.rows);
          if (!this.downPressed) {
            this.isMoving = false;
            this.goingDown = false;
          }
        }
        this.y += goDist;
      }
    } else if (this.goingLeft) {
      if (
        !this.maze.grid[this.row][this.col].walls.leftWall &&
        !this.isMoving
      ) {
        this.isMoving = true;
      } else if (this.maze.grid[this.row][this.col].walls.leftWall) {
        this.goingLeft = false;
      }
      if (this.isMoving) {
        let goDist = Math.min(
          (this.maze.size / this.maze.rows) * this.velocity * delta,
          this.distToGo
        );
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.isMoving = false;
          this.goingLeft = false;
          this.distToGo = this.maze.size / this.maze.rows;
          this.col -= 1;
        }
        this.x -= goDist;
      }
    } else if (this.goingRight) {
      if (
        !this.maze.grid[this.row][this.col].walls.rightWall &&
        !this.isMoving
      ) {
        this.isMoving = true;
      } else if (this.maze.grid[this.row][this.col].walls.rightWall) {
        this.goingRight = false;
      }
      if (this.isMoving) {
        let goDist = Math.min(
          (this.maze.size / this.maze.rows) * this.velocity * delta,
          this.distToGo
        );
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.isMoving = false;
          this.goingRight = false;
          this.distToGo = this.maze.size / this.maze.rows;
          this.col += 1;
        }
        this.x += goDist;
      }
    }
  }
  keydownHandler(event) {
    if (!this.isMoving) {
      if (event.key === "w") {
        this.goingUp = true;
        this.upPressed = true;
      }
      if (event.key === "s") {
        this.goingDown = true;
        this.downPressed = true;
      }
      if (event.key === "a") {
        this.goingLeft = true;
        this.leftPressed = true;
      }
      if (event.key === "d") {
        this.goingRight = true;
        this.rightPressed = true;
      }
    }
  }
  keyupHandler(event) {
    if (event.key === "w") {
      this.upPressed = false;
    }
    if (event.key === "s") {
      this.downPressed = false;
    }
    if (event.key === "a") {
      this.leftPressed = false;
    }
    if (event.key === "d") {
      this.rightPressed = false;
    }
  }
}
