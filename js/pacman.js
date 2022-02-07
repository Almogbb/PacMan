'use strict';
const PACMAN = '😷';
const SUPER_PACMAN = '😎';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    // return if cannot move
    if (nextCellContent === WALL) return;
    if (nextCellContent === POWER_FOOD && gPacman.isSuper) return
    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            return;
        } else {
            removeGhost(gPacman.location);
            gBoard[gPacman.location.i][gPacman.location.j] = SUPER_PACMAN;
            renderCell(gPacman.location, SUPER_PACMAN);
        }

    };

    if (nextCellContent === FOOD) {
        updateScore(1);
        // gFoodEaten++
        // console.log('gFoodEaten', gFoodEaten);
    }
    if (nextCellContent === CHERRY) updateScore(10)

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);

    if (nextCellContent === POWER_FOOD && !gPacman.isSuper) {
        superMode();
    }

}

function superMode() {
    gPacman.isSuper = true;
    console.log(' gPacman.isSuper', gPacman.isSuper);
    setTimeout(function () {
        gPacman.isSuper = false;
        console.log(' gPacman.isSuper', gPacman.isSuper);
        reviveGhosts();
    }, 5000)
}

function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }
    return nextLocation;
}



