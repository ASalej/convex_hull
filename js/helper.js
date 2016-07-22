/* DEBUG HELPER */

function pointsToStrForInput(points) {
    var result = '['; 
    for (let i = 0; i < points.length; i++) {
        result += 'new Point(' + points[i].x + ',' + points[i].y + ')';
        if (i !== points.length - 1) {
            result += ','
        }
    }
    result += ']';
    return result;
}

function pointsToStr(points) {
    var result = ''; 
    for (let i = 0; i < points.length; i++) {
        result += 'x: ' + points[i].x + ' y: ' + points[i].y;
        if (i !== points.length - 1) {
            result += '\n'
        }
    }
    return result;
}