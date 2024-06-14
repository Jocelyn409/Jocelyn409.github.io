window.addEventListener("load", (event) => {
    setCurrentDateTime();
});

function setCurrentDateTime() {
    const now = new Date();
    document.getElementById("clock").innerHTML = now.getHours() + ":" + now.getMinutes();
}