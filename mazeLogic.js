// Taken from a YouTube tutorial
// DEPTH FIRST SEARCH MAZE IMPLEMENTATION IN JAVASCRIPT BY CONOR BAILEY

// Initialize the canvas
// let maze = document.getElementById("maze-canvas");
// let ctx = maze.getContext("2d");

function mazeTemplate(size, rows, columns) {
  let that = {};
  that.generationComplete = false;
  that.current;
  that.grid = [];
  that.stack = [];
  that.size = size;
  that.rows = rows;
  that.columns = columns;
  that.height = size
  that.width = size

  // Set the grid: Create new this.grid array based on number of instance rows and columns
  function setup() {
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
        // Create a new instance of the Cell class for each element in the 2D array and push to the maze grid array
        let cell = new Cell(r, c, that.grid, size);
        row.push(cell);
      }
      that.grid.push(row);
    }
    // Set the starting grid
    that.current = that.grid[0][0];
    that.grid[rows - 1][columns - 1].goal = true;
  }
  // Draw the canvas by setting the size and placing the cells in the grid array on the canvas.
  function generate() {
    // Set the first cell as visited
    that.current.visited = true;
    // This function will assign the variable 'next' to random cell out of the current cells available neighbouting cells
    let next = that.current.checkNeighbours();
    // If there is a non visited neighbour cell
    if (next) {
      next.visited = true;
      // Add the current cell to the stack for backtracking
      that.stack.push(that.current);
      // This function compares the current cell to the next cell and removes the relevant walls for each cell
      that.current.removeWalls(that.current, next);
      // Set the nect cell to the current cell
      that.current = next;

      // Else if there are no available neighbours start backtracking using the stack
    } else if (that.stack.length > 0) {
      let cell = that.stack.pop();
      that.current = cell;
    }
    // If no more items in the stack then all cells have been visted and the function can be exited
    if (that.stack.length === 0) {
      that.generationComplete = true;
      return;
    }
    // Recursively call the generate function. This will be called up until the stack is empty
    generate();
  }
  that.initialize = function() {
    setup();
    generate();
  }
  return that;
};

class Cell {
  // Constructor takes in the rowNum and colNum which will be used as coordinates to draw on the canvas.
  constructor(rowNum, colNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
    this.goal = false;
    // parentGrid is passed in to enable the checkneighbours method.
    // parentSize is passed in to set the size of each cell on the grid
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
  }

  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    // The following lines push all available neighbours to the neighbours array
    // undefined is returned where the index is out of bounds (edge cases)
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    // if the following are not 'undefined' then push them to the neighbours array
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    // Choose a random neighbour from the neighbours array
    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }

  removeWalls(cell1, cell2) {
    // compares to two cells on x axis
    let x = cell1.colNum - cell2.colNum;
    // Removes the relevant walls if there is a different on x axis
    if (x === 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x === -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }
    // compares to two cells on x axis
    let y = cell1.rowNum - cell2.rowNum;
    // Removes the relevant walls if there is a different on x axis
    if (y === 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y === -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }
}
