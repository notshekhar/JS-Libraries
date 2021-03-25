function Node() {
    this.values = null
    this.end = false
    this.add = (v, t) => {
        if (!this.values) this.values = {}
        if (!this.values[v]) this.values[v] = new Node()
    }
}
function Trees() {
    this.root = new Node()
    this.add = (s) => {
        let temp = this.root
        for (let i = 0; i < s.length; i++) {
            temp.add(s[i])
            if (i == s.length - 1) temp.values[s[i]].end = true
            temp = temp.values[s[i]]
        }
    }
    this.search = (s) => {
        let temp = this.root
        for (let i = 0; i < s.length; i++) {
            if (!temp.values) return false
            if ((i == s.length - 1) & !temp.values[s[i]].end) return false
            if (!temp.values[s[i]]) return false
            temp = temp.values[s[i]]
        }
        return true
    }
}

