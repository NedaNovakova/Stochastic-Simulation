let actionInterval;
let pointInterval;

function initialize() {
    if(dayCount != null) return;

    n = Number(document.getElementById('wizards').value);
    m = Number(document.getElementById('deathEaters').value);
    p = Number(document.getElementById('successRate').value);
    se = Number(document.getElementById('security').value);

    initialM = m;

    points = [new point(3.5, canvas.height - 3.5, 0, 'orange')];
    wizards = new population(n, 0);

    dayCount = 0;
}

function start(){
    initialize();
    if(actionInterval == null) actionInterval = setInterval(actionLoop, 1);
    if(pointInterval == null) pointInterval = setInterval(() => {addPoint(wizards); displayStats()}, 10);
}

function stop(){
    clearInterval(actionInterval);
    clearInterval(pointInterval);

    actionInterval = null;
    pointInterval = null;
}

function reset() {
    stop();

    n = Number(document.getElementById('wizards').value);
    m = Number(document.getElementById('deathEaters').value);
    p = Number(document.getElementById('successRate').value);
    se = Number(document.getElementById('security').value);

    initialM = m;

    points = [new point(3.5, canvas.height - 3.5, 0, 'orange')];
    wizards = new population(n, 0);

    dayCount = 0;

    point25 = null;
    point50 = null;
    point75 = null;
    point100 = null;

    twentyFive.innerHTML = "";
    fifty.innerHTML = "";
    seventyFive.innerHTML = "";
    oneHundred.innerHTML = "";

    c.clearRect(0, 0, canvas.width, canvas.height);
    setup();
    drawAxisLabels();
}

function toggleStrategies(button){
    if(button.innerHTML == 'Apply Strategies') {
        button.innerHTML = 'Remove Strategies';
        document.getElementById('strategies').style.display = 'block';
        document.getElementById('advanced').style.display = 'inline';
        strategiesActive = true;
    }
    else {
        button.innerHTML = 'Apply Strategies';
        document.getElementById('strategies').style.display = 'none';
        document.getElementById('advanced').style.display = 'none';
        strategiesActive = false;
    }
}