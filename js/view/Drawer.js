class Drawer {
    constructor(canvas, h, w) {
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.canvas.height = h;
        this.canvas.width = w;
    }
    
    /* DRAW FUNCTIONS */
    
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawPoint(point, color) {
        if(color !== 'undefined') {
            this.context.fillStyle = color;
        }
        this.context.beginPath();
        this.context.arc(point.x, point.y, 2, 0, 2 * Math.PI, false);
        this.context.fill();
    }

    drawPoints(points, color) {
        for (let i = 0; i < points.length; i++) {
            this.drawPoint(points[i], color);
        }
    }
    
    drawLine(x1, y1, x2, y2, color) {
        if (color !== 'undefined') {
            this.context.strokeStyle = color;
        }
        if(x1 instanceof Point) {
            var point1 = x1;
            var point2 = y1;
            this.context.beginPath();
            this.context.moveTo(point1.x, point1.y);
            this.context.lineTo(point2.x, point2.y);
            this.context.stroke();
        } else {
            this.context.beginPath();
            this.context.moveTo(x1, y1);
            this.context.lineTo(x2, y2);
            this.context.stroke();
        }
    }
    
    drawPoligon(points, color) {
        if (color !== 'undefined') {
            this.context.strokeStyle = color;
        }
        this.context.beginPath();
        this.context.moveTo(points[0].x, points[0].y);
        for(let i = 1; i < points.length; i++) {
            this.context.lineTo(points[i].x, points[i].y);
        }
        this.context.stroke();
    }
    
    drawCircle(circle) {
        this.context.beginPath();
        this.context.arc(circle.xCenter, circle.yCenter, circle.radius, 0, 2 * Math.PI, false);
        this.context.stroke();
    }
}