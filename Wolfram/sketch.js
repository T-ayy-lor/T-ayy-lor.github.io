let cells = [];
let ruleValue = [30, 90, 110, 54, 62, 73, 149, 225, 250]; // wolfram rules
let ruleSet = '';
let currentRuleIndex = 0; // for display
let w = 5; // width of each cell
let y = 0; // starting cell row position

function setup() {
  let cnv = createCanvas(600, 700);
  cnv.parent('container');

  // for index.html
  updateRuleDisplay();

  // generation 0
  let total = width / w;
  cells = new Array(total).fill(0);
  cells[floor(total / 2)] = 1;
  background(255);
}

function draw() {
  // get wolfram rule as binary digit
  ruleSet = ruleValue[currentRuleIndex].toString(2).padStart(8, "0");
  console.log("Using rule:", ruleSet);

  // generation generation
  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    stroke(0);
    fill(255 - cells[i] * 255);
    square(x, y, w);
  }

  // increment next gens row
  y += w;

  // when the canvas is filled, hold 2 secs, and reset
  if (y >= height) {
    noLoop();
    setTimeout(() => {
      resetSketch();
      loop();
    }, 2000);
    return;
  }

  // new state is a function of cells current neighbors
  let len = cells.length;
  let nextCells = [];
  // define neighborhood
  for (let i = 0; i < cells.length; i++) {
    let left = cells[(i - 1 + len) % len];
    let right = cells[(i + 1 + len) % len];
    let state = cells[i];
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }

  cells = nextCells;
}

function calculateState(left, state, right) {
  // get neighborhood state as binary digit
  let neighborhood = '' + left + state + right;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}

function resetSketch() {
  // next rule
  currentRuleIndex = (currentRuleIndex + 1) % ruleValue.length;
  updateRuleDisplay();
  background(255);
  y = 0;

  // reinitialize generation 0
  let total = width / w;
  cells = new Array(total).fill(0);
  cells[floor(total / 2)] = 1;
}

function updateRuleDisplay() {
  // get the decimal rule number
  let decimalRule = ruleValue[currentRuleIndex];
  let ruleDiv = document.getElementById("wolframNumber");
  ruleDiv.innerHTML = decimalRule;

}
