// global variables
let cells = [];
let ruleValue = 30;
let ruleSet = '';
let w = 3; // width (and height) of each cell
let y = 0; // current drawing y position

// initial canvas dimensions
let canvasWidth = 600;
let canvasHeight = 600;

// Off-screen graphics buffer to hold our drawing
let pg;

function setup() {
    let cnv = createCanvas(canvasWidth, canvasHeight);
    cnv.parent('p5parent');

    updateCanvasScale();

    // create the graphics buffer
    pg = createGraphics(canvasWidth, canvasHeight);
    pg.background(255);

    // generation 0
    let total = canvasWidth / w;
    cells = new Array(total).fill(0);
    cells[floor(total / 2)] = 1;

    const ruleInput = document.getElementById('ruleNumber');
    ruleInput.addEventListener('input', function () {
        let newRule = parseInt(this.value);
        if (!isNaN(newRule) && newRule >= 0 && newRule <= 255) {
            ruleValue = newRule;
            console.log("New rule set to:", ruleValue);
            resetSketch(); // restart the sketch with the new rule
        }
    });
}

function draw() {
    // get binary string of ruleValue
    ruleSet = ruleValue.toString(2).padStart(8, "0");

    // style generations
    for (let i = 0; i < cells.length; i++) {
        let x = i * w;
        pg.noStroke();
        pg.fill(255 - cells[i] * 255);
        pg.square(x, y, w);
    }

    // generation generation
    let len = cells.length;
    let nextCells = [];
    for (let i = 0; i < cells.length; i++) {
        let left = cells[(i - 1 + len) % len];
        let right = cells[(i + 1) % len];
        let newState = calculateState(left, cells[i], right);
        nextCells[i] = newState;
    }
    cells = nextCells;

    // increment y to expand down
    y += w;

    // expand the off-screen buffer, when needed
    if (y >= pg.height) {
        let newHeight = pg.height + 600;
        let newPg = createGraphics(canvasWidth, newHeight);
        newPg.background(255);
        newPg.image(pg, 0, 0);
        pg = newPg;
        resizeCanvas(canvasWidth, newHeight);
    }

    image(pg, 0, 0);
}

function calculateState(left, state, right) {
    // get neighborhood state as binary digit
    let neighborhood = '' + left + state + right;
    let value = 7 - parseInt(neighborhood, 2);
    return parseInt(ruleSet[value]);
}

function resetSketch() {
    // Clear the main canvas
    background(255);

    // Recreate the off-screen graphics buffer and clear it
    pg = createGraphics(canvasWidth, canvasHeight);
    pg.background(255);

    // Reset the drawing position to the top
    y = 0;

    // Reinitialize generation 0: create an array of cells with one central active cell
    let total = canvasWidth / w;
    cells = new Array(total).fill(0);
    cells[floor(total / 2)] = 1;
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

function windowResized() {
    updateCanvasScale();
}


