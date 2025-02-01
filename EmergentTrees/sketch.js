let tree;
let attractionDistance = 500;
let killDistance = 5;

function setup() {
  // Get the container element
  let container = document.getElementById('embeddedTree');
  let canvasWidth = container.offsetWidth;
  let canvas = createCanvas(canvasWidth, canvasWidth);
  canvas.parent('embeddedTree');

  // Get references to the input elements using p5's select()
  let attractionInput = select('#attractionDistance');
  let killInput = select('#killDistance');

  // Set the inputs’ default values
  attractionInput.value(attractionDistance);
  killInput.value(killDistance);

  // Attach an event listener to update attractionDistance when its value changes
  attractionInput.input(() => {
    let newVal = float(attractionInput.value());
    if (!isNaN(newVal)) {
      attractionDistance = newVal;
    }
  });

  // Attach an event listener to update killDistance when its value changes
  killInput.input(() => {
    let newVal = float(killInput.value());
    if (!isNaN(newVal)) {
      killDistance = newVal;
    }
  });

  // Initialize your tree or other objects
  tree = new Tree();
}


function draw() {
  background(0);
  tree.show();
  // Snapshot the current parameters
  let currentAttractionDistance = attractionDistance;
  let currentKillDistance = killDistance;
  tree.grow(currentAttractionDistance, currentKillDistance);
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


