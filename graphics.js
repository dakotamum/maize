MazeGame.graphics = (function () {
  //////////////////////////////////////////////////////// MAZE FUNCTIONS ///////////////////////////////////////////////////////
  // const playerCanvas = document.getElementById("player-canvas");
  // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor

  // Draws each of the cells on the maze canvas
  function drawMaze(maze) {
    // Initialize the canvas

    let mazeCanvas = document.getElementById("maze-canvas");
    let mazectx = mazeCanvas.getContext("2d");
    mazeCanvas.height = maze.size;
    mazeCanvas.width = maze.size;
    mazectx.strokeStyle = "black";
    console.log("yo!");
    for (let r = 0; r < maze.rows; r++) {
      for (let c = 0; c < maze.columns; c++) {
        let x = (c * maze.size) / maze.columns;
        let y = (r * maze.size) / maze.rows;
        if (maze.grid[r][c].walls.topWall)
        {
          mazectx.beginPath();
          mazectx.moveTo(x, y);
          mazectx.lineTo(x + maze.size / maze.columns, y);
          mazectx.stroke();
        }
        if (maze.grid[r][c].walls.rightWall)
        {
          mazectx.beginPath();
          mazectx.moveTo(x + maze.size / maze.columns, y);
          mazectx.lineTo(x + maze.size / maze.columns, y + maze.size / maze.rows);
          mazectx.stroke();
        }
        if (maze.grid[r][c].walls.bottomWall)
        {
          mazectx.beginPath();
          mazectx.moveTo(x, y + maze.size / maze.rows);
          mazectx.lineTo(x + maze.size / maze.columns, y + maze.size / maze.rows);
          mazectx.stroke();
        }
        if (maze.grid[r][c].walls.leftWall)
        {
          mazectx.beginPath();
          mazectx.moveTo(x, y);
          mazectx.lineTo(x, y + maze.size / maze.rows);
          mazectx.stroke();
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

    playerCanvas.width = window.innerWidth;
    playerCanvas.height = window.innerHeight;
    playerctx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    playerctx.beginPath(); // begin drawing on screen
    playerctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2, false);
    playerctx.fillStyle = player.color;
    playerctx.fill();
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let api = {
    drawMaze: drawMaze,
    drawPlayer: drawPlayer,
  };

  return api;
})();
