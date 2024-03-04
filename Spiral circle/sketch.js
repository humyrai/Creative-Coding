let angle = 0;
let scalar = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
}

function draw() {
  translate(width / 2, height / 2);
  let radius = scalar * angle;
  let x = radius * cos(angle);
  let y = radius * sin(angle);
  
  // Define gradient colors and positions
  let c1 = color(110, 68, 255);
  let c2 = color(255, 144, 117);
  let interpColor = lerpColor(c1, c2, angle / (4 * PI)); // Interpolated color
  
  // Draw circle with gradient fill
  fill(interpColor);
  ellipse(x, y, 10, 10);
  
  angle += 0.1;
  scalar += 0.005;

  if (radius > max(width, height) / 2) {
    background(0);
    angle = 0;
    scalar = 5;
  }
}
