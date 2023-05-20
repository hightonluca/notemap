const SQUARE_SIZE = 44;

console.log(document.styleSheets[0].cssRules)

const heightOutput = document.querySelector("#height");
const widthOutput = document.querySelector("#width");

const gridContainer = document.querySelector("#gridContainer")

function getWindowWidth() { return window.innerWidth * 1.1; }
function getWindowHeight() { return window.innerHeight * 1.1; }

gridContainer.style.height = `${getWindowHeight()}px`;
gridContainer.style.width = `${getWindowWidth()}px`;

function getGridResolution() {
    return {
        x: Math.ceil((getWindowWidth()) / SQUARE_SIZE),
        y: Math.ceil((getWindowHeight()) / SQUARE_SIZE),
    }
}

function reportWindowSize() {
    const w = getWindowWidth();
    const h = getWindowHeight();
    heightOutput.textContent = h + `px, which can fit ${h / SQUARE_SIZE} squares`;
    widthOutput.textContent = w + `px, which can fit ${w / SQUARE_SIZE} squares`;
}

function addSquare(text) {
    const square = document.createElement("div");
    square.className = "gridSquare"
    square.innerText = text
    gridContainer.appendChild(square)
}

function createGrid() {
    const grid = getGridResolution()
    const totalSquares = grid.x * grid.y
    console.log(totalSquares)
    for (const s of Array(totalSquares).keys()) {
        // addSquare(s);
        addSquare("");
    }
}

window.onresize = reportWindowSize;

createGrid();

reportWindowSize();

// Make the DIV element draggable:
dragElement(document.getElementById("gridContainer"));

let x = 0;
let y = 0;

const coords = document.querySelector("#coords");

function getXoffset() {return x % SQUARE_SIZE}
function getYoffset() {return y % SQUARE_SIZE}

function updateCords() {
    coords.innerText = `x = ${Math.ceil(x / SQUARE_SIZE)}, y = ${Math.ceil(y / SQUARE_SIZE)}`;
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    //move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.button === 1) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        x += pos1;
        y += pos2;
        updateCords();
        // set the element's new position:
        elmnt.style.top = (-getYoffset()) + "px";
        elmnt.style.left = (-getXoffset()) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}