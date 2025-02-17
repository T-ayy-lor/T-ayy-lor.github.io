let points = [];
let numPoints = 500;
let qt;
let aabb;
let queryRange = null;
let foundPoints = [];

function setup() {
  createCanvas(400, 400);
  aabb = new AABB(0, 0, width, height);
  qt = new QuadTree(aabb, 4);
  

  for (let i = 0; i < numPoints; i++) {
    let pos = p5.Vector.random2D();
    pos.mult(random(width / 2.5));
    pos.x += width / 2;
    pos.y += height / 2;
    points.push(pos);
    qt.insert(pos);
  }
}

function draw() {
  background(0);

  qt.show();

  fill(255);
  noStroke();
  for (let point of points) {
    ellipse(point.x, point.y, 3, 3);
  }

  if (queryRange) {
    stroke(0, 255, 0);
    strokeWeight(2);
    noFill();
    rect(queryRange.x, queryRange.y, queryRange.width, queryRange.height);
  }

  for (let point of foundPoints) {
    fill(0, 255, 0);
    noStroke();
    ellipse(point.x, point.y, 6, 6);
  }
}

function mouseClicked() {
  let querySize = 50;
  queryRange = new AABB(mouseX - querySize / 2, mouseY - querySize / 2, querySize, querySize);
  foundPoints = qt.query(queryRange);
}
