window.addEventListener("load", (event) => {
    setCurrentDateTime();
    dragElement(document.getElementById("pane"));
});

function setCurrentDateTime() {
    const now = new Date();
    document.getElementById("clock").innerHTML = now.getHours() + ":" + now.getMinutes();
}

function minimizePane(event) {
    document.getElementById(event.target.id)
        .parentElement.parentElement.parentElement.style.display = "none";
}

function maximizePane(event) {
    var pane = document.getElementById(event.target.id).parentElement.parentElement.parentElement;
    pane.style.width = "100%";
    pane.style.height = "94%";
    pane.style.left = "-2px";
    pane.style.top = "-2px";
}

function closePane(event) {
    document.getElementById(event.target.id)
        .parentElement.parentElement.parentElement.remove();
}

function disableRightClick(event) {
    if(event.button == 2) {
        event.preventDefault();
        return false;
    }
}

/* Modified function from https://www.w3schools.com/howto/howto_js_draggable.asp */
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var paneBar = document.getElementById(element.id + "-bar");
    paneBar.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        paneBar.style.cursor = "grabbing";
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
        paneBar.style.cursor = "grab";
        if(parseInt(element.style.top) <= -1) {
            element.style.top = "-1px";
        }
        var availableHeight = (window.innerHeight - document.getElementById("taskbar").offsetHeight);
        var paneBarHeight = document.getElementById("pane-bar").offsetHeight;
        var maxHeight = availableHeight - paneBarHeight/2;
        if(parseInt(element.style.top) >= maxHeight) {
            element.style.top = maxHeight + "px";
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }
}