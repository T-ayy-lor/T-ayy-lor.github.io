// Axis-aligned bounding box
class AABB {
    constructor(x, y, w, h) {
        // Top-left corner of the bounding box
        this.x = x;
        this.y = y;

        // Width and height of the bounding box
        this.width = w;
        this.height = h;
    }

    show() {
        noFill();
        stroke(255);
        rect(this.x, this.y, this.width, this.height);
    }

    // Method to check if a point is inside the AABB
    contains(point) {
        return (
            point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height
        );
    }

    // Method to check if this AABB intersects with another AABB
    intersects(other) {
        return !(
            this.x + this.width < other.x ||
            this.x > other.x + other.width ||
            this.y + this.height < other.y ||
            this.y > other.y + other.height
        );
    }
}