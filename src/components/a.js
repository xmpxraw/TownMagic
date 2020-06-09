class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.init()
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }

    init() {
        console.log(this.y)
    }
}
new Point(1,3)