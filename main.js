'use strict'

var CANVAS_HEIGHT = 500;
var CANVAS_WIDTH = 500;
var drawer = new Drawer('canvas', CANVAS_HEIGHT, CANVAS_WIDTH);
var points;

var drawPoints = document.getElementById('drawPoints');
var drawHull = document.getElementById('drawHull');
var drawTriangulation = document.getElementById('drawTriangulation');
var clearCanvas = document.getElementById('clearCanvas');
var drawCircle = document.getElementById('drawCircle');

drawHull.onclick = function () {
    drawer.clearCanvas();
    var point_number = parseInt(document.getElementById('number').value);
    points = genRandomPoints(point_number);
    drawer.drawPoints(points, '#26244a');
    var chain = getHull(points);
    drawer.drawPoligon(chain, '#b6124a');
    console.log(getPoligonSquare(chain));
}

drawTriangulation.onclick = function () {
    drawer.clearCanvas();
    var point_number = parseInt(document.getElementById('number').value);
    points = genRandomPoints(point_number);
    drawer.drawPoints(points);
    /*
    points.sort(compare);
    console.log(pointsToStr(points));
    var graph = new Graph([[points[0], points[1]], [points[1], points[2]], [points[0], points[2]]]);
    drawer.drawGraph(graph, 'yellow');
    for(let i = 3; i < points.length; i++) {
        var vertices = graph.getVertices();
        drawer.drawPoint(points[i], 'magenta');
        //var closest_points = getTwoClosestPoinsToPoint(vertices, points[i]);
        var closest_point_index = getClosestPoint(vertices, points[i]);
        var closest_point = vertices[closest_point_index];
        var index = points.indexOf(closest_point);
        var closest_point2 = points[index + 1];
        
        drawer.drawPoints([closest_point, closest_point2], 'blue');
        //var incident_points1 = graph.getIncidentToVertex(closest_points[0]).sort(compare);
        //var incident_points2 = graph.getIncidentToVertex(closest_points[1]).sort(compare);
        var incident_points1 = graph.getIncidentToVertex(closest_point).sort(compare);
        var incident_points2 = graph.getIncidentToVertex(closest_point2).sort(compare);
        
        var res = incident_points1.concat(incident_points2).sort(compare);
        var fourth_point = getDoublePoint(res);
        drawer.drawPoint(fourth_point, 'lime');
        /*
        if(getDistanсe(closest_points[0], closest_points[1]) > getDistanсe(points[i], fourth_point)) {
            graph.removeEdge(graph.findEdge(closest_points[0], closest_points[1]));
            graph.addEdge(fourth_point, points[i]);
            graph.addEdge(closest_points[0], points[i]);
            graph.addEdge(closest_points[1], points[i]);
        } else {
            graph.addEdge(closest_points[0], points[i]);
            graph.addEdge(closest_points[1], points[i]);
        }
        */ /*
        if(getDistanсe(closest_point, closest_point2) > getDistanсe(points[i], fourth_point)) {
            graph.removeEdge(graph.findEdge(closest_point, closest_point2));
            graph.addEdge(fourth_point, points[i]);
            graph.addEdge(closest_point, points[i]);
            graph.addEdge(closest_point2, points[i]);
        } else {
            graph.addEdge(closest_point, points[i]);
            graph.addEdge(closest_point2, points[i]);
        }
        drawer.drawGraph(graph);
    }
    drawer.drawGraph(graph);
    */
    dividePointSet(points);
    
    function dividePointSet(subset, is_horizontal_separator) {
        if(subset.length >= 3) {
            if(subset.length > 12) {
                var first_half = [],
                    second_half = [],
                    separator;
                if(is_horizontal_separator === undefined) {
                    is_horizontal_separator = true;
                }
                if(is_horizontal_separator) {
                    separator = Math.floor((subset[getMaxX(subset)].x + subset[getMinX(subset)].x) / 2);
                    //drawer.drawLine(separator, 0, separator, CANVAS_HEIGHT, 'yellow');
                    for(let i = 0; i < subset.length; i++) {
                        if(subset[i].x < separator) {
                            first_half.push(subset[i]);
                        } else {
                            second_half.push(subset[i]);
                        }
                    }
                } else {
                    separator = Math.floor((subset[getMaxY(subset)].y + subset[getMinY(subset)].y) / 2);
                    //drawer.drawLine(0, separator, CANVAS_WIDTH, separator, 'yellow');
                    for(let i = 0; i < subset.length; i++) {
                        if(subset[i].y < separator) {
                            first_half.push(subset[i]);
                        } else {
                            second_half.push(subset[i]);
                        }
                    }
                }
            
            
                //var first_half = subset.slice(0, Math.floor(subset.length/2));
                //var second_half = subset.slice(Math.floor(subset.length/2), subset.length);
                var color1 = 'rgb('+ getRandomInt(0,255)+ ','+getRandomInt(0,255)+ ','+ getRandomInt(0,255) +')',
                    color2 = 'rgb('+ getRandomInt(0,255)+ ','+getRandomInt(0,255)+ ','+ getRandomInt(0,255) +')';
                drawer.drawPoints(first_half, color1);
                drawer.drawPoints(second_half, color2);
                dividePointSet(first_half, !is_horizontal_separator);
                dividePointSet(second_half, !is_horizontal_separator);
            } else {
                switch(subset.length) {
                    case 3: 
                        drawer.drawPoints(subset, 'red');
                        drawer.drawTriange(subset[0], subset[1], subset[2], 'yellow');
                        break;
                    case 4:
                        drawer.drawPoints(subset, 'blue');
                        break;
                    case 5: 
                        drawer.drawPoints(subset, 'green');
                        break;
                    case 8:
                        subset.sort(compare);
                        dividePointSet(subset.slice(0, 4), !is_horizontal_separator);
                        dividePointSet(subset.slice(4), !is_horizontal_separator);
                        break;
                    default:
                        subset.sort(compare);
                        dividePointSet(subset.slice(0, 3), !is_horizontal_separator);
                        dividePointSet(subset.slice(3), !is_horizontal_separator);
                        break;
                }
            }
        }    
    }
} 

