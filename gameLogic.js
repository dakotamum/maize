/*
TODO:
  - separate wall drawing logic into graphics
  - fix bug where player starts drifing into walls as they get further in the maze
  - make movement continuous when direction key is pressed
  - scoring, options, all that
  - artistic liberties, i.e character design, maze textures
*/

MazeGame.main = (function (graphics) {
  let start = {};
  ("use strict");

  let lastFrameTime = performance.now();

  let maze = new Maze(512, 8, 8);
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
