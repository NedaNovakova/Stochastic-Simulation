function addPoint(group) {
    // If the end of the canvas has been reached, delete the earliest point and shift all remaining points to the left
    if(points[points.length - 1].x >= canvas.width - 7.5) {
        points.shift();
        points.forEach(element => element.x -= 10);
    }

    // Define the new point's coordinates based on the last day 
    let x = points[points.length - 1].x + 10; // x coordinate on the canvas
    let i = points[points.length - 1].i; // current number of cursed wizards
    let y = -1; // y coordinate on the canvas (to be determined)

    // If security measures are employeed, choose the number of active death eaters
    if (strategiesActive) {
        m = 0;
        for (let i = 0; i < initialM; i++) {
            let x = Math.random();
            if(x > se) m++;
        }
    }
    else {
        m = initialM; // total number of death eaters
    }

    // Define a list of probabilities to go from i to j
    let probabilities = [];

    // Use the values from the transition matrix definition
    for (let j = 0; j <= n; j++) {
        if(j < i || j > ((2*i) + m)) {
            probabilities.push(0);
        }
        else{
            probabilities.push(
                nChooseK(Math.min(n - i, i + m), j - i) * Math.pow(p, j - i) * Math.pow(1 - p, Math.min(n - i, i + m) - (j - i))
            );
        }
    }

    // Find the highest probability
    let max = 0;

    probabilities.forEach(element => {
        if(element > max) max = element;
    });

    // Repeat until a valid number of cursed wizards is chosen
    while(y == -1) {
        // Choose a random value for the total number of cursed wizards
        let k = Math.floor(Math.random() * (n + 1));
        // Choose a random probability with which to accept the chosen value
        let r = Math.random();

        // If the chosen value of k is accepted, add a new datapoint
        if(r < probabilities[k] / max){
            y = (n - k) * ((canvas.height - 6) / (n + 1)) + 2.5; // Calculate y coordinate from the number of cursed wizards
            points.push(new point(x, y, k, 'orange'));
            curse(k - i, group);
            dayCount++;
        }
    }
}

function curse(k, group) {
    while(k > 0) {
        let x = Math.floor(Math.random() * (n + 1));
        if (group.members[x] == 0) {
            group.members[x] = 1;
            console.log("cursed")
            k--;
        }
    }
}

function typeCursed(group) {
    let count = 0;

    for (let i = 0; i < group.n; i++) {
        if(group.resistant[i] && group.members[i] == 1) {
            count++;
        }
    }

    return count;
}