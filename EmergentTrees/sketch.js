let tree;
let attractionDistance = 500;
let killDistance = 5;

function setup() {
  // Get the container element
  let container = document.getElementById('p5container');
  // Calculate the canvas width based on the container's current width
  let canvasWidth = container.offsetWidth;
  // Define your desired aspect ratio (for a square, it's 1:1)
  let aspectRatio = 1;
  // Create the canvas using the computed dimensions
  let canvas = createCanvas(canvasWidth, canvasWidth * aspectRatio);
  // Attach the canvas to the container
  canvas.parent('p5container');

  // Initialize your tree or other objects
  tree = new Tree();
}

function draw() {
  background(0);
  tree.show();
  tree.grow();
}

// This function is called automatically by p5.js when the window is resized.
function windowResized() {
  // Recalculate the container width and corresponding height
  let container = document.getElementById('p5container');
  let canvasWidth = container.offsetWidth;
  let aspectRatio = 1;
  // Resize the canvas to the new dimensions
  resizeCanvas(canvasWidth, canvasWidth * aspectRatio);
}


