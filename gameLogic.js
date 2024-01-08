/*
TODO:
  - scoring, options, all that
*/

MazeGame.main = (function (graphics) {
  ("use strict");
  let start = {};

  let lastFrameTime = performance.now();
  let dim = Array.from(document.getElementsByName("maze-dimensions")).find(
    (radio) => radio.checked
  ).value;

  function handleDimensionsOptionChange(event) {
    dim = event.target.value;
  }

  let option4by4 = document.getElementById("4x4");
  let option8by8 = document.getElementById("8x8");
  let option16by16 = document.getElementById("16x16");
  let option32by32 = document.getElementById("32x32");

  option4by4.addEventListener("change", handleDimensionsOptionChange);
  option8by8.addEventListener("change", handleDimensionsOptionChange);
  option16by16.addEventListener("change", handleDimensionsOptionChange);
  option32by32.addEventListener("change", handleDimensionsOptionChange);

  let maze;
  let player;
  let cellSize;

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
    maze = new Maze(512, dim, dim);
    maze.initialize();
    cellSize = Math.floor(maze.size / maze.rows);
    player = new Player(
      cellSize / 2,
      cellSize / 2,
      cellSize / 3,
      "magenta",
      maze
    );
    graphics.drawMaze(maze);
    requestAnimationFrame(gameLoop);
  };

  return start;
})(MazeGame.graphics);
