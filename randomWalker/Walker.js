class Walker {
    constructor() {
        this.x = width / 2;
        this.y = height/ 2;
    }

    show() {
        stroke(255);
        point(this.x, this.y);
    }

    step() {
        // 4 possible steps
        // let choice = floor(random(4));

        // if (choice === 0) {
        //     this.x++;
        // } else if (choice === 1) {
        //     this.x--;
        // } else if (choice === 2) {
        //     this.y++;
        // } else {
        //     this.y--;
        // }

        // 8 possible steps
        let xstep = random(-1, 1);
        let ystep = random(-1, 1);

        this.x += xstep;
        this.y += ystep;
    }
}