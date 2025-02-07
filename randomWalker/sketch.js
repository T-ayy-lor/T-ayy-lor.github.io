let walker;

function setup() {
  createCanvas(200, 200);
  walker = new Walker();
  background(0);
}

function draw() {
  walker.step();
  walker.show();
}
