const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageTitleElement = document.getElementById('gameMenu');
const adsElement = document.getElementById('page-content');
const startButton = document.getElementById('startButton');
const exitButton = document.getElementById('exitButton');
const messageTitleTextElement = document.querySelector('[data-title-message-text]');
const turnTitleElement = document.querySelector('[turn-title-message-text]');

startButton.addEventListener('click', startGame);
exitButton.addEventListener('click', exitGame);

let circleTurn; 
let computerTurn;

function startGame() {
    circleTurn = false;
    computerTurn = Math.random() < 0.5;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.value = null;
    });
    messageTitleElement.classList.add('hide')
    adsElement.classList.add('show');
    videoElement.play();
    window.setTimeout(() => {
        videoElement.pause();
        board.classList.remove('hide');
        adsElement.classList.remove('show');
        document.getElementById('cell4').focus();
        turnTitleElement.innerText = 'X Turn' ;
        if (computerTurn) {
            computerMove()
        }
      }, 10700);
}

function exitGame() {
    window.location = 'http://www.google.com/';
}

function endGame(draw) {
    if (draw) {
        messageTitleTextElement.innerText = 'Draw!'
    }
    else {
        messageTitleTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins! :)`;
    }
    messageTitleElement.classList.remove('hide');
}

function isDraw() {
    return [...cellElements].every( cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    currentClass !== 'circle' ? cell.value = 'X' : cell.value = 'O';
}

function swapTurns() {
    circleTurn = !circleTurn;
    !circleTurn ? turnTitleElement.innerText = 'X Turn' : turnTitleElement.innerText = 'O Turn';
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some( combination => {
        return combination.every( index => {//check combination
            return cellElements[index].classList.contains(currentClass);//check cell if the same class is on all 3 cells
        })
    })    
}