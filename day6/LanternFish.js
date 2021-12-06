class LanternFish {
    static count = 0;

    constructor(timer) {
        this.children = [];
        this.child = null;
        this.timer = timer;
        this.day = 0;
        LanternFish.count++;
        // console.trace();
    }

    update() {
        // for (let child of this.children) child.update();
        if (this.child) {
            if (this.child.day < 80) {
                this.child.update();
                // console.log(this.child.day);
                // console.log("UPDATE CHILD");
            } else this.child = null;
            return;
        }

        this.day++;
        // console.log("YEEEEEEEEEEEEEEEEEEEEEEEE");

        if (this.timer === 0) {
            // this.children.push(new LanternFish(8));
            this.spawn();
            this.timer = 6;
            return;
        }

        this.timer--;
    }

    spawn() {
        this.child = new LanternFish(8);
        // for (let i = 0; i < 80; i++) {
        //     child.update();
        // }
    }
}

module.exports = LanternFish;
