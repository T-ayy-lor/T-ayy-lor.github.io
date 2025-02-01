class Branch {
    constructor(parent, pos, dir) {
        this.position = pos;                                // Current position of this branch (a p5.Vector)
        this.parent = parent;                               // Reference to parent (null for root)
        this.direction = dir;                               // Direction vector ( a p5.Vector)
        this.originalDirection = this.direction.copy();     // Store the original direction for resetting later
        this.count = 0;                                     // Counter for how many times this branch has been influenced
        this.len = 5;                                       // Length of branch
    }

    // Reset branch to it's original state
    reset() {
        this.direction = this.originalDirection.copy();
        this.count = 0;
    }

    // Create the next branch in the same direction
    next() {
        var nextDir = p5.Vector.mult(this.direction, this.len);               // Scale direction by length
        var nextPos = p5.Vector.add(this.position, nextDir);                  // Add scaled direction to current position
        var nextBranch = new Branch(this, nextPos, this.direction.copy());    // Create a new branch at the calculated position
        return nextBranch;
    }

    // Draw the branch on the canvas
    show() {
        if (this.parent != null) {
            // Draw a line from this branch's position to its parent's position
            line(this.position.x, this.position.y, this.parent.position.x, this.parent.position.y);
        }
    }
}