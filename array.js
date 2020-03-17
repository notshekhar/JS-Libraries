//function to reshape the array 
Array.prototype.reshape = function (rows, cols) {
    var copy = this.slice(0); // Copy all elements.
    this.length = 0; // Clear out existing array.
    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            var i = r * cols + c;
            if (i < copy.length) {
                row.push(copy[i]);
            }
        }
        this.push(row);
    }
}
