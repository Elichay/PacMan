'use strict'

const PACMAN = '🙂'
// const PACMAN_IMG
const PACMAN_IMG_UP = '<img src="img/pacmanUp.png">'
const PACMAN_IMG_DOWN = '<img src="img/pacmanDown.png">'
const PACMAN_IMG_RIGHT = '<img src="img/pacmanRight.png">'
const PACMAN_IMG_LEFT = '<img src="img/pacmanLeft.png">'

var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        } else {
            updateScore(gPointsGhost)
            eatGHOST(nextLocation)
        }
    }
    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        updateScore(gPointsPowerFood)
        gPacman.isSuper = true
        playSound('bell.mp3')
        document.querySelector('.superBoard').style.visibility = 'visible'
        // console.log('gPacman.isSuper', gPacman.isSuper)
        for(var i = 0 ; i > gGhosts.length ; i++){
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
        }
        setTimeout(powerFoodEatenFalse, 5000)
    }


    if (nextCell === FOOD) {
        updateScore(gPointsFood)
        gFoodEaten++
        playSound('bite.mp3')
        // console.log('gFoodEaten', gFoodEaten, '/', gFoodCounter)
    }

    if (nextCell === CHERRY) {
        updateScore(gPointsCherry)
        playSound('num-num-num.mp3')
    }
    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    switch (gDirection) {
        case ('up'):
            renderCell(nextLocation, PACMAN_IMG_UP)
            break;
        case ('down'):
            renderCell(nextLocation, PACMAN_IMG_DOWN)
            break;
        case ('right'):
            renderCell(nextLocation, PACMAN_IMG_RIGHT)
            break;
        case ('left'):
            renderCell(nextLocation, PACMAN_IMG_LEFT)
            break;
    }

    checkVictory()
    // renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gDirection = 'up'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gDirection = 'right'
            break;
        case 'ArrowDown':
            nextLocation.i++
            gDirection = 'down'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gDirection = 'left'
            break;
    }
    return nextLocation
}