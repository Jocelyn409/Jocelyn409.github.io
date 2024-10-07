var panes = [];

window.addEventListener("load", (event) => {
    setCurrentDateTime();
    
    panes.push(document.getElementById("browser-pane"), document.getElementById("folder-pane"));
    panes.forEach(pane => {
        dragElement(pane);
    });
});

function bringToFront(event) { // needs work
    panes.forEach(pane => {
        pane.style.zIndex = 0;
    })
    document.getElementById(event.target.id).style.zIndex = 1;
}

function setCurrentDateTime() {
    const now = new Date();
    document.getElementById("clock").innerHTML = now.getHours() + ":" + now.getMinutes();
}

function minimizePane(event) {
    var pane = document.getElementById(event.target.id).parentElement.parentElement.parentElement;
    pane.classList.add("scale-out-center");
}

function maximizePane(event) {
    var pane = document.getElementById(event.target.id).parentElement.parentElement.parentElement;
    pane.style.width = "100%";
    pane.style.height = "94%";
    pane.style.left = "-2px";
    pane.style.top = "-2px";
}

function closePane(event) {
    var pane = document.getElementById(event.target.id).parentElement.parentElement.parentElement;

    pane.classList.add("fade-out");
    setTimeout(() => {
        pane.remove();
    }, 151);
}

function browserIconClick() {
    if(document.getElementById("browser-pane") != null) {
        document.getElementById("browser-pane").classList.remove("scale-out-center");
    }
    else {
        var closedBrowserPane = panes.at(0);
        closedBrowserPane.classList.remove("fade-out");
        document.getElementById("OS").appendChild(closedBrowserPane);
    }
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
        for(child of document.getElementById(element.id + "-buttons").children) {
            if(e.target.id === child.id) {
                return;
            }
        }
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

    function snapPane() {
        var availableHeight = 
            (document.getElementById("desktop").offsetHeight 
            - document.getElementById("taskbar").offsetHeight);
        var paneBarHeight = paneBar.offsetHeight;
        var maxHeight = availableHeight - paneBarHeight / 2;
        if(parseInt(element.style.top) >= maxHeight) {
            element.style.top = maxHeight + "px";
        }
        else if(parseInt(element.style.top) <= -1) {
            element.style.top = "-1px";
        }

        var screenWidth = document.getElementById("desktop").offsetWidth;
        var paneWidth = document.getElementById(element.id).offsetWidth;
        var panePosition = document.getElementById(element.id).style.left.split("px")[0];
        if((screenWidth - panePosition) < paneWidth / 10) {
            element.style.left = (screenWidth - (paneWidth / 10)) + "px";
        }
        else if(panePosition <= (paneWidth / 1.5) * -1) {
            element.style.left = (paneWidth / 1.5) * -1 + "px";
        }
    }

    function closeDragElement() {
        paneBar.style.cursor = "grab";
        snapPane();
        document.onmouseup = null;
        document.onmousemove = null;
    }
}