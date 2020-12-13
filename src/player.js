let playerLastMove;
let computerLastMove;

document.addEventListener("keydown", moveTocell);

function moveTocell(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    var temp = document.activeElement;
    var index = parseInt(temp.id.slice(-1));
    if (e.key == 'Enter' && !cell.classList.contains(CIRCLE_CLASS) && !cell.classList.contains(X_CLASS) ){
        playerLastMove = cell;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        }
        else if (isDraw()) {
            endGame(true);
        }
        else {
            swapTurns();
            setBoardHoverClass();
            computerMove()
        }
    }
    if (e.key == 'Backspace') {//todo add message that it can be use 1 time
        playerLastMove.className ='cell';
        computerLastMove.className = 'cell';
    }
    if (e.key == 'ArrowRight' && index != 2 && index != 5 && index != 8) {
        index += 1;
        document.getElementById('cell' + index).focus();
    	document.getElementById(temp.id).blur();
    }
    if (e.key == 'ArrowUp' && index > 2) {
        index -= 3;
        document.getElementById('cell' + index).focus();
    	document.getElementById(temp.id).blur();
    }
    if (e.key == 'ArrowDown' && index < 6) {
        index += 3;
        document.getElementById('cell' + index).focus();
    	document.getElementById(temp.id).blur();
    }
    if (e.key == 'ArrowLeft' && index != 0 && index != 3 && index != 6) {
        index -= 1;
        document.getElementById('cell' + index).focus();
    	document.getElementById(temp.id).blur();
    }

}

function computerMove() {
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    let emptyCells = [];
    cellElements.forEach(index => {
        if (!index.classList.contains(X_CLASS) && !index.classList.contains(CIRCLE_CLASS)){
            emptyCells.push(index);
        }
    });
    const computerMark = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    computerLastMove = computerMark;
    placeMark(computerMark, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurns();
        setBoardHoverClass();
    }
}
