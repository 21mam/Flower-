let petals = [];
let bloomProgress = 0;
let stemHeight = 0;
let fireflies = [];
let butterflies = [];
let grassBlades = [];
let redFlowers = [];
let purpleFlowers = []; // New: Purple flowers
let yellowFlowers = []; // New: Yellow flowers
let garden; // Garden object

function setup() {
  createCanvas(600, 600);
  
  // Generate petal positions (5 petals for each flower)
  for (let i = 0; i < 5; i++) {
    petals.push(new Petal(i * TWO_PI / 5));
  }

  // Generate fireflies
  for (let i = 0; i < 10; i++) {
    fireflies.push(new Firefly());
  }

  // Generate butterflies
  for (let i = 0; i < 5; i++) {
    butterflies.push(new Butterfly());
  }

  // Generate grass blades
  for (let i = 0; i < 50; i++) {
    grassBlades.push(new GrassBlade(random(width), height - random(50)));
  }

  // Generate red flowers at fixed positions
  for (let i = 0; i < 3; i++) {
    redFlowers.push(new RedFlower(random(-200, 200), random(100, 300)));
  }

  // Generate purple flowers
  for (let i = 0; i < 3; i++) {
    purpleFlowers.push(new PurpleFlower(random(-200, 200), random(100, 300)));
  }

  // Generate yellow flowers
  for (let i = 0; i < 3; i++) {
    yellowFlowers.push(new YellowFlower(random(-200, 200), random(100, 300)));
  }

  // Create the garden
  garden = new Garden();
}

function draw() {
  background(10, 10, 30);
  
  // Draw the garden
  garden.display();

  // Move origin to the center bottom
  translate(width / 2, height / 2 + 100);

  // Animate stem growth
  stemHeight = lerp(stemHeight, 150, 0.02);
  
  // Draw the stem
  stroke(30, 120, 50);
  strokeWeight(6);
  line(0, 0, 0, -stemHeight);

  // Draw leaves on the stem
  drawLeaves();

  // Bloom effect over time
  bloomProgress = min(bloomProgress + 0.01, 1);

  // Draw petals (main flower)
  push();
  translate(0, -stemHeight);
  for (let petal of petals) {
    petal.show(bloomProgress);
  }
  pop();

  // Draw additional red flowers
  for (let flower of redFlowers) {
    flower.show();
  }

  // Draw additional purple flowers
  for (let flower of purpleFlowers) {
    flower.show();
  }

  // Draw additional yellow flowers
  for (let flower of yellowFlowers) {
    flower.show();
  }

  // Draw glowing fireflies
  for (let firefly of fireflies) {
    firefly.move();
    firefly.display();
  }

  // Draw butterflies
  for (let butterfly of butterflies) {
    butterfly.move();
    butterfly.display();
  }
}

// 🌸 Petal class for animation
class Petal {
  constructor(angle) {
    this.angle = angle;
  }

  show(progress) {
    push();
    rotate(this.angle);
    translate(0, -30);  // Move petals outward
    fill(255, 100, 150, 200); // Pink petals
    noStroke();
    
    // Animate blooming size
    let w = 30 * progress;
    let h = 60 * progress;
    
    ellipse(0, 0, w, h);
    pop();
  }
}

// ✨ Firefly class (glowing floating dots)
class Firefly {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.brightness = random(100, 255);
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  display() {
    fill(255, 255, 100, this.brightness);
    noStroke();
    ellipse(this.x, this.y, 5, 5);
  }
}

// 🦋 Butterfly class
class Butterfly {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2);
    this.angle = random(TWO_PI);
    this.speed = random(1, 2);
  }

  move() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.angle += random(-0.1, 0.1);
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 200, 100);
    noStroke();
    ellipse(0, 0, 20, 10); // Body
    fill(255, 150, 50, 150);
    ellipse(-10, -5, 15, 10); // Left wing
    ellipse(10, -5, 15, 10); // Right wing
    pop();
  }
}

// 🌿 Grass blade class
class GrassBlade {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = random(20, 50);
    this.color = color(30, random(100, 150), 50);
  }

  display() {
    stroke(this.color);
    strokeWeight(2);
    noFill();
    bezier(this.x, this.y, this.x - 10, this.y - this.height / 2, this.x + 10, this.y - this.height, this.x, this.y - this.height);
  }
}

