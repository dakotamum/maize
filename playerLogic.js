function playerTemplate (x, y, radius, color, maze) {
  let that = {};
    that.x = x;
    that.y = y;
    that.radius = radius;
    that.color = color;
    that.goingDown = false;
    that.goingUp = false;
    that.goingLeft = false;
    that.goingRight = false;
    that.downPressed = false;
    that.upPressed = false;
    that.leftPressed = false;
    that.rightPressed = false;
    that.row = 0;
    that.col = 0;
    that.velocity = 0.002;
    that.distToGo = Math.floor(maze.size / maze.rows);
    that.maze = maze;

  that.keydownHandler = function(event) {
    // make it so only one key can be pressed at a time
    if (event.key === "w") {
      that.upPressed = true;
    }
    if (event.key === "s") {
      that.downPressed = true;
    }
    if (event.key === "a") {
      that.leftPressed = true;
    }
    if (event.key === "d") {
      that.rightPressed = true;
    }
  }
  that.keyupHandler = function(event) {
    if (event.key === "w") {
      that.upPressed = false;
    }
    if (event.key === "s") {
      that.downPressed = false;
    }
    if (event.key === "a") {
      that.leftPressed = false;
    }
    if (event.key === "d") {
      that.rightPressed = false;
    }
  }
    addEventListener("keydown", (event) => {
      that.keydownHandler(event);
    });
    addEventListener("keyup", (event) => {
      that.keyupHandler(event);
    });

  that.update = function(delta) {
    if (
      that.upPressed &&
      !that.goingDown &&
      !that.goingLeft &&
      !that.goingRight
    ) {
      that.goingUp = true;
    } else if (
      that.downPressed &&
      !that.goingUp &&
      !that.goingLeft &&
      !that.goingRight
    ) {
      that.goingDown = true;
    } else if (
      that.leftPressed &&
      !that.goingUp &&
      !that.goingDown &&
      !that.goingRight
    ) {
      that.goingLeft = true;
    } else if (
      that.rightPressed &&
      !that.goingUp &&
      !that.goingDown &&
      !that.goingLeft
    ) {
      that.goingRight = true;
    }

    if (that.goingUp) {
      if (!that.maze.grid[that.row][that.col].walls.topWall && !that.goingUp) {
        that.goingUp = true;
      } else if (that.maze.grid[that.row][that.col].walls.topWall) {
        that.goingUp = false;
      }
      if (that.goingUp) {
        let goDist = Math.min(
          (that.maze.size / that.maze.rows) * that.velocity * delta,
          that.distToGo
        );
        that.distToGo = that.distToGo - goDist;
        if (that.distToGo == 0.0) {
          that.row -= 1;
          that.distToGo = Math.floor(that.maze.size / that.maze.rows);
          if (!that.upPressed) {
            that.goingUp = false;
          }
        }
        that.y -= goDist;
      }
    } else if (that.goingDown) {
      if (
        !that.maze.grid[that.row][that.col].walls.bottomWall &&
        !that.goingDown
      ) {
        that.goingDown = true;
      } else if (that.maze.grid[that.row][that.col].walls.bottomWall) {
        that.goingDown = false;
      }
      if (that.goingDown) {
        let goDist = Math.min(
          Math.floor(that.maze.size / that.maze.rows) * that.velocity * delta,
          that.distToGo
        );
        that.distToGo = that.distToGo - goDist;
        if (that.distToGo == 0.0) {
          that.row += 1;
          that.distToGo = Math.floor(that.maze.size / that.maze.rows);
          if (!that.downPressed) {
            that.goingDown = false;
          }
        }
        that.y += goDist;
      }
    } else if (that.goingLeft) {
      if (
        !that.maze.grid[that.row][that.col].walls.leftWall &&
        !that.goingLeft
      ) {
        that.goingLeft = true;
      } else if (that.maze.grid[that.row][that.col].walls.leftWall) {
        that.goingLeft = false;
      }
      if (that.goingLeft) {
        let goDist = Math.min(
          (that.maze.size / that.maze.rows) * that.velocity * delta,
          that.distToGo
        );
        that.distToGo = that.distToGo - goDist;
        if (that.distToGo == 0.0) {
          that.col -= 1;
          that.distToGo = Math.floor(that.maze.size / that.maze.rows);
          if (!that.leftPressed) {
            that.goingLeft = false;
          }
        }
        that.x -= goDist;
      }
    } else if (that.goingRight) {
      if (
        !that.maze.grid[that.row][that.col].walls.rightWall &&
        !that.goingRight
      ) {
        that.goingRight = true;
      } else if (that.maze.grid[that.row][that.col].walls.rightWall) {
        that.goingRight = false;
      }
      if (that.goingRight) {
        let goDist = Math.min(
          (that.maze.size / that.maze.rows) * that.velocity * delta,
          that.distToGo
        );
        that.distToGo = that.distToGo - goDist;
        if (that.distToGo == 0.0) {
          that.col += 1;
          that.distToGo = Math.floor(that.maze.size / that.maze.rows);
          if (!that.rightPressed) {
            that.goingRight = false;
          }
        }
        that.x += goDist;
      }
    }
  }
  return that;
}
