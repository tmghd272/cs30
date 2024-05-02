// Character In 2D Grid
// Enzo Batuigas
// Apr 15, 2024

// Character In 2D Grid (Maze Edition)
// Enzo Batuigas
// Apr 15, 2024

let grid;
let cellSize;
const GRID_SIZE = 15;
const PLAYER = 10;
const WALL = 1;
let player = {
  x: 0,
  y: 0,
};
let character;
let grassImg;
let pavingImg;
let backgroundMusic;
let cantWalkSound;
let state = "start screen";

function preload() {
  character = loadImage("Assets/Images/player.png");
  grassImg = loadImage("Assets/Images/grass.png");
  pavingImg = loadImage("Assets/Images/cobblestone.png");
  backgroundMusic = loadSound("Assets/Sounds/theme.wav");
  cantWalkSound = loadSound("Assets/Sounds/barrier.wav");
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
  // if (state === "start screen") {
  //   background("#522796");
  //   fill('white');
  //   textFont('Comic Sans MS', 35)
  //   textAlign(CENTER, CENTER);
  //   text('welcome press spacebar', 350, 350);
  // } else if (state === "game") {
    background(220);
    displayGrid();
  
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

  if (key === " " && state === "start screen") {
    state = "game";
    backgroundMusic.loop();
  }
}

function movePlayer(x, y) {
  player.x = x;
  player.y = y;

  if (grid[y][x] === WALL) {
    // If the player hits a wall, handle accordingly (e.g., play sound)
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
      }
    }
  }
}

function generateMaze(cols, rows) {
  grid = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      // Create outer walls
      if (x === 0 || y === 0 || x === cols - 1 || y === rows - 1) {
        row.push(WALL);
      } else {
        // Create maze structure
        row.push(PLAYER); // Placeholder for maze path
      }
    }
    grid.push(row);
  }

  // Set player position
  player.x = 1;
  player.y = 1;
}