drawCircle.onclick = function () {
    drawer.clearCanvas();
    var three_points = genRandomPoints(3);
    drawer.drawPoints(three_points);
    var circle = getCircleByThreePoints(three_points[0], three_points[1], three_points[2]);
    if(circle) {
        drawer.drawCircle(circle);
    }
}

clearCanvas.onclick = function () {
    drawer.clearCanvas();
} 


/* LOGIC FUNCTIONS */

function compare(p1, p2) {
    if (p1.x < p2.x) {
        return -1;
    }
    if (p1.x > p2.x) {
        return 1;
    }
    if(p1.x = p2.x) {
        if(p1.y < p2.y) {
            return -1; 
        } 
        if(p1.y > p2.y) {
            return 1;
        }
        if(p1.y = p2.y) {
            return 0;
        }
    }
}

function getDoublePoint(points) {
    for(let i = 0; i < points.length - 1; i++) {
        if(compare(points[i], points[i + 1]) === 0) {
            return points[i];
        }
    }
    return -1;
}

function getCircleByThreePoints(a, b, c) {
    var mid_ab = new Point((a.x + b.x) / 2, (a.y + b.y) / 2),
        mid_bc = new Point((b.x + c.x) / 2, (b.y + c.y) / 2),
        line_ab = getLineByTwoPoints(a, b),
        line_bc = getLineByTwoPoints(b, c);
    if(isRighter(a, b, c) !== 0) {
        var perpendicular1 = getPerpendicularToLineInPoint(line_ab, mid_ab),
            perpendicular2 = getPerpendicularToLineInPoint(line_bc, mid_bc);
        var circle_center = getIntersectionPointOfTwoLines(perpendicular1, perpendicular2),
            radius = getDistanсe(circle_center, a);
        var circle = new Circle(circle_center.x, circle_center.y, radius);
        return circle;
    }
}

function getPerpendicularToLineInPoint(line, point) {
    var a1 = line.a,
        b1 = line.b;
    var x = point.x,
        y = point.y;
    var new_a = -b1,
        new_b = a1,
        new_c = - new_a * x - new_b * y;
    var res_line = new Line(new_a, new_b, new_c);
    return res_line;
}

