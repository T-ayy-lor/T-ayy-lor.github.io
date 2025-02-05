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
  const nativeWidth = 800;
  const nativeHeight = 800;

  // Determine the scale factor based on the available viewport width.
  const availableWidth = window.innerWidth;
  const scaleFactor = availableWidth / nativeWidth;

  // Get the container element.
  const container = document.getElementById('p5parent');

  // Set the container’s native dimensions.
  container.style.width = nativeWidth + 'px';
  container.style.height = nativeHeight + 'px';

  // Use absolute positioning to allow for centering.
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.left = '50%';

  // Set the transform origin to top center so scaling is uniform.
  container.style.transformOrigin = 'top center';

  // First translate the container -50% along the X-axis (to center it)
  // then scale it uniformly.
  container.style.transform = `translateX(-50%) scale(${scaleFactor})`;
}
