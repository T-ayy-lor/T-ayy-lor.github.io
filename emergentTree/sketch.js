let tree;
let attractionDistance = 500;
let killDistance = 5;
let frames = 360;
let options = {
  units: "frames"
}

function setup() {
  createCanvas(800, 800);
  tree = new Tree();
}

function draw() {
  background(0);
  tree.show();
  tree.grow();
}

function updateCanvasScale() {
  // use the available width to calculate the scale factor.
  const nativeWidth = 600;
  const availableWidth = window.innerWidth;
  const scaleFactor = availableWidth / nativeWidth;

  // scale
  const container = document.getElementById('p5parent');
  container.style.width = nativeWidth + 'px';
  container.style.height = 'auto';
  container.style.transformOrigin = 'top left';
  container.style.transform = `scale(${scaleFactor})`;
}
