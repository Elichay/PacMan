'use strict'

// const WALL = '▓'
const WALL = '█'
const FOOD = '∙'
const POWER_FOOD = '🍕'
const EMPTY = ' '
const CHERRY = '🍒'

const gPointsFood = 1
const gPointsPowerFood = 5
const gPointsCherry = 10
const gPointsGhost = 15

const gGame = {
    score: 0,
    isOn: false,
    isVictory: false
}
var gDirection = 'up'
var gBoard
var gFoodCounter
var gFoodEaten = 0
var gCherryInterval

function onInit() {
    // console.log('hello')
    document.querySelector('.restert').style.visibility = 'hidden'
    document.querySelector('.superBoard').style.visibility = 'hidden'
    gFoodCounter = 0
    gFoodEaten = 0
    gGhosts = []
    updateScore()
    var elHeader = document.querySelector('.header h1')
    elHeader.style.backgroundColor = 'pink'
    elHeader.innerText = 'Let\'s Play!!'
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    gFoodCounter = countFood(gBoard)
    renderBoard(gBoard, '.board-container')
    gPacman.isSuper = false
    gPacman.isSuper = false
    gGame.isOn = true
    gCherryInterval = setInterval(getCherry, 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if ((i === 1 && j === 1) ||
                (i === 1 && j === size - 2) ||
                (i === size - 2 && j === 1) ||
                (i === size - 2 && j === size - 2)) {
                board[i][j] = POWER_FOOD
            }
            //should count food here??
        }
    }
    return board
}

function countFood(mat) {
    var foodCount = 1 //ghosts starts on food.
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++) {
            if (mat[i][j] === FOOD) foodCount++
        }
    }
    // console.log('foodcount', foodCount)
    return foodCount
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    if (gGame.isOn) {
        gGame.score += diff
    } else { gGame.score = 0 }
    // gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function eatGHOST(nextLocation) {
    // console.log('nextLocation', nextLocation)
    playSound('num-num-num.mp3')
    for (var i = 0; i < gGhosts.length; i++) {
        // console.log('gGhosts[i]', gGhosts[i])
        if (gGhosts[i].location.i === nextLocation.i &&
            gGhosts[i].location.j === nextLocation.j) {
            if (gGhosts[i].currCellContent === FOOD) {
                gGhosts[i].currCellContent = EMPTY
                gFoodEaten++
                updateScore(gPointsFood)
            } else if (gGhosts[i].currCellContent === CHERRY) {
                gGhosts[i].currCellContent = EMPTY
                updateScore(gPointsCherry)
            }
            gDeadGhosts.push(gGhosts.splice(i, 1)[0])
        }
    }
    checkVictory()
}


function powerFoodEatenFalse() {
    gPacman.isSuper = false
    document.querySelector('.superBoard').style.visibility = 'hidden'
    reviveGhost()
}

function getCherry() {
    var location = getRandEmptyCell()
    if(!location) return
    //model
    gBoard[location.i][location.j] = CHERRY
    //dom
    renderCell(location, CHERRY)
}

function checkVictory() {
    if (gFoodCounter <= gFoodEaten) {
        gGame.isVictory = true
        gameOver()
    }
}


function gameOver(){
    var elHeader = document.querySelector('.header h1')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    document.querySelector('.restert').style.visibility = 'visible'
    
    if (gGame.isVictory) {
        renderCell(gPacman.location, '😎')
        elHeader.style.backgroundColor = 'yellow'
        elHeader.innerText = 'Victory!!!'
        playSound('tada.mp3')
    } else {
        renderCell(gPacman.location, '💀')
        elHeader.style.backgroundColor = 'red'
        elHeader.innerText = 'You\'ve Lost...'
        playSound('GhostsBack.mp3')
    }
    gGame.isVictory = false
}



function playSound(sound) {
    var sound = new Audio(`sound/${sound}`)
    sound.play()

}

// function victory(nextCell) {
//     var elHeader = document.querySelector('.header h1')
//     // console.log('victory')
//     elHeader.style.backgroundColor = 'yellow'
//     elHeader.innerText = 'Victory!!!'
//     // alert('Victory!')
//     clearInterval(gIntervalGhosts)
//     gGame.isOn = false
//     // console.log('gPacman.location', gPacman.location)
//     // console.log('nextCell', nextCell)
//     // renderCell(nextCell, '😎')
//     // renderCell(gPacman.location, 'A')
//     document.querySelector('.restert').style.visibility = 'visible'
//     clearInterval(gCherryInterval)
// }


// function gameOver1() {
//     var elHeader = document.querySelector('.header h1')
    
    
//     elHeader.style.backgroundColor = 'red'
//     elHeader.innerText = 'You\'ve Lost...'
//     // console.log('Game Over')
//     clearInterval(gIntervalGhosts)
//     gGame.isOn = false
//     // console.log('gPacman.location', gPacman.location)
//     renderCell(gPacman.location, '☠')
//     document.querySelector('.restert').style.visibility = 'visible'
//     clearInterval(gCherryInterval)
// }


// function gameOver2() {
//     // TODO
//     clearInterval(gIntervalGhosts)
//     clearInterval(gAddCherryIntervalId)
//     gGame.isOn = false
//     if (gGame.isVictory) {
//         renderCell(gPacman.location, '👑')
//         toggleModal('You Won!!!', true)
//         // document.querySelector('.victory-modal').style.opacity = '1'
//     } else {
//         renderCell(gPacman.location, '💥')
//         toggleModal('Game Over', true)
//         // document.querySelector('.game-over-modal').style.opacity = '1'
//     }
// }


