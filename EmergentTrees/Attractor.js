class Attractor {
    constructor() {
        this.position = p5.Vector.random2D();
        this.position.mult(random(width / 2.5)); // Constrain distribution
        this.position.x += width / 2; // Position distribution
        this.position.y += height / 2;
        this.closestBranch = null;
        this.minDistance = Infinity;
    }

    show() {
        fill(255);
        strokeWeight(1);
        stroke(4);
        ellipse(this.position.x, this.position.y, 5, 5);
    }
}