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
      if (!this.maze.grid[this.row][this.col].walls.topWall && !this.goingUp) {
        this.goingUp = true;
      } else if (this.maze.grid[this.row][this.col].walls.topWall) {
        this.goingUp = false;
      }
      if (this.goingUp) {
        let goDist = Math.min(
          (this.maze.size / this.maze.rows) * this.velocity * delta,
          this.distToGo
        );
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.row -= 1;
          this.distToGo = Math.floor(this.maze.size / this.maze.rows);
          if (!this.upPressed) {
            this.goingUp = false;
          }
        }
        this.y -= goDist;
      }
    } else if (this.goingDown) {
      if (
        !this.maze.grid[this.row][this.col].walls.bottomWall &&
        !this.goingDown
      ) {
        this.goingDown = true;
      } else if (this.maze.grid[this.row][this.col].walls.bottomWall) {
        this.goingDown = false;
      }
      if (this.goingDown) {
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
            this.goingDown = false;
          }
        }
        this.y += goDist;
      }
    } else if (this.goingLeft) {
      if (
        !this.maze.grid[this.row][this.col].walls.leftWall &&
        !this.goingLeft
      ) {
        this.goingLeft = true;
      } else if (this.maze.grid[this.row][this.col].walls.leftWall) {
        this.goingLeft = false;
      }
      if (this.goingLeft) {
        let goDist = Math.min(
          (this.maze.size / this.maze.rows) * this.velocity * delta,
          this.distToGo
        );
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.col -= 1;
          this.distToGo = Math.floor(this.maze.size / this.maze.rows);
          if (!this.leftPressed) {
            this.goingLeft = false;
          }
        }
        this.x -= goDist;
      }
    } else if (this.goingRight) {
      if (
        !this.maze.grid[this.row][this.col].walls.rightWall &&
        !this.goingRight
      ) {
        this.goingRight = true;
      } else if (this.maze.grid[this.row][this.col].walls.rightWall) {
        this.goingRight = false;
      }
      if (this.goingRight) {
        let goDist = Math.min(
          (this.maze.size / this.maze.rows) * this.velocity * delta,
          this.distToGo
        );
        this.distToGo = this.distToGo - goDist;
        if (this.distToGo == 0.0) {
          this.col += 1;
          this.distToGo = Math.floor(this.maze.size / this.maze.rows);
          if (!this.rightPressed) {
            this.goingRight = false;
          }
        }
        this.x += goDist;
      }
    }
  }

  keydownHandler(event) {
    // make it so only one key can be pressed at a time
    if (event.key === "w" && !this.upPressed && !this.downPressed && !this.leftPressed && !this.rightPressed && !this.goingUp && !this.goingDown && !this.goingLeft && !this.goingRight) {
      this.upPressed = true;
      this.goingUp = true;
    }
    if (event.key === "s" && !this.upPressed && !this.downPressed && !this.leftPressed && !this.rightPressed && !this.goingUp && !this.goingDown && !this.goingLeft && !this.goingRight) {
      this.downPressed = true;
      this.goingDown = true;
    }
    if (event.key === "a" && !this.upPressed && !this.downPressed && !this.leftPressed && !this.rightPressed && !this.goingUp && !this.goingDown && !this.goingLeft && !this.goingRight) {
      this.leftPressed = true;
      this.goingLeft = true;
    }
    if (event.key === "d" && !this.upPressed && !this.downPressed && !this.leftPressed && !this.rightPressed && !this.goingUp && !this.goingDown && !this.goingLeft && !this.goingRight) {
      this.rightPressed = true;
      this.goingRight = true;
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
