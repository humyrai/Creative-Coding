let angle = 0;
let scalar = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();
}

function draw() {
  translate(width / 2, height / 2);
  let radius = scalar * angle;
  let x = radius * cos(angle);
  let y = radius * sin(angle);
  ellipse(x, y, 5, 5);
  angle += 0.1;
  scalar += 0.005;

  if (radius > max(width, height) / 2) {
    background(0);
    angle = 0;
    scalar = 5;
  }
}
