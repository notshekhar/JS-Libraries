const $ = function (selector) {
    if (typeof selector == "string" || selector instanceof String)
        return new Element(...document.querySelectorAll(selector))
    else return new Element(selector)
}

$.get = function ({ url, data = {}, success = () => {} }) {
    const queryString = Object.entries(data)
        .map(([key, value]) => {
            return `${key}=${value}`
        })
        .join("&")
    return new Ajax(
        fetch(`${url}?${queryString}`)
            .then((e) => {
                if (e.ok) return e.json()
                else throw new Error(e.status)
            })
            .then((d) => {
                success(d)
                return d
            })
    )
}

$.random = function(min, max) {
    return Math.random() * (max - min + 1) + min
}
$.limit = function(value, min, max) {
    if (value > min && value < max) return value
    if (value < min) return min
    if (value > max) return max
}
$.scale = function(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
$.canvas = function(canvas){
    if(canvas instanceof HTMLElement) return new Canvas(canvas)
    if(canvas instanceof Element) return new Canvas(canvas[0])
    if(typeof canvas == "string" || canvas instanceof String) return new Canvas(new Element(document.querySelector(canvas)))
}
class Canvas{
    constructor(canvas){
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
    }
    line(x, y, nx, ny, stroke_color, width) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = stroke_color || "white"
        this.ctx.lineJoin = "round"
        this.ctx.lineCap = "round"
        this.ctx.lineWidth = width || 1
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(nx, ny)
        this.ctx.stroke()
    }
    clearCanvas(color){
        this.ctx.fillStyle = color || "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    rect({x, y, width, fill, stroke, strokeWidth, strokeColor, fillColor}){
        //code
    }
}

class Ajax {
    constructor(p) {
        this.promise = p
    }
    done(cb) {
        this.promise = this.promise.then((data) => {
            cb(data)
            return data
        })
        return this
    }
    fail(cb) {
        this.promise = this.promise.catch(cb)
        return this
    }
    always(cb) {
        this.promise = this.promise.finally(cb)
        return this
    }
}

class Element extends Array {
    on(event, cb) {
        this.forEach((element) => {
            element.addEventListener(event, cb)
        })
        return this
    }
    hide() {
        this.forEach((element) => {
            element.style.display = "none"
        })
        return this
    }
    show() {
        this.forEach((element) => {
            element.style.display = "block"
        })
        return this
    }
    addClass(name) {
        this.forEach((element) => {
            element.classList.add(name)
        })
        return this
    }
    removeClass(name) {
        this.forEach((element) => {
            element.classList.remove(name)
        })
        return this
    }
    next() {
        return this.map((element) => element.nextElementSibling)
    }
    previous() {
        return this.map((element) => element.previousElementSibling)
    }
    css(properties) {
        this.forEach((element) => {
            for (let key in properties) {
                element.style[key] = properties[key]
            }
        })
        return this
    }
}

console.log(
    $(".test")
        .css({
            backgroundColor: "red",
            height: "100px",
            width: "100px",
        })
        .on("click", () => alert(0))
        .hide()
        .next()
        .previous()
        .show()
)
console.log($(document))

$.get({
    url: "https://notshekhar.github.io/js/notshekhar.json",
    data: {},
    success: (data) => {
        console.log(data)
    },
}).done((data) => console.log(data))
