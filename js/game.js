'use strict';
const WALL = '🧱';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '🍔';
const CHERRY = '🍒'

var gElGameOver = document.querySelector('.container-game-over');
var gElVictory = document.querySelector('.container-victory');
var gElScore = document.querySelector('h2 span');
var gIntervalCherry;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;

    getEmptyCell(gBoard)
    gIntervalCherry = setInterval(addCherry, 15000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 & j === 1 || i === 8 & j === 8 || i === 8 && j === 1 || i === 1 && j === 8) {
                board[i][j] = POWER_FOOD;
            }
        }
    }
    return board;
}


// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;
    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;

    if (isVictory(gBoard)) {
        gameOver()
        gElVictory.classList.remove('hide')
    }
}

// TODO
function gameOver() {

    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    clearInterval(gIntervalCherry)
    gIntervalCherry = null

    isVictory(gBoard) ? gElVictory.classList.remove('hide') : gElGameOver.classList.remove('hide');
}

function addCherry() {
    if (gGame.isOn) {
        var pos = getEmptyCell(gBoard);
        if (pos === null) return;
        gBoard[pos.i][pos.j] = CHERRY;
        renderCell(pos, CHERRY);
    }
    return;
}


function isVictory(board) {
    var foodCounter = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === FOOD) foodCounter++
        }
    }
    return foodCounter > 1 ? false : true;
}

function restart() {
    gGame.score = 0

    gElScore.innerText = gGame.score;
    gElGameOver.classList.add('hide');
    gElVictory.classList.add('hide');
    init();
}

function getEmptyCell(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === EMPTY) emptyCells.push({ i: i, j: j })
        }
    }
    if (emptyCells.length) return emptyCells[getRandomInt(0, emptyCells.length - 1)]
    else return null
}

