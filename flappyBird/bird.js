
class Bird {
    constructor(brain, hue) {
        if (brain) {
            // on new gen
            this.brain = brain;
        } else {
            // on gen 0
            this.brain = ml5.neuralNetwork({
                inputs: 4,
                outputs: ["flap", "no flap"],
                task: "classification",
                neuroEvolution: true
            });
        }

        // position
        this.x = 100;
        this.y = height/2;

        // velocity and forces are scalars since the bird moves only along the y axis
        this.velocity = 0;
        this.gravity = 0.5;
        this.flapForce = -10;

        // birb stats
        this.fitness = 0;
        this.alive = true;

        // bird color
        this.hue = (hue !== undefined) ? hue : 200;
    }

    // like elpheba, she's defying gravity
    flap() {
        this.velocity += this.flapForce;
    }

    think(pipes) {
        // get next pipe position and x-distance
        let nextPipe = null;
        for (let pipe of pipes) {

            // next pipe hasn't passed the bird
            if (pipe.x + pipe.w > this.x) {
                nextPipe = pipe;
                break;
            }
        }

        let inputs = [
            // normalize y properties
            this.y / height, 
            this.velocity / height, 
            nextPipe.top / height, 

            // normalize x properties
            (nextPipe.x - this.x) / width,
        ];

        let results = this.brain.classifySync(inputs);
        if (results[0].label === "flap") {
            this.flap();
        }
    }

    update() {
        // gravity
        this.velocity += this.gravity;
        this.y += this.velocity;

        // dampen velocity
        this.velocity *= 0.95;

        // handle floor
        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }

        this.fitness++;
    }

    show() {
        fill(this.hue, 100, 100);
        ellipse(this.x, this.y, 16, 16);
    }
}