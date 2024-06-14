window.addEventListener("load", (event) => {
    setCurrentDateTime();
    dragElement(document.getElementById("pane"));
});

function setCurrentDateTime() {
    const now = new Date();
    document.getElementById("clock").innerHTML = now.getHours() + ":" + now.getMinutes();
}

