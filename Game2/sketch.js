// Pop the Bubbles Dodging Game
// Enzo Batuigas

let character;
let bubbles = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  character = new Character();

  // Spawn bubbles every second
  setInterval(spawnBubble, 1000);
}

function draw() {
  background("black");

  if (!gameOver) {
    character.display();
    character.move(); // Update character's position

    moveBubblesWithNoise();
    displayBubbles();

    // Check collision with bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (character.hits(bubbles[i])) {
        gameOver = true;
      }
    }
    textFont("Comic Sans MS");
    textSize(20);
    text("Score: " + score, 30, 30);
  } else {
    fill("white")
    textFont("Comic Sans MS");
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    text("Your score was: " + score, width / 2, height / 2 + 40);
    text("Press SPACE to play again", width / 2, height / 2 + 80);
  }
}

function mousePressed() {
  // Check if clicked inside a bubble
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      score++; // Increment score
      bubbles.splice(i, 1); // Remove the clicked bubble
    }
  }
}

function keyPressed() {
  // Reset the game when spacebar is pressed
  if (gameOver && keyCode === 32) {
    resetGame();
  }
}

function moveBubblesWithNoise() {
  for (let bubble of bubbles) {
    // Move bubbles using noise
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    bubble.x = x;
    bubble.y = y;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function displayBubbles() {
  for (let bubble of bubbles) {
    bubble.display();
  }
}

function spawnBubble() {
  let bubble = new Bubble(random(width), random(height));
  bubbles.push(bubble);
}

function resetGame() {
  bubbles = [];
  score = 0;
  gameOver = false;
  character.x = width / 2;
  character.y = height / 2;
}

class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 20;
    this.speed = 2;
  }

  display() {
    fill("purple"); // character color and size
    ellipse(this.x, this.y, this.size);
  }

  move() {
    // Character movement based on arrow keys
    if (keyIsDown(65)) { //left
      this.x -= this.speed;
    } else if (keyIsDown(68)) { //right
      this.x += this.speed;
    } else if (keyIsDown(87)) { //up
      this.y -= this.speed;
    } else if (keyIsDown(83)) { //down
      this.y += this.speed;
    }

    // Keep character within canvas bounds
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  hits(bubble) {
    let distance = dist(this.x, this.y, bubble.x, bubble.y);
    let minDistance = this.size / 2 + bubble.size / 2;
    return distance < minDistance;
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 50);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.alpha = random(100, 200);
    this.timeX = random(1000000);
    this.timeY = random(1000000);
    this.deltaTime = 0.002;
  }

  display() {
    fill(this.r, this.g, this.b, this.alpha);
    ellipse(this.x, this.y, this.size);  
  }

  contains(x, y) {
    let distance = dist(x, y, this.x, this.y);
    return distance < this.size / 2;
  }
}
