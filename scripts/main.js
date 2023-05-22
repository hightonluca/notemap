// const SQUARE_SIZE = 44;

// const gridContainer = document.querySelector("#gridContainer")

// function getWindowWidth() { return window.innerWidth * 1.2; }
// function getWindowHeight() { return window.innerHeight * 1.1; }

// gridContainer.style.height = `${getWindowHeight()}px`;
// gridContainer.style.width = `${getWindowWidth()}px`;

// function getGridResolution() {
//     return {
//         x: Math.ceil((getWindowWidth()) / SQUARE_SIZE),
//         y: Math.ceil((getWindowHeight()) / SQUARE_SIZE),
//     }
// }

// function reportWindowSize() {
//     const w = getWindowWidth();
//     const h = getWindowHeight();
//     heightOutput.textContent = h + `px, which can fit ${h / SQUARE_SIZE} squares`;
//     widthOutput.textContent = w + `px, which can fit ${w / SQUARE_SIZE} squares`;
// }

// function addSquare(text) {
//     const square = document.createElement("div");
//     square.className = "gridSquare"
//     square.innerText = text
//     gridContainer.appendChild(square)
// }

// function createGrid() {
//     const grid = getGridResolution()
//     const totalSquares = grid.x * grid.y
//     // console.log(totalSquares)
//     for (const s of Array(totalSquares).keys()) {
//         // addSquare(s);
//         addSquare("");
//     }
// }

// // window.onresize = reportWindowSize;

// createGrid();

// // reportWindowSize();

// // Make the DIV element draggable:
// const noteContainer = document.querySelector("#noteContainer")

// makeScreenDraggable(gridContainer, noteContainer);

// const camPosition = {
//     x: 0,
//     y: 0,
// }

// let x = 0;
// let y = 0;

// const coords = document.querySelector("#coords");

// function getXoffset() {return x % SQUARE_SIZE}
// function getYoffset() {return y % SQUARE_SIZE}

// function updateCords() {
//     let {x, y} = camPosition
//     coords.innerText = `x = ${Math.ceil(x / SQUARE_SIZE)}, y = ${Math.ceil(y / SQUARE_SIZE)}`;
// }

// function makeScreenDraggable(grid, notes) {
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
//     //move the DIV from anywhere inside the DIV:
//     grid.onmousedown = dragMouseDown;

//     handleDragMobile();

//     function dragMouseDown(e) {
//         if (e.button === 1) {
//             e = e || window.event;
//             e.preventDefault();
//             // get the mouse cursor position at startup:
//             pos3 = e.clientX;
//             pos4 = e.clientY;
//             document.onmouseup = closeDragElement;
//             // call a function whenever the cursor moves:
//             document.onmousemove = elementDrag;
//         }
//     }

//     function elementDrag(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // calculate the new cursor position:
//         pos1 = pos3 - e.clientX;
//         pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         drag()
//     }

//     function drag() {
//         x += pos1;
//         y += pos2;
//         updateCords();
//         // set the element's new position:
//         grid.style.top = (-getYoffset()) + "px";
//         grid.style.left = (-getXoffset()) + "px";
//         notes.style.top = (notes.offsetTop - pos2) + "px";
//         notes.style.left = (notes.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement() {
//         // stop moving when mouse button is released:
//         document.onmouseup = null;
//         document.onmousemove = null;
//     }

//     function handleDragMobile() {
//         window.addEventListener('touchstart', e => {
//             e = e || window.event;
//             e.preventDefault();
//             // get the mouse cursor position at startup:
//             pos3 = e.touches[0].clientX;
//             pos4 = e.touches[0].clientY;
//             document.onmouseup = closeDragElement;
//             // call a function whenever the cursor moves:
//             document.onmousemove = elementDrag;
//         });
    
//         window.addEventListener('touchmove', e => {
//             e = e || window.event;
//             e.preventDefault();
//             // calculate the new cursor position:
//             pos1 = pos3 - e.touches[0].clientX;
//             pos2 = pos4 - e.touches[0].clientY;
//             pos3 = e.touches[0].clientX;
//             pos4 = e.touches[0].clientY;
//             drag()
//         });
//     }
// }

// function createNote(note, noteContainer) {

//     const state = {
//         offset: {
//             x: 0,
//             y: 0,
//         },
//         pos: {
//             x: note.x * SQUARE_SIZE,
//             y: note.y * SQUARE_SIZE,
//         }
//     }

//     const noteElmnt = document.createElement('div')
//     noteElmnt.className = "note"
//     noteElmnt.innerText = note.text
//     displaceNote(state.pos)
//     noteElmnt.style.width = (SQUARE_SIZE * (note.w || 3)) + "px"
//     noteElmnt.style.height = (SQUARE_SIZE * (note.h || 3)) + "px"

//     noteElmnt.onmousedown = (e) => {
//         console.log("offset:" , e.layerX)
//         state.offset = {
//             x: e.layerX,
//             y: e.layerY,
//         }
//         // displaceNote(state.offset)

//         noteElmnt.onmousemove = dragNote
//     }

//     noteElmnt.onmouseup = (e) => {
//         noteElmnt.onmousemove = null
//     }
    
//     function dragNote (e) {
//         console.log(getXoffset())
//         const newPos = {
//             x: e.clientX - state.offset.x,
//             y: e.clientY - state.offset.y,
//         }
//         displaceNote(newPos)
//     }

//     function displaceNote ({x, y}) {
//         // console.log(`Moved to ${x}, ${y}`)
//         noteElmnt.style.top = (y) + "px"
//         noteElmnt.style.left = (x) + "px"
//     }

//     noteContainer.appendChild(noteElmnt)
// }

// function createNotes(noteContainer) {
//     const notes = [
//         {
//             text: "This is a note!",
//             x: 0,
//             y: 0,
//         },
//         {
//             text: "This is an even bigger note! sometime in the near future, notes will be resizable",
//             x: 5,
//             y: 5,
//             w: 5,
//             h: 5,
//         },
//         {
//             text: "This is a small ass note with a shitton of text, it will cut off at some point",
//             x: 0,
//             y: 5,
//             w: 1,
//             h: 1,
//         },
//     ]

//     for (const note of notes) {
//         createNote(note, noteContainer)
//     }
// }

// createNotes(noteContainer)
createGrid()
createNotes()