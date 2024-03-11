//collide2d demo

let hit = false;

function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(255);
  rect(200, 200, 100, 150);
  circle(mouseX, mouseY, 100);

  hit = collideRectCircle(200, 200, 100, 150, mouseX, mouseY, 100);

  if (hit) {
    stroke("gray");
  }
  else {
    stroke("black");
  }

  console.log("colliding?", hit);
}

let x;
let y;
let dx;
let dy;
let radius = 30;
let r = 0;
let g = 255;
let b = 0;

function setup() {
  createCanvas(300, 300);
  x = width / 2;
  y = height / 2;
  dx = random(-5, 5);
  dy = random(-5, 5);
  changeCircleColour();
  noStroke();
}

function draw() {
  background(220);

  drawCircle();
  moveCircle();
  bounceOffWall();
}

function keyTyped() {
  if (key === " ") {
    dx = random(-5, 5);
    dy = random(-5, 5);
  }
  if (key === "c") {
    changeCircleColour();
  }
}

function drawCircle() {
  //display circle
  fill(r, g, b);
  circle(x, y, radius * 2);
}

function moveCircle() {
  //move circle
  x += dx;
  y += dy;
}

function bounceOffWall() {
  //bounce if needed
  if (x + radius >= width || x - radius <= 0) {
    dx = -1 * dx;
    changeCircleColour();
  }
  if (y + radius >= height || y - radius <= 0) {
    dy = -1 * dy;
    changeCircleColour();
  }
}

function changeCircleColour() {
  r = random(255);
  g = random(255);
  b = random(255);
}
