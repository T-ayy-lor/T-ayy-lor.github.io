class QuadTree {
    constructor(boundary, capacity) {
        // Boundary should be an instance of AABB
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        // Create four child regions: top-left, top-right, bottom-left, bottom-right
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.width / 2;
        let h = this.boundary.height / 2;

        // Create four new bounding boxes
        let nw = new AABB(x, y, w, h);
        let ne = new AABB(x + w, y, w, h);
        let sw = new AABB(x, y + h, w, h);
        let se = new AABB(x + w, y + h, w, h);

        // Create four QuadTrees for these subdivisions
        this.northwest = new QuadTree(nw, this.capacity);
        this.northeast = new QuadTree(ne, this.capacity);
        this.southwest = new QuadTree(sw, this.capacity);
        this.southeast = new QuadTree(se, this.capacity);

        this.divided = true;

        // Redistribute the current attractors into the children
        for (let a of this.points) {
            // Insert each existing point into the children
            this.northwest.insert(a) ||
                this.northeast.insert(a) ||
                this.southwest.insert(a) ||
                this.southeast.insert(a);
        }

        // Clear the parent's objects array since they are now in the children
        this.points = [];
    }

    insert(point) {
        // Point should be an attractor object
        if (!this.boundary.contains(point)) {
            // If the point isn't in the current QuadTree boundary, return false
            return false;
        }

        // If there's room and no subdivision yet
        if (this.points.length < this.capacity && !this.divided) {
            this.points.push(point);
            return true;
        }

        // Otherwise, subdivide if not already
        if (!this.divided) {
            this.subdivide();
        }

        // Pass the point into the correct quadrant
        if (this.northwest.insert(point)) return true;
        if (this.northeast.insert(point)) return true;
        if (this.southwest.insert(point)) return true;
        if (this.southeast.insert(point)) return true;

        // If somehow doesn't fit, return false;
        return false;
    }

    query(range, found) {
        // range is an AABB that defines the query region
        // found is an array to store results
        if (!found) {
            found = [];
        }

        // If range does not intersect the boundary, stop searching
        if (!this.boundary.intersects(range)) {
            return found;
        }

        // Check each point in this node
        for (let a of this.points) {
            if (range.contains(a)) {
                found.push(a);
            }
        }

        // If subdivided, search the children
        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }

    remove(point) {
        // Check if attractor is within the boundary
        if (!this.boundary.contains(point)) {
            return false;
        }

        // Attempt to find and remove from this node's attractors
        const index = this.points.indexOf(point);
        if (index > -1) {
            // console.log("Removing attractor from this node:", attractor.position);
            this.points.splice(index, 1);

            // After removal, try to condense this node if needed
            this.condense();
            return true;
        }

        // If subdivided, try removing from child nodes
        if (this.divided) {
            if (this.northwest.remove(point)) {
                this.condense();
                return true;
            }
            if (this.northeast.remove(point)) {
                this.condense();
                return true;
            }
            if (this.southwest.remove(point)) {
                this.condense();
                return true;
            }
            if (this.southeast.remove(point)) {
                this.condense();
                return true;
            }
        }

        // Attractor not found
        // console.log("Attractor not found in this node or its children:", attractor.position);
        return false;
    }

    // Condense method
    condense() {
        // Only attempt to condense if we're currently subdivided
        if (this.divided) {
            // Check if all children are leaves with no attractors
            const nwEmpty = !this.northwest.divided && this.northwest.points.length === 0;
            const neEmpty = !this.northeast.divided && this.northeast.points.length === 0;
            const swEmpty = !this.southwest.divided && this.southwest.points.length === 0;
            const seEmpty = !this.southeast.divided && this.southeast.points.length === 0;

            if (nwEmpty && neEmpty && swEmpty && seEmpty) {
                // All children are empty leaves, so we can remove them and collapse this node
                this.northwest = null;
                this.northeast = null;
                this.southwest = null;
                this.southeast = null;
                this.divided = false;
            }
        }
    }

    getAllAttractors() {
        let all = [...this.points];
        if (this.divided) {
            all = all.concat(
                this.northwest.getAllAttractors(),
                this.northeast.getAllAttractors(),
                this.southwest.getAllAttractors(),
                this.southeast.getAllAttractors()
            );
        }
        return all;
    }

    show() {
        // Visualize the boundary
        stroke(255);
        strokeWeight(0.1);
        noFill();
        rect(this.boundary.x, this.boundary.y, this.boundary.width, this.boundary.height);

        // If subdivided, show children
        if (this.divided) {
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }
    }

    showAttractors() {
        for (let attractor of this.points) {
            attractor.show();
        }

        // If subdivided, show children
        if (this.divided) {
            this.northwest.showAttractors();
            this.northeast.showAttractors();
            this.southwest.showAttractors();
            this.southeast.showAttractors();
        }
    }
}