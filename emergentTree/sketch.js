let tree;
let attractionDistance = 500;
let killDistance = 5;

function setup() {
  let cnv = createCanvas(800, 800);
  cnv.parent('p5parent');
  updateCanvasScale();
  tree = new Tree();
}

function draw() {
  attractionDistance = parseFloat(document.getElementById('attractionDist').value);
  killDistance = parseFloat(document.getElementById('killDist').value);
  
  background(0);
  tree.show();
  tree.grow();
}


function updateCanvasScale() {
  let scaleFactor = min(windowWidth / 800, 1);
  let container = document.getElementById('p5parent');
  container.style.transformOrigin = 'top left';
  container.style.transform = `scale(${scaleFactor})`;
  container.style.width = (800 * scaleFactor) + 'px';
  container.style.height = (800 * scaleFactor) + 'px';
}

// p5 calls this function whenever the window is resized.
function windowResized() {
  resizeCanvasToFit();
}


