/* DEBUG HELPER */

function pointsToStr(points) {
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