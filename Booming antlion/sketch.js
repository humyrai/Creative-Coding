let particles = [];
let numParticles = 100;
let angle = 0;
let discoTimer = 0;
let discoInterval = 500; // Interval for color change (in milliseconds)

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Enable WebGL mode
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  
  // Draw spinning transparent sphere in the center
  push();
  translate(0, 0);
  rotateY(angle);
  let sphereColor = color(random(255), random(255), random(255), 100); // Random color with alpha value (transparency)
  fill(sphereColor);
  sphere(100);
  pop();
  angle += 0.01;

  // Disco light effect for the sphere
  if (millis() - discoTimer > discoInterval) {
    let discoColor = color(random(255), random(255), random(255), 100); // Random color with alpha value (transparency)
    fill(discoColor);
    discoTimer = millis();
  }

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

function mouseMoved() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let attractionForce = createVector(mouseX, mouseY).sub(p.pos).mult(0.01);
    p.applyForce(attractionForce);
  }
}

function mouseClicked() {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let distance = dist(mouseX, mouseY, p.pos.x, p.pos.y);
    if (distance < 10) { // Check if mouse is within 10 pixels of particle
      p.changeColor();
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
    this.color = color(random(255), random(255), random(255));
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
}
