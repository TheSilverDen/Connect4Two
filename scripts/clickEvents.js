const connect = document.getElementById('connect-to-serial');
const disconnect = document.getElementById('disconnect-to-serial');
const A = document.getElementById('send-A');
const set = document.getElementById('SET');
const clear = document.getElementById('CLEAR');
const singleRed = document.getElementById('SETRED');
const singleBlack = document.getElementById('SETBLACK');
const singleYellow = document.getElementById('SETYELLOW');
const turnIndicator = document.getElementById('CHANGETURN');
const allRed = document.getElementById('FILLRED');
const allYellow = document.getElementById('FILLYELLOW');
const savedState = document.getElementById("SAVESTATE");
const loadedState = document.getElementById("LOADSTATE");

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
brightness = slider.value;

slider.oninput = function() {
    output.innerHTML = slider.value + "%";
    brightness = this.value;
    renderCircle();
}

canvas.addEventListener('click', handleClick);

function handleClick(event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    const cellWidth = canvas.width / columns;
    const cellHeight = canvas.height / rows;

    const columnIndex = Math.floor(mouseX / cellWidth);
    const rowIndex = Math.floor(mouseY / cellHeight);

    xText.value = columnIndex;
    yText.value = rowIndex;
    x = xText.value;
    y = yText.value;

    selectedCircle(x, y);

}

connect.addEventListener('click', async () => {
    await init();
});

disconnect.addEventListener('click', async () => {
    if ("serial" in navigator && "forget" in SerialPort.prototype) {
        await port.forget();
        changeColor(connect,  "#111827");
        alert("disconnected from Serial Device");
    }
});

A.addEventListener('pointerdown', () => {
    write();
});

set.addEventListener('pointerdown', () => {
    setColor();
});

singleBlack.addEventListener('pointerdown', () => {
    setBlack(x, y);
});

singleRed.addEventListener('pointerdown', () => {
    setFallingRed(x, y);
});

singleYellow.addEventListener('pointerdown', () => {
    setFallingYellow(x, y);
});

turnIndicator.addEventListener('pointerdown', () => {
    toggleTurnIndicator();
});

allRed.addEventListener('pointerdown', () => {
    fillRed();
});

allYellow.addEventListener('pointerdown', () => {
    fillYellow();
});

savedState.addEventListener('pointerdown', () => {
    saveState();
});

loadedState.addEventListener('pointerdown', () => {
    loadState();
});


clear.addEventListener('pointerdown', () => {
    clearBuff();
});
