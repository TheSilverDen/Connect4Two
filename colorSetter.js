const rows = 6;
const columns = 7;
const width = 400;
const height = 400;
const radius = Math.min(width/columns, height/rows)/2-5;

var brightness = 0.02;

var buff = new Uint8Array(rows*columns*3 + 3).fill(0);
var state = new Uint8Array(rows*columns*3 + 3).fill(0);
var lastLED = new Uint8Array(3);

document.getElementById("X").value = 0;
document.getElementById("Y").value = 0;

var x = document.getElementById("X").value;
var y = document.getElementById("Y").value;

var canvas = document.querySelector('#my-canvas');
var context = canvas.getContext('2d');
context.fillStyle='gray';
context.fillRect(0,0,canvas.width,canvas.height);

var xText = document.getElementById("X");
var yText = document.getElementById("Y");

function clearBuff(){
    buff.fill(0);
    renderCircle();
    write();
}

function fillCircle(x, y, radius, r, g, b, stroke) {
    context.fillStyle = "rgb("+r+", "+g+", "+b+")";
    context.strokeStyle = stroke;
    context.lineWidth = 3;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
}

function toggleTurnIndicator(){
    if (lastLED.every(item => item === 0)){
        lastLED.set([0, 255*brightness/100, 0], 0);
        document.getElementById("CHANGETURN").style.color = "#00ff00";
        write();
    } else {
        lastLED.set([0, 0, 0], 0);
        document.getElementById("CHANGETURN").style.color = "#ffffff";
        write();
    }
}

function renderCircle() {
    var buff_index = 0;
    for(var y=0; y<rows; y++){
        for(var x=0; x<columns; x++){
            var r = (buff[buff_index]*brightness);
            var g = (buff[buff_index+1]*brightness);
            var b = (buff[buff_index+2]*brightness);
            fillCircle((width/(columns*2))+(x*(width/columns)), (height/(rows*2))+(y*(height/rows)), radius, r, g, b, "black");
            buff_index = buff_index + 3;
        }
    }
}

function changeColor(btn, color) {
    btn.style.backgroundColor = color;
}

async function init() {
    if ('serial' in navigator) {
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
        } catch (err) {
            alert('There was an error opening the serial port:', err);
            console.error('There was an error opening the serial port:', err);
        } finally {
            changeColor(connect, "green");
        }
    } else {
        console.error('Web serial doesn\'t seem to be enabled in your browser.');
    }
}



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function setColor() {
    var theInput = document.getElementById("colorpicker");
    var color = theInput.value;

    var x = document.getElementById("X").value;
    var y = document.getElementById("Y").value;
    setGameColors(x, y, color);
}

function setBlack(x, y) {
    var black = "#000000";
    var index = ((y*columns)*3)+(3*x);
    buff[index] = hexToRgb(black).r;
    buff[1+index] = hexToRgb(black).g;
    buff[2+index] = hexToRgb(black).b;
    renderCircle();
    selectedCircle(this.x, this.y);
    write();
}

function deleteColumnAbove(x, y){
    const index = parseInt(x) * 3 + y * 21;
    buff[index - 21] = 0;
    buff[index+1 - 21] = 0;
    buff[index+2 - 21] = 0;
    write();
}

function setFallingRed(x){
    var lastFreeColumn = document.getElementById("Y").value;
    for (var y = 0; y <= lastFreeColumn; y++){
        deleteColumnAbove(x, y);
        setRed(x, y);
    }
}

function setFallingYellow(x){
    var lastFreeColumn = document.getElementById("Y").value;
    for (var y = 0; y <= lastFreeColumn; y++){
        deleteColumnAbove(x, y);
        setYellow(x, y);
    }
}

function setRed(x, y) {
    var color = "#ff0000";
    setGameColors(x, y, color);
}

function setYellow(x, y) {
    var color = "#FDB750"
    setGameColors(x, y, color);
}

function setGameColors(x, y, color){
    var index = ((y*columns)*3)+(3*x);
    buff[index] = hexToRgb(color).r;
    buff[1+index] = hexToRgb(color).g;
    buff[2+index] = hexToRgb(color).b;
    renderCircle();
    selectedCircle(this.x, this.y);
    write();
}

function fillRed(){
    for(var y=0; y<rows; y++){
        for(var x=0; x<columns; x++){
            setRed(x, y)
        }
    }
    selectedCircle(this.x, this.y);
}

function fillYellow(){
    for(var y=0; y<rows; y++){
        for(var x=0; x<columns; x++){
            setYellow(x, y);
        }
    }
    selectedCircle(this.x, this.y);
}

function saveState(){
    for (var i = 0; i < buff.length; i++){
        state[i] = buff[i];
    }
    write();
}

function loadState(){
    for (var i = 0; i < buff.length; i++){
        buff[i] = state[i];
    }
    write();
    renderCircle();
}

function selectedCircle(x, y){
    var index = ((y*columns)*3)+(3*x);
    renderCircle();
    fillCircle((width/(columns*2))+(x*(width/columns)), (height/(rows*2))+(y*(height/rows)),
        radius, buff[index], buff[index+1], buff[index+2], "green");
}

renderCircle();
selectedCircle(x, y);