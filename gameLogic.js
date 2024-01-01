/*
TODO:
  - scoring, options, all that
*/

MazeGame.main = (function (graphics) {
  let start = {};
  ("use strict");

  let lastFrameTime = performance.now();
  let dim = Array.from(document.getElementsByName("maze-dimensions")).find(
    (radio) => radio.checked
  ).value;
  console.log(dim);
  let maze = new Maze(512, dim, dim);
  maze.initialize();
  let cellSize = Math.floor(maze.size / maze.rows);
  let player = new Player(
    cellSize / 2,
    cellSize / 2,
    cellSize / 3,
    "magenta",
    maze
  );

  function render() {
    graphics.drawPlayer(player);
  }

  function update(delta) {
    player.update(delta);
  }

  function gameLoop() {
    let currentTime = performance.now();
    let delta = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    update(delta, player);
    render();
    requestAnimationFrame(gameLoop);
  }

  start.initialize = function () {
    graphics.drawMaze(maze);
    requestAnimationFrame(gameLoop);
  };

  return start;
})(MazeGame.graphics);
