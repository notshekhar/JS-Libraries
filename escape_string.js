const escape_string = (unsafe) =>
    unsafe.replace(/[^]/g, function (e) {
        return "&#" + e.charCodeAt(0) + ";"
    })
