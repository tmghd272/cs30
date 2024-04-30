// Character In 2D Grid
// Enzo Batuigas
// Apr 15, 2024

let grid;
let cellSize;
const GRID_SIZE = 15;
const PLAYER = 10;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
let player = {
  x: 0,
  y: 0,
};
let grassImg;
let pavingImg;
let character;
let backgroundMusic;
let cantWalkSound;
let state = "start screen";

function preload() {
  grassImg = loadImage("Assets/Images/grass.png");
  pavingImg = loadImage("Assets/Images/cobblestone.png");
  character = loadImage("Assets/Images/player.png");
  backgroundMusic = loadSound("Assets/Sounds/theme.wav");
  cantWalkSound = loadSound("Assets/Sounds/barrier.wav");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);
  }

  grid = generateRandomMaze(GRID_SIZE, GRID_SIZE);
  cellSize = height / grid.length;

  grid[player.y][player.x] = PLAYER;

  backgroundMusic.setVolume(0.4);
  cantWalkSound.setVolume(1.0);
}

function draw() {
  if (state === "start screen") {
    background("#522796");
    fill('white');
    textFont('Comic Sans MS', 35)
    textAlign(CENTER, CENTER);
    text('welcome press spacebar', 350, 350);
  } else if (state === "game") {
    background(220);
    displayGrid();
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === IMPASSIBLE) {
        image(grassImg, x * cellSize, y * cellSize, cellSize, cellSize);
      } else if (grid[y][x] === OPEN_TILE) {
        image(pavingImg, x * cellSize, y * cellSize, cellSize, cellSize);
      } else if (grid[y][x] === PLAYER) {
        image(character, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function generateRandomMaze(cols, rows) {
  let maze = [];
  for (let y = 0; y < rows; y++) {
    maze.push([]);
    for (let x = 0; x < cols; x++) {
      if (x % 2 !== 0 && y % 2 !== 0) {
        maze[y][x] = OPEN_TILE;
      } else {
        maze[y][x] = IMPASSIBLE;
      }
    }
  }
  return maze;
}