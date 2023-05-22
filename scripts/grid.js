const SQUARE_SIZE = 44;

function createSquare() {
    const square = document.createElement("div")
    square.className = "gridSquare"
    return square
}

function createGrid() {

    const callback = {
        onMoveScreen: function (x, y) {
            console.log("Override this!", x, y)
        }
    }

    const state = {
        handlePos: {
            x: 0,
            y: 0,
        },
        pos: {
            x: 0,
            y: 0,
        },
        prevPos: {
            x: 0,
            y: 0,
        }
    }

    const gridElmnt = document.createElement("div")
    gridElmnt.id = "gridContainer"

    // add 2 squares to grid height and width
    // this allows the illusion of an infinite grid, since the user never sees it ending 
    const gridWidthPx = window.innerWidth + SQUARE_SIZE * 2
    const gridHeightPx = window.innerHeight + SQUARE_SIZE * 2

    const gridWidthSquares = Math.ceil(gridWidthPx / SQUARE_SIZE);
    const gridHeightSquares = Math.ceil(gridHeightPx / SQUARE_SIZE);
    const totalSquares = gridWidthSquares * gridHeightSquares

    //set grid dimensions
    gridElmnt.style.width = gridWidthPx + "px";
    gridElmnt.style.height = gridHeightPx + "px";

    let gridElmntMobile = null

    ontouchstart = function (e) {
        e.preventDefault()
        startMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    ontouchmove = function (e) {
        e.preventDefault()

        if (gridElmntMobile === null) {
            gridElmntMobile = document.querySelector("#gridContainer")
        }

        state.prevPos = {
            x: e.touches[0].clientX - state.handlePos.x,
            y: e.touches[0].clientY - state.handlePos.y,
        }

        gridElmntMobile.style.left = ((state.pos.x + state.prevPos.x) % SQUARE_SIZE) + "px"
        gridElmntMobile.style.top = ((state.pos.y + state.prevPos.y) % SQUARE_SIZE) + "px"

        const debugText = `X: ${Math.floor((state.pos.x + state.prevPos.x) / SQUARE_SIZE)}, Y: ${Math.floor((state.pos.y + state.prevPos.y) / SQUARE_SIZE)}`
        debug(debugText)
    }

    ontouchend = function (e) {
        state.pos.x += state.prevPos.x
        state.pos.y += state.prevPos.y

        state.prevPos = {
            x: 0,
            y: 0,
        }

        // const debugText = `X: ${state.pos.x}, Y: ${state.pos.y} \nprev\nX: ${state.prevPos.x}, Y: ${state.prevPos.y} `
        // debug(debugText)
    }

    gridElmnt.onmousedown = function (e) {
        const isWheelDown = e.buttons === 4

        if (isWheelDown) {
            e.preventDefault()
            startMove(e.layerX, e.layerY)
        }
    }

    gridElmnt.onmousemove = function (e) {
        const isWheelDown = e.buttons === 4

        if (isWheelDown) {
            const moveX = e.pageX - state.handlePos.x
            const moveY = e.pageY - state.handlePos.y
            moveElmnt(
                gridElmnt,
                moveX % SQUARE_SIZE, // add % SQUARE_SIZE to tile infinitely
                moveY % SQUARE_SIZE,
            )
            callback.onMoveScreen(e.movementX, e.movementY)
            e.preventDefault()
        }
    }

    function startMove(offsetX, offsetY) {
        state.handlePos.x = offsetX
        state.handlePos.y = offsetY
    }

    function moveElmnt(elmnt, x, y) {
        if (elmnt) {
            elmnt.style.left = x + "px"
            elmnt.style.top = y + "px"
        }
    }
    
    return {
        gridElmnt: gridElmnt,
        neededSquares: Array(totalSquares).keys(),
        gridCallback: callback,
    }
}

const {gridElmnt, neededSquares, gridCallback} = createGrid()

for (const squareN of neededSquares) {
    gridElmnt.appendChild(createSquare())
}

function createDebug() {
    const coord = document.createElement("div")
    coord.id = "debug"
    coord.innerText = "X, Y"
    return coord
}

function debug(text) {
    document.querySelector("#debug").innerText = text
}

document.body.appendChild(gridElmnt)
document.body.appendChild(createDebug())