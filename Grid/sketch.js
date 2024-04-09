// 2D Grid
// Enzo Batuigas
// Apr 9, 2024



// let grid = [[1, 0, 0, 1],
// ____________[0, 1, 0, 1],
// ____________[0, 0, 0, 1],
// ____________[1, 1, 0, 0],
// ____________[1, 0, 1, 1],
// ____________[0, 0, 0, 1]];

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = height/grid.length;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 4; x++) {
      if (grid[y][x] === 1) {
        fill("black")
      }
      else (grid[y][x] === 1) {
        fill("white")
      }

    }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}