let bird;
let pipes = [];

function setup() {
  createCanvas(400, 650);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  bird.update();
  bird.show();

  if (frameCount % 100 == 0) { // Every 40 frames
    pipes.push(new Pipe());
  }

  for (let i = pipes.length-1; i >= 0; i--) { // Loop backwards bc deleting
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("ouch");
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    console.log("SPACE");
    bird.up();
  }
}
