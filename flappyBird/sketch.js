let populationSize = 100;
let birds = [];
let pipes = [];
let generation = 0;
let score = 0;

function setup() {
  let canvas = createCanvas(800, 325);
  canvas.style('border', '1px solid black');
  colorMode(HSB, 360, 100, 100);
  scoreElem = document.getElementById('score');
  generationElem = document.getElementById('generation');

  // bird population generation staion
  for (let i = 0; i < populationSize; i++) {
    let hue = map(i, 0, populationSize, 0, 360);
    birds[i] = new Bird(null, hue);
  }

  // push pipes
  pipes.push(new Pipe());

  // compute on cpu for better performance
  ml5.setBackend("cpu");
}

function draw() {
  background(250);
  
  // draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    if (!pipes[i].scored && pipes[i].x + pipes[i].w < 64) { 
      pipes[i].scored = true;
      score++;
      scoreElem.innerText = score;
    }
  }

  for (let bird of birds) {
    if (bird.alive) {
      bird.think(pipes);
      bird.update();
      bird.show();

      for (let pipe of pipes) {
        if (pipe.collides(bird)) {
          bird.alive = false;
        }
      }
    }
  }

  // add a new pipe every 100 frames
  if (frameCount % 100 === 0) {
    pipes.push(new Pipe());
  }

  // restart with new generation
  if (allBirdsDead()) {
    normalizeFitness();
    reproduction();
    resetPipes();
  }
}

function allBirdsDead() {
  for (let bird of birds) {
    if (bird.alive) {
      return false;
    }
  }

  // no survivors
  return true;
}

function weightedSelection() {
  let index = 0;
  let start = random(1);
  while (start > 0) {
    start = start - birds[index].fitness;
    index++;
  }
  index--;

  return birds[index].brain;
}

function normalizeFitness() {
  // get sum
  let sum = 0;
  for (let bird of birds) {
    sum += bird.fitness;
  }

  // divide fitness by sum to normalize
  for (let bird of birds) {
    bird.fitness = bird.fitness / sum;
  }
}

function reproduction() {
  let nextBirds = [];
  for (let i = 0; i < populationSize; i++) {
    let parentA = weightedSelection();
    let parentB = weightedSelection();
    let child = parentA.crossover(parentB);
    child.mutate(0.01);
    let hue = map(i, 0, populationSize, 0, 360);
    nextBirds[i] = new Bird(child, hue);
  }

  score = 0;
  scoreElem.innerText = score;
  generation++;
  generationElem.innerText = generation;
  birds = nextBirds;
}

function resetPipes() {
  // remove all pipes but the latest
  pipes.splice(0, pipes.length - 1);
}
