MazeGame.graphics = (function () {
  //////////////////////////////////////////////////////// MAZE FUNCTIONS ///////////////////////////////////////////////////////

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
          maze.grid[r][c].drawTopWall(x, y, maze.size, maze.columns, maze.rows);
        if (maze.grid[r][c].walls.rightWall)
          maze.grid[r][c].drawRightWall(
            x,
            y,
            maze.size,
            maze.columns,
            maze.rows
          );
        if (maze.grid[r][c].walls.bottomWall)
          maze.grid[r][c].drawBottomWall(
            x,
            y,
            maze.size,
            maze.columns,
            maze.rows
          );
        if (maze.grid[r][c].walls.leftWall)
          maze.grid[r][c].drawLeftWall(
            x,
            y,
            maze.size,
            maze.columns,
            maze.rows
          );
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
