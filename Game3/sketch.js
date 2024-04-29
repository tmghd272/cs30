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
Number(prompt("HELLO", ""));

function preload() {
  grassImg = loadImage("Assets/Images/grass.png");
  pavingImg = loadImage("Assets/Images/cobblestone.png");
  character = loadImage("Assets/Images/player.png");
  backgroundMusic = loadSound("Assets/Sounds/theme.wav");
  cantWalkSound = loadSound("Assets/Sounds/barrier.wav");
}


function setup() {
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  //if randomizing the grid, do this:
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //this is dumb -- should check if this is the right size!
  cellSize = height/grid.length;

  //add player to the grid
  grid[player.y][player.x] = PLAYER;

  //texture or image size.


  //equalize my sounds
  backgroundMusic.setVolume(0.4);
  cantWalkSound.setVolume(1.0);
}

function windowResized() {
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }

  cellSize = height/grid.length;
}

function draw() {
  if (state === "start screen") {
    background("#522796"); 
    fill('white');
    textFont('Comic Sans MS', 35)
    textAlign(CENTER, CENTER);
    text('welcome press spacebar', 350, 350);
    
  }
  else if (state === "game") {
    background(220);
    displayGrid();
  }
}

function keyPressed() {
  if (keyIsDown === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (keyIsDown === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if (keyIsDown(87)) {   //up
    movePlayer(player.x + 0, player.y - 1); //0 on x axis, -1 on y axis
  }

  if (keyIsDown(83)) {   //down
    movePlayer(player.x + 0, player.y + 1); //0 on x axis, 1 on y axis
  }

  if (keyIsDown(68)) {   //right
    movePlayer(player.x + 1, player.y + 0); //1 on x axis, 0 on y axis
  }

  if (keyIsDown(65)) {   //left
    movePlayer(player.x - 1, player.y + 0); //-1 on x axis, 0 on y axis
  }

  if (key === " " && state === "start screen") {
    state = "game";
    backgroundMusic.loop();
  }
}

function movePlayer(x, y) {
  //don't move off the grid, and only move into open tiles
  if (x < GRID_SIZE && y < GRID_SIZE &&
      x >= 0 && y >= 0 && grid[y][x] === OPEN_TILE) {
      //previous player location
      let oldX = player.x;
      let oldY = player.y;

      //move the player
      player.x = x;
      player.y = y;

      //reset old location to be an empty tile
      grid[oldY][oldX] = OPEN_TILE;

      //move the player to the new spot
      grid[player.y][player.x] = PLAYER;
  }
  else {
    cantWalkSound.play();
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  // make sure the cell you're toggling is in the grid...
  if (x < GRID_SIZE && y < GRID_SIZE &&
      x >= 0 && y >= 0) {
    //toggle the color of the cell
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === IMPASSIBLE) {
        // fill("black");
        image(grassImg, x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        // fill("white");
        image(pavingImg, x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER) {
        // fill("red");
        square(character, x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      //half the time, be a 1. Other half, be a 0.
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function generateEmptyGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}