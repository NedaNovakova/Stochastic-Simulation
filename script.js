let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

let yAxis = document.getElementById('yAxis');
let cy = yAxis.getContext('2d');

let xAxis = document.getElementById('xAxis');
let cx = xAxis.getContext('2d');

let n;
let m;
let p;

let strategiesActive = false;
let initialM;

let points;
let wizards;
let dayCount;

let twentyFive = document.getElementById('25');
let fifty = document.getElementById('50');
let seventyFive = document.getElementById('75');
let oneHundred = document.getElementById('100');

let currentM = document.getElementById('currentM');

let point25;
let point50;
let point75;
let point100;

function drawAxisLabels() {
    for (let i = 2.5; i < 110 * (canvas.height - 5) / 100; i += 10 * (canvas.height - 5) / 100) {
        cy.beginPath();
        cy.moveTo(0, i);
        cy.lineTo(yAxis.width, i);
        cy.strokeStyle = 'black';
        cy.stroke();
    }

    for (let i = 3.5; i <= canvas.width; i += 10) {
        cx.beginPath();
        cx.moveTo(i, 0);
        cx.lineTo(i, xAxis.height);
        cx.strokeStyle = 'black';
        cx.stroke();
    }
}

function drawGrid() {
    for (let i = 2.5; i < 110 * (canvas.height - 5) / 100; i += 10 * (canvas.height - 5) / 100) {
        c.beginPath();
        c.moveTo(0, i);
        c.lineTo(canvas.width, i);
        c.strokeStyle = '#efefef';
        c.stroke();
    }

    for (let i = 3.5; i <= canvas.width; i += 10) {
        c.beginPath();
        c.moveTo(i, 0);
        c.lineTo(i, canvas.height);
        c.strokeStyle = '#efefef';
        c.stroke();
    }
}

function displayStats() {
    if(point25 == null && points[points.length - 1].i >= n / 4) {
        point25 = dayCount;
        twentyFive.innerHTML = 'day ' + point25;
    }
    if(point50 == null && points[points.length - 1].i >= n / 2) {
        point50 = dayCount;
        fifty.innerHTML = 'day ' + point50;
    }
    if(point75 == null && points[points.length - 1].i >= 3*n / 4) {
        point75 = dayCount;
        seventyFive.innerHTML = 'day ' + point75;
    }
    if(point100 == null && points[points.length - 1].i == n) {
        point100 = dayCount;
        oneHundred.innerHTML = 'day ' + point100;
    }

    currentM.innerHTML = m;
    resCursed.innerHTML = typeCursed(wizards);
}

function setup() {
    drawGrid();

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, canvas.height);
    c.strokeStyle = 'black';
    c.stroke();

    c.beginPath();
    c.moveTo(0, canvas.height);
    c.lineTo(canvas.width, canvas.height);
    c.strokeStyle = 'black';
    c.stroke();
}

setup();


function actionLoop(){
    c.clearRect(0, 0, canvas.width, canvas.height);

    setup();

    for (let i = 0; i < points.length - 1; i++) {
        c.beginPath();
        c.moveTo(points[i].x, points[i].y);
        c.lineTo(points[i + 1].x, points[i + 1].y);
        c.strokeStyle = 'blue';
        c.stroke();

        points[i].draw();
    }
    points[points.length - 1].draw();
}

drawAxisLabels();
