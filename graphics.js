MazeGame.graphics = (function () {
  //////////////////////////////////////////////////////// MAZE FUNCTIONS ///////////////////////////////////////////////////////
  // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor

  let playerRightImages = [];
  let playerLeftImages = [];

  playerRightImages.push(new Image());
  playerRightImages[0].src = "assets/dino/right/1.png";

  playerRightImages.push(new Image());
  playerRightImages[1].src = "assets/dino/right/2.png";

  playerRightImages.push(new Image());
  playerRightImages[2].src = "assets/dino/right/3.png";

  playerRightImages.push(new Image());
  playerRightImages[3].src = "assets/dino/right/4.png";

  playerRightImages.push(new Image());
  playerRightImages[4].src = "assets/dino/right/5.png";

  playerRightImages.push(new Image());
  playerRightImages[5].src = "assets/dino/right/6.png";

  playerRightImages.push(new Image());
  playerRightImages[6].src = "assets/dino/right/7.png";

  playerRightImages.push(new Image());
  playerRightImages[7].src = "assets/dino/right/8.png";

  playerLeftImages.push(new Image());
  playerLeftImages[0].src = "assets/dino/left/1.png";

  playerLeftImages.push(new Image());
  playerLeftImages[1].src = "assets/dino/left/2.png";

  playerLeftImages.push(new Image());
  playerLeftImages[2].src = "assets/dino/left/3.png";

  playerLeftImages.push(new Image());
  playerLeftImages[3].src = "assets/dino/left/4.png";

  playerLeftImages.push(new Image());
  playerLeftImages[4].src = "assets/dino/left/5.png";

  playerLeftImages.push(new Image());
  playerLeftImages[5].src = "assets/dino/left/6.png";

  playerLeftImages.push(new Image());
  playerLeftImages[6].src = "assets/dino/left/7.png";

  playerLeftImages.push(new Image());
  playerLeftImages[7].src = "assets/dino/left/8.png";

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

    // determine which image to use based on how much further the player has to go compared to the distance between cells
    let toGoRatio = player.distToGo / (player.maze.size / player.maze.rows);
    let selectedImageNum = 0;
    let selectedImage;
    let imageChunk = 1.0 / 8.0;

    console.log(toGoRatio);

    if (toGoRatio > imageChunk && toGoRatio <= imageChunk * 2)
      selectedImageNum = 1;
    else if (toGoRatio >= imageChunk * 2 && toGoRatio < imageChunk * 3)
      selectedImageNum = 2;
    else if (toGoRatio >= imageChunk * 3 && toGoRatio < imageChunk * 4)
      selectedImageNum = 3;
    else if (toGoRatio >= imageChunk * 4 && toGoRatio < imageChunk * 5)
      selectedImageNum = 4;
    else if (toGoRatio >= imageChunk * 5 && toGoRatio < imageChunk * 6)
      selectedImageNum = 5;
    else if (toGoRatio >= imageChunk * 6 && toGoRatio < imageChunk * 7)
      selectedImageNum = 6;
    else if (toGoRatio >= imageChunk * 7 && toGoRatio < imageChunk * 8)
      selectedImageNum = 7;

    if (player.goingLeft) selectedImage = playerLeftImages[selectedImageNum];
    else selectedImage = playerRightImages[selectedImageNum];

    playerCanvas.width = player.maze.width;
    playerCanvas.height = player.maze.height;
    playerctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    playerctx.beginPath();
    playerctx.imageSmoothingEnabled = false;
    playerctx.drawImage(
      selectedImage,
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
