class Circle {
    constructor(xCenter, yCenter, radius) {
        this.xCenter = xCenter;
        this.yCenter = yCenter;
        this.radius = radius;
    }
    
    isOnCircle(x, y) {
        if ((x - this.xCenter) * (x - this.xCenter) + 
            (y - this.yCenter) * (y - this.yCenter) === this.radius) {
               return true;
        } else {
            return false;
        }
           
    }
}