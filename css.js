//get and set css variables
function css(name, value) {
    if (name[0] != "-") name = "--" + name //allow passing with or without --
    if (value) document.documentElement.style.setProperty(name, value)
    return getComputedStyle(document.documentElement).getPropertyValue(name)
}