// y = k1*x + b1, y = k2*x + b2
function getIntersectionPointOfTwoLines(a1, b1, c1, a2, b2, c2) {
    if(a1 instanceof Line) {
        var line1 = a1,
            line2 = b1;
        c1 = a1.c;
        a2 = b1.a;
        c2 = b1.c;
        b2 = b1.b;
        b1 = a1.b;
        a1 = a1.a;
    }
    var x, y;
    if(a1 * b2 - a2 * b1 !== 0) {
        x = - (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1);
        y = - (a1 * c2 - a2 * c1) / (a1 * b2 - a2 * b1);
    }  else  {
        if (a2 * c2 - a2 * c1 === 0 && b1 * c2 - b2 * c1 === 0) {
            // lines identical
            return line1;
        } else {
            // parallel lines
            return null;
        }
    }
    /*
    var x = (b2 - b1) / (k1 - k2),
        y = (b2 * k1 - k2 * b1) / (k1 - k2);
    */
    var point = new Point(x, y);
    return point;
}

function getLineByTwoPoints(p1, p2) {
    var a = p2.y - p1.y,
        b = p1.x - p2.x,
        c = p1.x * p2.y - p1.y * p2.x;
    //var k = (p1.y - p2.y) / (p1.x - p2.x),
    //    b = (p1.x * p2.y - p1.y * p2.x) / (p1.x - p2.x);
    var line = new Line(a, b, c);
    return line;
}

function getPoligonSquare(chain) {
    var min_y = points[getMaxY(points)],
        max_y = points[getMinY(points)];
    var central_point = new Point((min_y.x + max_y.x)/2, (min_y.y + max_y.y)/2);
    drawer.drawPoint(central_point, 'magenta');
    var common_square = 0;
    for(let i = 0; i < chain.length - 1; i++) {
        common_square += getTriangleSquare(chain[i], chain[i + 1], central_point); 
    }
    return common_square;
}

function getTriangleSquare(p1, p2, p3) {
    var a = getDistanсe(p1, p2),
        b = getDistanсe(p2, p3),
        c = getDistanсe(p1, p3);
    var p = (a + b + c) / 2;
    var square = Math.sqrt(p*(p - a)*(p-b)*(p-c));
    return square;
}

function getHull(points) {
    swapPoints(points[0], points[getMaxY(points)]);
    swapPoints(points[1], points[getMinY(points)]);
    
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

function swapPoints(a, b) {
    var temp = new Point(a.x, a.y);
    a.x = b.x;
    a.y = b.y;
    b.x = temp.x;
    b.y = temp.y;
}

// return index
function getMaxY(points) {
    var max_y = points[0].y,
        max_index = 0;  
    for(let i = 1; i < points.length; i++) {
        if(points[i].y > max_y) {
            max_y = points[i].y;
            max_index = i;
        }
    }
    return max_index;
}

// return index 
function getMinY(points) {
    var min_y = points[0].y,
        min_index = 0;  
    for(let i = 1; i < points.length; i++) {
        if(points[i].y < min_y) {
            min_y = points[i].y;
            min_index = i;
        }
    }
    return min_index;
}

// return index 
function getMaxX(points) {
    var max_x = points[0].x,
        max_index = 0;  
    for(let i = 1; i < points.length; i++) {
        if(points[i].y > max_x) {
            max_x = points[i].y;
            max_index = i;
        }
    }
    return max_index;
}

// return index 
function getMinX(points) {
    var min_x = points[0].x,
        min_index = 0;  
    for(let i = 1; i < points.length; i++) {
        if(points[i].y < min_x) {
            min_x = points[i].y;
            min_index = i;
        }
    }
    return min_index;
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

function getTwoClosestPoinsToPoint(vertices, point) {
    var p1_index = getClosestPoint(vertices, point);
    var p1 = vertices[p1_index];
    vertices = (vertices.slice(0, p1_index)).concat(vertices.slice(p1_index + 1));
    var p2_index = getClosestPoint(vertices, point);
    var p2 = vertices[p2_index];
    return [p1, p2];
}

function getClosestPoint(points, point) {
    var d = Number.POSITIVE_INFINITY,
        index;
    for(let i = 0; i < points.length; i++) {
        var r = getDistanсe(points[i], point);
        if(r < d) {
            index = i;
            d = r;
        }
    }
    return index;
}

function getDistanсe(x1, y1, x2, y2) {
    if(x1 instanceof Point) {
        var point1 = x1,
            point2 = y1;
        return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
    }
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
