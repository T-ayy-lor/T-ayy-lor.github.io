let walker;

function setup() {
  createCanvas(400, 400);
  walker = new Walker();
  background(0);
}

function draw() {
  walker.step();
  walker.show();
}
