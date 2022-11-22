'use strict'

const GHOST = '&#9781'
var gGhosts = []
// var gGhostColors =[]
var gDeadGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    // console.log('gGhosts', gGhosts)
    // console.log('gGhostColors', gGhostColors)
    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        color: getRandomColor(),
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    // gGhostColors.push(ghost.color)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')

}


function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return
        else gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function reviveGhost() {
    var len = gDeadGhosts.length
    for (var i = 0; i < len; i++) {
        var returnedGhosts = gDeadGhosts.pop()
        gGhosts.push(returnedGhosts)
    }
    for (var i = 0; i > gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span class="ghost" style="color: ${color}">${GHOST}</span>`
}
