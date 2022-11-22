'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    // console.log('hello')
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    // console.log('elCell', elCell)
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}




//finds empty cell
function getRandEmptyCell() {
    var emptyCells = getEmptyCells()
    var rand = getRandomIntInclusive(0, emptyCells.length - 1)
    var cellLocation = emptyCells[rand]
    // console.log('cellLocation', cellLocation)
    return cellLocation
}


function getEmptyCells() {
    var emptyCells = []
    // console.log('gBoard', gBoard.length)
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j })
        }
    }
    // console.log('emptyCells', emptyCells)
    return emptyCells
}