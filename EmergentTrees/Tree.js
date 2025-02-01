class Tree {
    constructor() {
        this.attractorCount = 300;
        this.branches = [];
        this.qt = null;
        this.iterationCount = 0;

        // Create QuadTree
        let boundary = new AABB(0, 0, width, height);
        this.qt = new QuadTree(boundary, 4);

        // Generate attractors & insert into QuadTree
        for (let i = 0; i < this.attractorCount; i++) {
            var attractor = new Attractor();
            this.qt.insert(attractor);
        }

        // Create the root branch
        let position = createVector(width / 2, height);
        let direction = createVector(0, -1);
        let root = new Branch(null, position, direction);
        this.branches.push(root);

        // Extend initial branches upwards until one comes within attraction distance of an attractor
        var current = root;
        var found = false;
        while (!found) {
            // Query the QuadTree for attractors within attractionDistance
            var range = new AABB(current.position.x - attractionDistance, current.position.y - attractionDistance, attractionDistance * 2, attractionDistance * 2);
            let nearbyAttractors = this.qt.query(range);

            // Check if any attractors are within attractionDistance
            for (let attractor of nearbyAttractors) {
                let d = p5.Vector.dist(current.position, attractor.position);
                if (d < attractionDistance) {
                    found = true;
                    break;
                }
            }

            // If no attractors are within attractionDistance, extend upwards
            if (!found) {
                var branch = current.next();
                current = branch;
                this.branches.push(current);
            }
        }
    }

    grow() {
        // Get all live attractors and reset from prior iteration
        let allAttractors = this.qt.getAllAttractors();
        for (let attractor of allAttractors) {
            attractor.closestBranch = null;
            attractor.minDistance = Infinity;
        }

        // Associate attractors with their closest branch
        for (let i = 0; i < this.branches.length; i++) {
            var branch = this.branches[i];
            var range = new AABB(branch.position.x - attractionDistance, branch.position.y - attractionDistance, attractionDistance * 2, attractionDistance * 2);
            var nearbyAttractors = this.qt.query(range);

            // console.log(`Branch at ${branch.position}: Found ${nearbyAttractors.length} attractors.`);

            for (let attractor of nearbyAttractors) {
                let distance = p5.Vector.dist(attractor.position, branch.position);

                if (distance < attractor.minDistance) {
                    attractor.minDistance = distance;
                    attractor.closestBranch = branch;
                }
            }
        }

        let branchAttractorsMap = new Map();
        for (let attractor of allAttractors) {
            if (attractor.closestBranch !== null) {
                // Get each closestBranch
                let branch = attractor.closestBranch;

                // If closestBranch isn't in Map, add it
                if (!branchAttractorsMap.has(branch)) {
                    branchAttractorsMap.set(branch, []);
                }

                // Associate attractors with their closest branch
                branchAttractorsMap.get(branch).push(attractor);
            }
        }

        // Calculate branch directions
        let newBranches = [];
        for (let [branch, attractors] of branchAttractorsMap) {


            let directionSum = createVector(0, 0);
            let count = attractors.length;

            for (let attractor of attractors) {
                let direction = p5.Vector.sub(attractor.position, branch.position);
                directionSum.add(direction);
            }

            if (count > 0) {
                directionSum.div(count);

                // Handle equidistant points
                directionSum.add(p5.Vector.random2D().setMag(0.5));

                directionSum.normalize();
                branch.direction = directionSum;

                let newBranch = branch.next();
                newBranches.push(newBranch);
                branch.reset();
            }
        }

        // Grow new branches
        this.branches.push(...newBranches);
        console.log(`New branches created: ${newBranches.length}`);

        // Remove attractors within killDistance
        for (let newBranch of newBranches) {
            var range = new AABB(newBranch.position.x - killDistance, newBranch.position.y - killDistance, killDistance * 2, killDistance * 2);
            let nearbyAttractors = this.qt.query(range);

            for (let attractor of nearbyAttractors) {
                let distance = p5.Vector.dist(attractor.position, newBranch.position);
                if (distance <= killDistance + 1) {
                    this.qt.remove(attractor);
                }
            }
        }



        // **If no new branches are created, remove all remaining attractors**
        if (newBranches.length === 0) {
            console.log("No new branches formed, exiting loop");

            // Pause for 2 seconds before restarting
            noLoop(); // Stop the loop temporarily
            setTimeout(() => {
                setup(); // Restart the sketch by calling setup
                loop();  // Resume the loop
            }, 1000); // 2000 milliseconds = 2 seconds
        }


    }

    show() {

        for (let i = 0; i < this.branches.length; i++) {
            let branch = this.branches[i];
            if (branch.parent != null) {
                let alpha = map(i, 0, this.branches.length, 250, 150);
                let sw = map(i, 0, this.branches.length, 3, 0.5);

                stroke(255, 255, 255, alpha);
                strokeWeight(sw);
                stroke(255, 255, 255);

                // Draw a line from this branch's position to its parent's position
                line(branch.position.x, branch.position.y, branch.parent.position.x, branch.parent.position.y);
            }
        }
        blendMode(LIGHTEST);
        // this.qt.show();
        // this.qt.showAttractors();
    }
}