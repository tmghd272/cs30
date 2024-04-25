//Dan Schellenberg

//2D Arrays Example - No Objects Used
//  - loading platformer level data
//  - WARNING: You do NOT want to have players/enemies as simply elements in a
//     grid, if you try to convert this into a functional game. They would move
//     in a really goofy way...
//  - tiles are from https://opengameart.org/content/platformer-art-deluxe

let tiles;
let levelBackground;
let platform, coin, theBox, fly, p1, slime, empty;
let tilesHigh, tilesWide;
let tileWidth, tileHeight;
let levelToLoad;
let lines;
let state = "start screen";
Number(prompt("HELLO", ""));

function preload() {
  //load level data
  levelToLoad = "assets/levels/1.txt";
  lines = loadStrings(levelToLoad);

  //load background
  levelBackground = loadImage("images/level.png");

  //load tile images
  platform = loadImage("images/platform.png");
  coin = loadImage("images/coin.png");
  theBox = loadImage("images/boxItem.png");
  fly = loadImage("images/flyFly1.png");
  p1 = loadImage("images/p1_front.png");
  slime = loadImage("images/slimeWalk1.png");
  empty = loadImage("images/empty.png");
}

function windowResized() {
    // keep this a 4:3 ratio, or it will stretch in weird ways
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
}

function setup() {
  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = windowWidth / tilesWide;
  tileHeight = windowHeight / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[y][x] = tileType;
    }
  }
}

function draw() {
  if (state === "start screen") {

    background("gray");
    fill('white');
    textFont('Courier New', 25)
    textAlign(CENTER, CENTER);
    text('welcome press spacebar', 450, 350);
    
  }
  else if (state === "game") {
    image(levelBackground, 0, 0, windowWidth, windowHeight);

    for (let y = 0; y < tilesHigh; y++) {
      for (let x = 0; x < tilesWide; x++) {
        showTile(tiles[y][x], x, y);
      }
    }
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
  }
}

function showTile(location, x, y) {
  if (location === "#") {
    image(platform, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "C") {
    image(coin, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "B") {
    image(theBox, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "F") {
    image(fly, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "P") {
    image(p1, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else if (location === "S") {
    image(slime, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
  else {
    image(empty, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
  }
}

function createEmpty2dArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      randomGrid[y].push(0);
    }
  }
  return randomGrid;
}
