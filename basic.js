
//draw a line on canvas
function line(ctx, stroke, width, x, y, nx, ny) {
    ctx.beginPath()
    ctx.strokeStyle = stroke
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = width
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.stroke()
}

//simplify a curve
function rdp(points, tolerance) {
    let rdppoints = new Array()
    let start = points[0]
    let end = points[points.length - 1]
    rdppoints.push(start)
    g(0, points.length - 1, points, rdppoints, tolerance)
    rdppoints.push(end)
    return rdppoints
}

function g(start, end, points, rdppoints, tolerance) {
    let nextIndex = o(points, start, end, tolerance)
    let nextPoint = points[nextIndex]
    if (nextIndex > 0) {
        if (start != nextIndex) {
            g(start, nextIndex, points, rdppoints, tolerance)
        }
        rdppoints.push(nextPoint)
        if (end != nextIndex)
            g(nextIndex, end, points, rdppoints, tolerance)
    }
}

function perpendicularDistance(a, b, c) {
    return 100
}

function o(arr, a, b, tolerance) {
    let maxDistance = 0
    let index
    for (let i = a + 1; i < b; i++) {
        let d = perpendicularDistance(arr[a], arr[b], arr[i])
        if (d > maxDistance) {
            maxDistance = d
            index = i
        }
    }
    if (maxDistance > tolerance) {
        return index
    } else {
        return -1
    }
}

//rdp 2
function simplifyPath(points, tolerance) {
    // helper classes 
    var Vector = function (x, y) {
        this.x = x;
        this.y = y;

    };
    var Line = function (p1, p2) {
        this.p1 = p1;
        this.p2 = p2;

        this.distanceToPoint = function (point) {
            // slope
            var m = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x),
                // y offset
                b = this.p1.y - (m * this.p1.x),
                d = [];
            // distance to the linear equation
            d.push(Math.abs(point.y - (m * point.x) - b) / Math.sqrt(Math.pow(m, 2) + 1));
            // distance to p1
            d.push(Math.sqrt(Math.pow((point.x - this.p1.x), 2) + Math.pow((point.y - this.p1.y), 2)));
            // distance to p2
            d.push(Math.sqrt(Math.pow((point.x - this.p2.x), 2) + Math.pow((point.y - this.p2.y), 2)));
            // return the smallest distance
            return d.sort(function (a, b) {
                return (a - b); //causes an array to be sorted numerically and ascending
            })[0];
        };
    };

    var douglasPeucker = function (points, tolerance) {
        if (points.length <= 2) {
            return [points[0]];
        }
        var returnPoints = [],
            // make line from start to end 
            line = new Line(points[0], points[points.length - 1]),
            // find the largest distance from intermediate poitns to this line
            maxDistance = 0,
            maxDistanceIndex = 0,
            p;
        for (var i = 1; i <= points.length - 2; i++) {
            var distance = line.distanceToPoint(points[i]);
            if (distance > maxDistance) {
                maxDistance = distance;
                maxDistanceIndex = i;
            }
        }
        // check if the max distance is greater than our tollerance allows 
        if (maxDistance >= tolerance) {
            p = points[maxDistanceIndex];
            line.distanceToPoint(p, true);
            // include this point in the output 
            returnPoints = returnPoints.concat(douglasPeucker(points.slice(0, maxDistanceIndex + 1), tolerance));
            // returnPoints.push( points[maxDistanceIndex] );
            returnPoints = returnPoints.concat(douglasPeucker(points.slice(maxDistanceIndex, points.length), tolerance));
        } else {
            // ditching this point
            p = points[maxDistanceIndex];
            line.distanceToPoint(p, true);
            returnPoints = [points[0]];
        }
        return returnPoints;
    };
    var arr = douglasPeucker(points, tolerance);
    // always have to push the very last point on so it doesn't get left off
    arr.push(points[points.length - 1]);
    return arr;
};
///end


//map a number between two numbers
function map(num, min, max, a, b) {
    let ratio = (num - min) / (min + max)
    return (ratio * (a + b)) + a
}


function queue(data) {
    this.data = data || []
    this.add = e => {
        this.data.push(e)
    }
    this.pop = () => {
        if (this.data.length > 0) {
            return this.data.splice(0, 1)[0]
        } else {
            console.error('No data remained in Queue')
            return
        }
    }
}

function stack(data) {
    this.data = data || []
    this.add = e => {
        this.data.push(e)
    }
    this.pop = () => {
        if (this.data.length > 0) {
            return this.data.splice(this.data.length - 1, 1)[0]
        } else {
            console.error('No data remained in Stack')
            return
        }
    }
}



function reshape(arr, shape) {
    let mul = 1
    shape.forEach(element => {
        mul *= element
    })
    console.log(arr.length, mul)

    if (arr.length != mul) {
        console.error(`cannot reshape array of size ${arr.length} into shape (${shape.map(e=>`${e}`).join(", ")})`)
        return
    }


    let array = arr
    // let arr = array
    let a = []
    for (let i = 0; i < shape[0]; i++) {  
        a.push([])
    }
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < shape[1]; j++) {
            a[i].push([])
        }
    }
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
            for (let k = 0; k < shape[2]; k++) {
                a[i][j].push(arr[0])
                arr.splice(0, 1)
            }
        }
    }
    return a
    // let a = []
    // //recursion maybe
    // for (let i = 0; i < shape.length; i++) {

    // }
    // return a
}