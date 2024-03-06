// // Project Title
// // Your Name
// // Date
// //
// // Extra for Experts:
// // - describe what you did to take this project "above and beyond"


// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(220);
//   circle(mouseX, mouseY, 50)
// }

// Traffic Light 

let state = "red";
let lastTimeSwitched = 0;
let redDuration = 2000;
let yellowDuration = 500;
let greenDuration = 2500;

function setup() {
  createCanvas(100, 300);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  determineState();
  drawCorrectLight();
}

function determineState() {
  if (state === "red" && millis() > lastTimeSwitched + redDuration) {
    lastTimeSwitched = millis();
    state = "green";
  }
  else if (state === "green" && millis() > lastTimeSwitched + greenDuration) {
    lastTimeSwitched = millis();
    state = "yellow";
  }
  else if (state === "yellow" && millis() > lastTimeSwitched + yellowDuration) {
    lastTimeSwitched = millis();
    state = "red";
  }
}

function drawCorrectLight() {
  if (state === "green") {
    drawGreenLight();
  }
  else if (state === "yellow") {
    drawYellowLight();
  }
  else if (state === "red") {
    drawRedLight();
  }
}

function drawGreenLight() {
  fill("green");
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
  console.log("GO!");
}

function drawYellowLight() {
  fill("yellow");
  ellipse(width / 2, height / 2, 50, 50); //middle
  console.log("lol");
}

function drawRedLight() {
  fill("red");
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  console.log("STOP!");
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  ellipse(width / 2, height / 2, 50, 50); //middle
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}