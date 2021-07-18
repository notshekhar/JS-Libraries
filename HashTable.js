function HashTable(object, size) {
    this.length = size || 1
    this._ = new Array(this.length)
    this.size = 0

    this.hash = function (key) {
        let h = 1
        let keyLength = key.length
        for (let i = 0; i < keyLength; i++) {
            h += key.charCodeAt(i)
            h %= this.length
        }
        return h
    }
    const resize = function () {
        let oldLength = this.length
        this.length *= 2
        let newHashTable = new HashTable(false, this.length)
        for (let i = 0; i < oldLength; i++) {
            if (this._[i]) {
                this._[i].forEach((e) => {
                    newHashTable.set(e[0], e[1])
                })
            }
        }
        this._ = newHashTable._
    }
    this.has = function (key) {
        let index = this.hash(key)
        if (!this._[index]) return false
        return this._[index].find((e) => e[0] == key) ? true : false
    }
    this.set = function (key, value) {
        this.size++
        let loadFactor = this.length / this.size
        if (loadFactor < 0.8) resize.call(this)

        let index = this.hash(key)

        if (this.has(key)) return false

        if (this._[index]) this._[index].push([key, value])
        else this._[index] = [[key, value]]
        return true
    }
    if (object) {
        for (let key in object) {
            this.set(key, object[key])
        }
    }

    this.get = function (key) {
        let index = this.hash(key)
        if (!this._[index]) return false
        let find = this._[index].find((e) => e[0] == key)
        if (!find) return false
        return find[1]
    }
    this.delete = function (key) {
        let index = this.hash(key)
        if (!this._[index]) return false
        if (!this.has(key)) return false
        this._[index] = this._[index].filter((e) => e[0] != key)
        return true
    }
}

//----------------------------------TEST------------------------------------

// let h = new HashTable({
//     shekhar: "sdjshd",
//     a: "asdssd",
//     b: "sdfdfdf",
//     sjfhdf: "sjhdfjdf",
//     sjfdf: "sjhdfjdf",
//     sjff: "sjhdfjdf",
//     sjf: "sjhdfjdf",
//     sf: "sjhdfjdf",
//     f: "sjhdfjdf",
// })

// console.log(h._)
// console.log(h.get("shekhar"))
// console.log(h.delete("shekhar"))
// console.log(h.get("shekhar"))
// console.log(h._)
