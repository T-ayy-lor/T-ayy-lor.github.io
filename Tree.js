class Tree {
    constructor() {
        this.attractorCount = 1000;
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
        let position = createVector(width / 2, height / 2);
        let direction = createVector(0, -1);
        let root = new Branch(null, position, direction);
        this.branches.push(root);

        // Remove attractors around root
        var range = new AABB(root.position.x - killDistance, root.position.y - killDistance, killDistance * 2, killDistance * 2);
        let nearbyAttractors = this.qt.query(range);

        for (let attractor of nearbyAttractors) {
            let distance = p5.Vector.dist(attractor.position, root.position);
            if (distance <= killDistance) {
                this.qt.remove(attractor);
            }
        }
    }

    grow() {
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
            // Stall prevention: if exactly two attractors remain, remove one forcibly
            // if (attractors.length === 2) {
            //     this.qt.remove(attractors[0]);  // remove one attractor
            //     console.log("Forcibly removed one of the last two attractors.");
            // }

            let directionSum = createVector(0, 0);
            let count = attractors.length;

            for (let attractor of attractors) {
                let direction = p5.Vector.sub(attractor.position, branch.position);
                directionSum.add(direction);
            }

            if (count > 0) {
                directionSum.div(count).normalize();
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
            noLoop();
        }


    }

    show() {
        for (let branch of this.branches) {
            branch.show();
        }
        this.qt.show();
        this.qt.showAttractors();
    }
}