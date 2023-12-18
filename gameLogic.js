MazeGame.main = (function (graphics) {
  let start = {};
  ("use strict");
  let hi = "hi";
  start.initialize = function () {
    console.log("Pretenting to initialize!");
    graphics.helloWold();
  };
  return start;
})(MazeGame.graphics);
