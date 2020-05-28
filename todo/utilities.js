/*
do a querySelector lookup
@param {string} selector The selector passed to querySelector
@return {element} The matching element or null if not found */
function qs(selector) {
    return document.querySelector(selector);
}

/*
do a querySelector lookup 
@param {string} selector The selector passed to querySelector
@return {element} All The matching element or null if not found */
function qsAll(selector) {
    return document.querySelectorAll(selector);
}

/*
add a touchend event listener to an element for mobile with a click event fallback for desktops 
@param {string} elementSelector The selector for the element to attach the listener to
@param {function} callback The callback function to run
*/
function onTouch(elementSelector, callback) {
    const element = qs(elementSelector);
    element.addEventListener("click", callback);
    element.addEventListener("touchend", callback)
}

function setCallbacks(selector, callback) {
    const elements = qsAll(selector);
    Array.from(elements).forEach(ele => {
        onTouch('#' + ele.id, callback);
    });
}

export {qs, setCallbacks, onTouch};