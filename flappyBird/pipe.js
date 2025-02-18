
class Pipe {
    constructor() {
        // the gaps height between the pipes
        this.spacing = 100;

        // the gap
        this.top = random(height - this.spacing);
        this.bottom = this.top + this.spacing;

        // begin at right edge
        this.x = width;

        // the width of the pipe
        this.w = 20;

        // pipe speeds
        this.velocity = 2;

        // to ensure pipes aren't scored more than once
        this.scored = false;
    }

    show() {
        // draw pipe
        fill(0);
        noStroke();
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.bottom, this.w, height - this.bottom);
    }

    update() {
        // move left
        this.x -= this.velocity;
    }

    // hit bird
    collides(bird) {
        // is the bird within the vertical range of the top or bottom pipe
        let verticalCollision = bird.y < this.top || bird.y > this.bottom;

        // is the bird within the horizontal range of the pipes
        let horizontalCollision = bird.x > this.x && bird.x < this.x + this.w;

        // if its a hit its a hit diva
        return verticalCollision && horizontalCollision;
    }

    // remove pipe when past left edge
    offscreen() {
        return (this.x < -this.w);
    }
}