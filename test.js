var should = chai.should();

describe('#getLineByTwoPoints(p1, p2)', function () {
        it('(0, 0), (5, 5)', function () {
            var p1 = new Point(0, 0), p2 = new Point(5, 5);
            var line1 = new Line(1, -1, 0);
            var result = getLineByTwoPoints(p1, p2);
            (result.a/result.b).should.equal(line1.a/line1.b);
        });
        it('(0, 0), (0, 5)', function () {
            var p1 = new Point(0, 0), p2 = new Point(0, 5);
            var line1 = new Line(1, 0, 0);
            var result = getLineByTwoPoints(p1, p2);
            (result.a/result.b).should.equal(line1.a/line1.b);
            
            (result.a).should.not.equal(0);
            (result.b).should.equal(0);
            (result.c).should.equal(0);
        });
        it('(5, 0), (0, 5)', function () {
            var p1 = new Point(5, 0), p2 = new Point(0, 5);
            var line1 = new Line(1, 1, 5);
            var result = getLineByTwoPoints(p1, p2);
            (result.a/result.b).should.equal(line1.a/line1.b);
            (result.a/result.c).should.equal(line1.a/line1.c);
        });
});

describe('#getIntersectionPointOfTwoLines(line1, line2)', function () {
        it('(1, -1, 0), (1, 1, 4) ', function () {
            var line1 = new Line(1, -1, 0),
                line2 = new Line(1, 1, 4);
            var res_point = new Point (-2, -2);
            (getIntersectionPointOfTwoLines(line1, line2).x).should.equal(res_point.x);
            (getIntersectionPointOfTwoLines(line1, line2).y).should.equal(res_point.y);
        });
        it('(1, -1, 0), (0, 1, 0) ', function () {
            var line1 = new Line(1, -1, 0),
                line2 = new Line(0, 1, 0);
            var res_point = new Point (0, 0);
            (getIntersectionPointOfTwoLines(line1, line2).x).should.equal(res_point.x);
            (getIntersectionPointOfTwoLines(line1, line2).y).should.equal(res_point.y);
        });
        it('(1, 1, 0), (0, 1, -6) ', function () {
            var line1 = new Line(1, 1, 0),
                line2 = new Line(0, 1, -6);
            var res_point = new Point (-6, 6);
            (getIntersectionPointOfTwoLines(line1, line2).x).should.equal(res_point.x);
            (getIntersectionPointOfTwoLines(line1, line2).y).should.equal(res_point.y);
        });
        it('(1, 0, 0), (1, 0, 8) ', function () {
            // var a = new Point(), b = new Point(), c = new Point();
            var line1 = new Line(1, 0, 0),
                line2 = new Line(1, 0, 8);
                should.equal(getIntersectionPointOfTwoLines(line1, line2), null);
        });
        it('(1, 0, 0), (5, 0, 0) ', function () {
            // var a = new Point(), b = new Point(), c = new Point();
            var line1 = new Line(1, 0, 0),
                line2 = new Line(5, 0, 0);
            (getIntersectionPointOfTwoLines(line1, line2)).should.equal(line1);
        });
});

describe('#getPerpendicularToLineInPoint(line, point)', function() {
    it('(1, 1, -4), (2, 2) ', function () {
        var line = new Line(1, 1, -4),
            point = new Point(2, 2);
        var result = getPerpendicularToLineInPoint(line, point);
        var res_line = new Line (1, -1, 0);
        (result.a/result.b).should.equal(res_line.a/res_line.b);
        (result.c/result.a).should.equal(res_line.c/res_line.a);
    });
    it('(1, 0, 0), (0, 5) ', function () {
        var line = new Line(1, 0, 0),
            point = new Point(0, 5);
        var result = getPerpendicularToLineInPoint(line, point);
        var res_line = new Line (0, 1, -5);
        (result.b/result.c).should.equal(res_line.b/res_line.c);
        (result.a/result.c).should.equal(res_line.a/res_line.c);
    });
});

describe('#getCircleByThreePoints(a, b, c)', function() {
   it('((1, 4), (1, 1), (5, 1))', function () {
        var a = new Point(1, 4),
            b = new Point(1, 1),
            c = new Point(5, 1);
        var result = getCircleByThreePoints(a, b, c);
        var res_circle = new Circle(3, 2.5, 2.5);
        (result.xCenter).should.equal(res_circle.xCenter);
        (result.yCenter).should.equal(res_circle.yCenter);
        (result.radius).should.equal(res_circle.radius);
   }) 
});