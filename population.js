class population {
    constructor(n, fraction) {
        this.n = n;

        this.members = [];
        for (let i = 0; i < n; i++) {
            this.members.push(0);
        }

        this.resistant = [];
        for (let i = 0; i < n; i++) {
            if(i < n * fraction / 100) {
                this.resistant.push(true);
            }
            else {
                this.resistant.push(false);
            }
        }
    }
}