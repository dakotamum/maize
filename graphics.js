MazeGame.graphics = (function () {
  //////////////////////////////////////////////////////// MAZE FUNCTIONS ///////////////////////////////////////////////////////

  // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor
  function drawTopWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }

  function drawRightWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  function drawBottomWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  function drawLeftWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }

  // Draws each of the cells on the maze canvas
  function drawMaze(maze) {
    // Initialize the canvas
    let mazeCanvas = document.getElementById("maze-canvas");
    let ctx = mazeCanvas.getContext("2d");
    for (let r = 0; r < maze.rows; r++) {
      for (let c = 0; c < maze.columns; c++) {
        let x = (c * maze.size) / maze.columns;
        let y = (r * maze.size) / maze.rows;
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        if (maze.grid[r][c].walls.topWall)
          drawTopWall(x, y, maze.size, maze.columns, maze.rows);
        if (maze.grid[r][c].walls.rightWall)
          drawRightWall(x, y, maze.size, maze.columns, maze.rows, ctx);
        if (maze.grid[r][c].walls.bottomWall)
          drawBottomWall(x, y, maze.size, maze.columns, maze.rows);
        if (maze.grid[r][c].walls.leftWall)
          drawLeftWall(x, y, maze.size, maze.columns, maze.rows);
        if (maze.grid[r][c].goal) {
          ctx.fillStyle = "rgb(83, 247, 43)";
          ctx.fillRect(
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
    const canvas = document.getElementById("player-canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); // begin drawing on screen
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = player.color;
    ctx.fill();
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let api = {
    drawMaze: drawMaze,
    drawPlayer: drawPlayer,
  };

  return api;
})();
