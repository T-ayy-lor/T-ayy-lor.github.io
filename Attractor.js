class Attractor {
    constructor() {
        // Runs upon creation
        // Generate vector with random x and y positions (z is 0)
        this.position = p5.Vector.random2D();

        // Create distribution constrained to a circle via scalar multiplication
        this.position.mult(random(width / 3));
        
        // Add half the width/height to position at center
        this.position.x += width / 2;
        this.position.y += height / 2;

        // Node is within kill distance
        this.reached = false;

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