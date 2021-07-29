function Point(x, y) {
    this.x = x
    this.y = y
}

function Boundary(x, y, x2, y2) {
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this.contains = function (point) {
        return (
            this.x <= point.x &&
            this.y <= point.y &&
            this.x2 >= point.x &&
            this.y2 >= point.y
        )
    }
    this.intersects = function (range) {
        return (
            this.contains(new Point(range.x, range.y)) ||
            this.contains(new Point(range.x2, range.y)) ||
            this.contains(new Point(range.x, range.y2)) ||
            this.contains(new Point(range.x2, range.y2))
        )
    }
}
function QuadTree({ x, y, x2, y2 }, capacity) {
    this.boundary = new Boundary(x, y, x2, y2)
    this.capacity = capacity
    this.points = []
    const subdivide = function () {
        this.topLeft = new QuadTree(
            {
                x: this.boundary.x,
                y: this.boundary.y,
                x2: this.boundary.x2 / 2,
                y2: this.boundary.y2 / 2,
            },
            this.capacity
        )
        this.topRight = new QuadTree(
            {
                x: this.boundary.x2 / 2,
                y: this.boundary.y,
                x2: this.boundary.x2,
                y2: this.boundary.y2 / 2,
            },
            this.capacity
        )
        this.bottomLeft = new QuadTree(
            {
                x: this.boundary.x,
                y: this.boundary.y2 / 2,
                x2: this.boundary.x2 / 2,
                y2: this.boundary.y2,
            },
            this.capacity
        )
        this.bottomRight = new QuadTree(
            {
                x: this.boundary.x2 / 2,
                y: this.boundary.y2 / 2,
                x2: this.boundary.x2,
                y2: this.boundary.y2,
            },
            this.capacity
        )
        this.divided = true
    }
    this.insert = function (point) {
        if (!this.boundary.contains(point)) return

        if (this.capacity != this.points.length) {
            this.points.push(point)
            return
        }

        if (!this.divided) subdivide.call(this)
        this.topLeft.insert(point)
        this.topRight.insert(point)
        this.bottomLeft.insert(point)
        this.bottomRight.insert(point)
    }
    this.query = function (range) {
        let found = []
        if (!this.boundary.intersects(range)) return found
        for (let point of this.points) {
            counter++
            if (range.contains(point)) found.push(point)
        }
        if (this.divided) {
            found = [...found, ...this.topLeft.query(range)]
            found = [...found, ...this.topRight.query(range)]
            found = [...found, ...this.bottomLeft.query(range)]
            found = [...found, ...this.bottomRight.query(range)]
        }
        return found
    }
}


let counter = 0
let root = new QuadTree({ x: 0, y: 0, x2: 100, y2: 100 }, 4)

for (let i = 0; i < 1000; i++) {
    let p = new Point(Math.random() * 100, Math.random() * 100)
    root.insert(p)
}
let range = new Boundary(10, 10, 20, 20)
let q = root.query(range)

console.log(q, q.length, counter)
