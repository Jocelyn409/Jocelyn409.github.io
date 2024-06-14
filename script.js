window.addEventListener("load", (event) => {
    setCurrentDateTime();
    dragElement(document.getElementById("pane"));
});

function setCurrentDateTime() {
    const now = new Date();
    document.getElementById("clock").innerHTML = now.getHours() + ":" + now.getMinutes();
}

/* Simplified from https://www.w3schools.com/howto/howto_js_draggable.asp */
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById(element.id + "-bar").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}