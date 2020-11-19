function createElement(e, attrs) {
    let el = document.createElement(e)
    for (let attr in attrs) {
        const value = attrs[attr]
        if (attr == "innerText") el.innerText = value
        else if (attr == "innerHTML") el.innerHTML = value
        else el.setAttribute(attr, value)
    }
    return el
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this)
}
Element.prototype.css = function (styles) {
    for (let style in styles) {
        this.style[style] = styles[style]
    }
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i])
        }
    }
}
