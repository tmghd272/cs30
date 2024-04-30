// Character In 2D Grid
// Enzo Batuigas
// Apr 15, 2024

let grid;
let cellSize;
const GRID_SIZE = 15;
const PLAYER = 10;
const WALL = 1;
const GOAL = 2;
let player = {
  x: 0,
  y: 0,
};
let character;
let state = "start screen";

function preload() {
  character = loadImage("Assets/Images/player.png");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);
  }

  generateMaze(GRID_SIZE, GRID_SIZE);

  cellSize = height / grid.length;
}

function draw() {
  if (state === "start screen") {
    // Draw start screen
  } else if (state === "game") {
    background(220);
    displayGrid();
  }
}

function keyPressed() {
  if (state !== "game") return;

  let newX = player.x;
  let newY = player.y;

  if (keyIsDown(UP_ARROW)) {
    newY -= 1;
  }
  if (keyIsDown(DOWN_ARROW)) {
    newY += 1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    newX += 1;
  }
  if (keyIsDown(LEFT_ARROW)) {
    newX -= 1;
  }

  if (isValidMove(newX, newY)) {
    movePlayer(newX, newY);
  }
}

function movePlayer(x, y) {
  player.x = x;
  player.y = y;

  if (grid[y][x] === GOAL) {
    // Player reached the goal, you can add win state logic here.
  }
}

function isValidMove(x, y) {
  return (
    x >= 0 &&
    y >= 0 &&
    x < GRID_SIZE &&
    y < GRID_SIZE &&
    grid[y][x] !== WALL
  );
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === WALL) {
        // Draw wall
      } else if (grid[y][x] === PLAYER) {
        // Draw player
        image(character, x * cellSize, y * cellSize, cellSize, cellSize);
      } else if (grid[y][x] === GOAL) {
        // Draw goal
      } else {
        // Draw open tile
      }
    }
  }
}

function generateMaze(cols, rows) {
  grid = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push(WALL);
    }
    grid.push(row);
  }

  for (let y = 1; y < rows - 1; y += 2) {
    for (let x = 1; x < cols - 1; x += 2) {
      grid[y][x] = 0;
    }
  }

  player.x = 0;
  player.y = 0;

  grid[rows - 1][cols - 1] = GOAL;
}