// 🍃 Function to draw leaves on the stem
function drawLeaves() {
  fill(30, 120, 50);
  noStroke();
  ellipse(-20, -stemHeight / 2, 20, 10); // Left leaf
  ellipse(20, -stemHeight / 2, 20, 10); // Right leaf
}

// 🌺 Red Flower class
class RedFlower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bloomProgress = 0;
  }

  show() {
    this.bloomProgress = min(this.bloomProgress + 0.01, 1); // Smooth blooming
    push();
    translate(this.x, this.y);
    fill(255, 50, 50); // Red color
    noStroke();
    ellipse(0, 0, 30 * this.bloomProgress, 30 * this.bloomProgress); // Flower center
    for (let j = 0; j < 5; j++) {
      rotate(TWO_PI / 5);
      ellipse(0, -20 * this.bloomProgress, 20 * this.bloomProgress, 40 * this.bloomProgress); // Petals
    }
    pop();
  }
}

// 💜 Purple Flower class
class PurpleFlower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bloomProgress = 0;
  }

  show() {
    this.bloomProgress = min(this.bloomProgress + 0.01, 1); // Smooth blooming
    push();
    translate(this.x, this.y);
    fill(150, 50, 255); // Purple color
    noStroke();
    ellipse(0, 0, 30 * this.bloomProgress, 30 * this.bloomProgress); // Flower center
    for (let j = 0; j < 8; j++) { // 8 petals for a unique look
      rotate(TWO_PI / 8);
      ellipse(0, -20 * this.bloomProgress, 15 * this.bloomProgress, 30 * this.bloomProgress); // Petals
    }
    pop();
  }
}

// 💛 Yellow Flower class
class YellowFlower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bloomProgress = 0;
  }

  show() {
    this.bloomProgress = min(this.bloomProgress + 0.01, 1); // Smooth blooming
    push();
    translate(this.x, this.y);
    fill(255, 200, 50); // Yellow color
    noStroke();
    ellipse(0, 0, 30 * this.bloomProgress, 30 * this.bloomProgress); // Flower center
    for (let j = 0; j < 6; j++) { // 6 petals for a unique look
      rotate(TWO_PI / 6);
      ellipse(0, -20 * this.bloomProgress, 20 * this.bloomProgress, 40 * this.bloomProgress); // Petals
    }
    pop();
  }
}

// 🌳 Garden class
class Garden {
  constructor() {
    this.trees = [];
    this.bushes = [];
    this.flowers = [];

    // Add trees
    for (let i = 0; i < 3; i++) {
      this.trees.push(new Tree(random(width), height - random(50, 100)));
    }

    // Add bushes
    for (let i = 0; i < 5; i++) {
      this.bushes.push(new Bush(random(width), height - random(20, 50)));
    }

    // Add flowers
    for (let i = 0; i < 10; i++) {
      this.flowers.push(new Flower(random(width), height - random(50)));
    }
  }

  display() {
    // Draw grass
    for (let blade of grassBlades) {
      blade.display();
    }

    // Draw trees
    for (let tree of this.trees) {
      tree.display();
    }

    // Draw bushes
    for (let bush of this.bushes) {
      bush.display();
    }

    // Draw flowers
    for (let flower of this.flowers) {
      flower.display();
    }
  }
}

// 🌳 Tree class
class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = random(100, 150);
    this.trunkWidth = random(10, 20);
    this.leafColor = color(random(50, 100), random(150, 200), random(50, 100));
  }

  display() {
    // Draw trunk
    fill(100, 50, 20);
    noStroke();
    rect(this.x - this.trunkWidth / 2, this.y - this.height, this.trunkWidth, this.height);

    // Draw leaves
    fill(this.leafColor);
    ellipse(this.x, this.y - this.height, 50, 50);
  }
}

// 🌿 Bush class
class Bush {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 50);
    this.color = color(random(50, 100), random(150, 200), random(50, 100));
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}

// 🌼 Flower class
class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(random(255), random(255), random(255));
    this.size = random(10, 20);
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}