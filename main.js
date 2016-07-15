'use strict'

var CANVAS_HEIGHT = 500;
var CANVAS_WIDTH = 1000;
var drawer = new Drawer('canvas', CANVAS_HEIGHT, CANVAS_WIDTH);
var points;

var drawPoints = document.getElementById('drawPoints');
var drawHall = document.getElementById('drawHall');
var clearCanvas = document.getElementById('clearCanvas');

drawPoints.onclick = function () {
    drawer.clearCanvas();
    var point_number = parseInt(document.getElementById('number').value);
    points = genRandomPoints(point_number);
    drawer.drawPoints(points, '#26244a');
}

drawHall.onclick = function () {
    var chain = getHall(points);
    drawer.drawPoligon(chain, '#b6124a');
}

clearCanvas.onclick = function () {
    drawer.clearCanvas();
} 


/* LOGIC FUNCTIONS */

function getHall(points) {
    var extrem_y = getExtremYIndex(points);
    var min_y = extrem_y[1],
        max_y = extrem_y[0];
    swap(points[0], points[max_y]);
    swap(points[1], points[min_y]);
    
    var chain;
    if(isRighter(points[2], points[0], points[1]) === 1) {
        chain = [points[0], points[2], points[1]];
    } else {
        chain = [points[0], points[1], points[2]];
    }
    chain.push(chain[0]);
    for(let i = 3; i < points.length; i++) {
        var res = getVisibleSides(points[i], chain);
        if(res.length !== 0) {
            var chain_arr1 = chain.slice(0, res[0] + 1);
            var chain_arr2 = chain.slice(res[1]);
            chain = chain_arr1.concat(points[i], chain_arr2);
        }
    }
    return chain;
}

function getVisibleSides(point, chain) {
    var result = [];
    if(isRighter(point, chain[0], chain[1]) === 1) {
        result.push(0);
    }
    for(let j = 0; j < chain.length - 2; j++) {
        var a = isRighter(point, chain[j], chain[j + 1]),
            b = isRighter(point, chain[j + 1], chain[j + 2]);
        if( a*b === -1 || (a === 0 && b === 1) || (b === 0 && a === 1)) {
            result.push(j + 1);
        } 
    }
    if(result.length === 1) {
        result.push(chain.length - 1);
    }
    return result;
}

function swap(a, b) {
    var temp = new Point(a.x, a.y);
    a.x = b.x;
    a.y = b.y;
    b.x = temp.x;
    b.y = temp.y;
}

function getExtremYIndex(points) {
    var max_y = points[0].y,
        min_y = points[0].y;
    var min_index = 0,
        max_index = 0;
    for(let i = 1; i < points.length; i++) {
        if(points[i].y > max_y) {
            max_y = points[i].y;
            max_index = i;
        }
        if(points[i].y <= min_y) {
            min_y = points[i].y;
            min_index = i;
        }
    }
    console.log(max_y);
    return [max_index, min_index];
}

function isRighter(point, start_point, end_point) {
    var x = point.x, y = point.y,
        x1 = start_point.x, y1 = start_point.y,
        x2 = end_point.x, y2 = end_point.y;
    var result = (x2 - x) * (y1 - y) - (y2 - y) * (x1 - x);
    if (result >  0) {
        return -1;
    } else if (result === 0) {
        return 0;
    } else {
        return 1;
    }
}

function findInnerIntersections(points, center) {
    let inner_points = [];
    for(let i = 0; i < points.length; i++) {
        if(getDistanсe(points[i][0].x, points[i][0].y, center.x, center.y) < 
           getDistanсe(points[i][1].x, points[i][1].y, center.x, center.y)) {
            inner_points.push(points[i][0]);
        } else {
            inner_points.push(points[i][1]);
        }
    }
    return inner_points;
}

function getIntersectionWithCircle(circle, point) {
    var r2 = circle.radius * circle.radius;
    var x1 = point.x;
    var y1 = point.y;
    var x0 = circle.xCenter;
    var y0 = circle.yCenter;
    var resX1 = Math.sqrt((r2 * (x1 - x0) * (x1 - x0)) /
                            ((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))) + x0;
    var resX2 = - Math.sqrt((r2 * (x1 - x0) * (x1 - x0)) /
                            ((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))) + x0;
    var resY1 = (((resX1 - x0) * (y1 - y0)) / (x1 - x0)) + y0;
    var resY2 = (((resX2 - x0) * (y1 - y0)) / (x1 - x0)) + y0;
    var res_point1 = new Point(resX1, resY1);
    var res_point2 = new Point(resX2, resY2);
    console.log([res_point1, res_point2]);
    return [res_point1, res_point2];
}

function inspectNewCircle(circles, circle) {
    var result = true;
    for (let i = 0; i < circles.length; i++) {
        if (getDistanсe(circle.xCenter, circle.yCenter, circles[i].xCenter, circles[i].yCenter) < 
            circle.radius + circles[i].radius) {
            result = false;
        }
    }
    return result;
}

function getDistanсe(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function genRandomPoint() {
    var x = getRandomInt(100, CANVAS_WIDTH - 50),
        y = getRandomInt(50, CANVAS_HEIGHT - 50);
    var point = new Point(x, y)
    return point;
}

function genRandomPoints(number) {
    var result = [];
    for(let i = 0; i < number; i++) {
        result.push(genRandomPoint());
    }
    return result;
}

function genRandomCircle() {
    var radius = getRandomInt(10, Math.min(CANVAS_HEIGHT, CANVAS_WIDTH) / 10);
    var xCenter = getRandomInt(3 * radius + 1, CANVAS_WIDTH - 3 * radius + 1 );
    var yCenter = getRandomInt(3 * radius + 1, CANVAS_HEIGHT - 3 * radius + 1);
    var random_circle = new Circle(xCenter, yCenter, radius);
    return random_circle;
}

function getRandomInt(min, max) {
    var res = 0;
    for (let i = 0; i < 3; i++) {
        res += Math.random() * (max - min) + min;
    }
    return Math.floor(res / 3);
}
