class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        console.log(this.toString())
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }

    init() {
        console.log(this.x)
    }
}
new Point(1,3)