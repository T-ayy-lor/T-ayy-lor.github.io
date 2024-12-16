let tree;
let attractionDistance = 100;
let killDistance = 10;

function setup() {
  createCanvas(500, 500);
  tree = new Tree();
}

function draw() {
  background(240);
  tree.show();
  tree.grow();
}


