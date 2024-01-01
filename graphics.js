MazeGame.graphics = (function () {
  //////////////////////////////////////////////////////// MAZE FUNCTIONS ///////////////////////////////////////////////////////
  // const playerCanvas = document.getElementById("player-canvas");
  // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor

  let playerImage = new Image();
  playerImage.src = "assets/dino.png";

  let topWallImage = new Image();
  topWallImage.src = "assets/maze-top-wall.png";
  let bottomWallImage = new Image();
  bottomWallImage.src = "assets/maze-bottom-wall.png";
  let leftWallImage = new Image();
  leftWallImage.src = "assets/maze-left-wall.png";
  let rightWallImage = new Image();
  rightWallImage.src = "assets/maze-right-wall.png";

  // Draws each of the cells on the maze canvas
  function drawMaze(maze) {
    // Initialize the canvas

    let mazeCanvas = document.getElementById("maze-canvas");
    let mazectx = mazeCanvas.getContext("2d");
    mazeCanvas.height = maze.size;
    mazeCanvas.width = maze.size;
    mazectx.strokeStyle = "#190019";
    for (let r = 0; r < maze.rows; r++) {
      for (let c = 0; c < maze.columns; c++) {
        let x = (c * maze.size) / maze.columns;
        let y = (r * maze.size) / maze.rows;
        if (maze.grid[r][c].walls.topWall) {
          mazectx.beginPath();
          mazectx.drawImage(
            topWallImage,
            x - maze.size / maze.rows / 8,
            y,
            (5/4) * maze.size / maze.rows,
            maze.size / maze.rows / 8
          );
        }
        if (maze.grid[r][c].walls.bottomWall) {
          mazectx.beginPath();
          mazectx.drawImage(
            bottomWallImage,
            x - maze.size / maze.rows / 8,
            y + (7 / 8) * (maze.size / maze.rows),
            (5/4) * maze.size / maze.rows,
            maze.size / maze.rows / 8
          );
        }
        if (maze.grid[r][c].walls.rightWall) {
          mazectx.beginPath();
          mazectx.drawImage(
            rightWallImage,
            x + (7 / 8) * (maze.size / maze.rows),
            y - maze.size / maze.rows / 8,
            maze.size / maze.rows / 8,
            (5/4) * maze.size / maze.rows
          );
        }
        if (maze.grid[r][c].walls.leftWall) {
          mazectx.beginPath();
          mazectx.drawImage(
            leftWallImage,
            x,
            y - maze.size / maze.rows / 8,
            maze.size / maze.rows / 8,
            (5/4) * maze.size / maze.rows
          );
        }
        if (maze.grid[r][c].goal) {
          mazectx.fillStyle = "rgb(83, 247, 43)";
          mazectx.fillRect(
            x + 1,
            y + 1,
            maze.size / maze.columns - 2,
            maze.size / maze.rows - 2
          );
        }
      }
    }
  }

  ////////////////////////////////////////////////////////// PLAYER FUNCTIONS ////////////////////////////////////////////////////////

  function drawPlayer(player) {
    let playerCanvas = document.getElementById("player-canvas");
    let playerctx = playerCanvas.getContext("2d");

    playerCanvas.width = maze.width;
    playerCanvas.height = maze.height;
    console.log(playerCanvas.width);
    playerctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    playerctx.beginPath();
    playerctx.drawImage(
      playerImage,
      player.x - 25.6,
      player.y - 25.6,
      51.2,
      51.2
    );
    playerctx.fill();
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let api = {
    drawMaze: drawMaze,
    drawPlayer: drawPlayer,
  };

  return api;
})();
