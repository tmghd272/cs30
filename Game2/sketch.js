// Bubbles Dodging Game
// Enzo Batuigas

let character;
let obstacles = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  character = new Character();

  setInterval(spawnObstacle, 1000);
}

function draw() {
  background("gray");

  if (!gameOver) {
    character.display();
    character.move();

    moveObstaclesWithNoise();
    displayObstacles();
    
    for (let i = obstacles.length - 1; i >= 0; i--) {
      if (character.hits(obstacles[i])) {
        gameOver = true;
      }
    }

    textSize(20);
    text("Score: " + score, 10, 30);
  } else {
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    text("Your score was: " + score, width / 2, height / 2 + 40);
  }
}

function mousePressed() {
  character.moveTo(mouseX, mouseY);
}
