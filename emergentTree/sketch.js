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
  // Define your native dimensions.
  const nativeWidth = 800;
  const nativeHeight = 800; // Adjust this value to your canvas's native height

  // Calculate the scale factor based on the available width.
  const availableWidth = window.innerWidth;
  const scaleFactor = availableWidth / nativeWidth;

  // Get the container element.
  const container = document.getElementById('p5parent');

  // Set the container's native dimensions.
  container.style.width = nativeWidth + 'px';
  container.style.height = nativeHeight + 'px';

  // Apply the uniform scale transform to preserve the aspect ratio.
  container.style.transformOrigin = 'top left';
  container.style.transform = `scale(${scaleFactor})`;
}
