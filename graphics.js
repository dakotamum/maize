MazeGame.graphics = (function () {
  //////////////////////////////////////////////////////// MAZE FUNCTIONS ///////////////////////////////////////////////////////
  // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor

  let playerImages = [];
  playerImages.push(new Image());
  playerImages[0].src = "assets/dino/1.png";

  playerImages.push(new Image());
  playerImages[1].src = "assets/dino/2.png";

  playerImages.push(new Image());
  playerImages[2].src = "assets/dino/3.png";

  playerImages.push(new Image());
  playerImages[3].src = "assets/dino/4.png";

  playerImages.push(new Image());
  playerImages[4].src = "assets/dino/5.png";

  playerImages.push(new Image());
  playerImages[5].src = "assets/dino/6.png";

  playerImages.push(new Image());
  playerImages[6].src = "assets/dino/7.png";

  playerImages.push(new Image());
  playerImages[7].src = "assets/dino/8.png";

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
    mazectx.imageSmoothingEnabled = false;
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
            ((5 / 4) * maze.size) / maze.rows,
            maze.size / maze.rows / 8
          );
        }
        if (maze.grid[r][c].walls.bottomWall) {
          mazectx.beginPath();
          mazectx.drawImage(
            bottomWallImage,
            x - maze.size / maze.rows / 8,
            y + (7 / 8) * (maze.size / maze.rows),
            ((5 / 4) * maze.size) / maze.rows,
            maze.size / maze.rows / 8
          );
        }
      }
    }
    for (let r = 0; r < maze.rows; r++) {
      for (let c = 0; c < maze.columns; c++) {
        let x = (c * maze.size) / maze.columns;
        let y = (r * maze.size) / maze.rows;
        if (maze.grid[r][c].walls.rightWall) {
          mazectx.beginPath();
          mazectx.drawImage(
            rightWallImage,
            x + (7 / 8) * (maze.size / maze.rows),
            y - maze.size / maze.rows / 8,
            maze.size / maze.rows / 8,
            ((5 / 4) * maze.size) / maze.rows
          );
        }
        if (maze.grid[r][c].walls.leftWall) {
          mazectx.beginPath();
          mazectx.drawImage(
            leftWallImage,
            x,
            y - maze.size / maze.rows / 8,
            maze.size / maze.rows / 8,
            ((5 / 4) * maze.size) / maze.rows
          );
        }
        if (maze.grid[r][c].goal) {
          mazectx.fillStyle = "yellow";
          mazectx.fillRect(
            x + maze.size / maze.rows / 4,
            y + maze.size / maze.rows / 4,
            ((2 / 4) * maze.size) / maze.columns,
            ((2 / 4) * maze.size) / maze.rows
          );
        }
      }
    }
  }

  ////////////////////////////////////////////////////////// PLAYER FUNCTIONS ////////////////////////////////////////////////////////

  function drawPlayer(player) {
    let playerCanvas = document.getElementById("player-canvas");
    let playerctx = playerCanvas.getContext("2d");

    playerCanvas.width = player.maze.width;
    playerCanvas.height = player.maze.height;
    playerctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    playerctx.beginPath();
    playerctx.imageSmoothingEnabled = false;
    playerctx.drawImage(
      playerImages[0],
      Math.floor(player.x - player.maze.height / player.maze.rows / 4),
      Math.floor(player.y - player.maze.height / player.maze.rows / 4),
      Math.floor(player.maze.width / player.maze.rows / 2),
      Math.floor(player.maze.width / player.maze.rows / 2)
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
