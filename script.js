// script.js
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const cellIndex = e.target.getAttribute('data-cell');
    
    if (board[cellIndex] !== '' || !gameActive) return;
    
    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    
    if (board.every(cell => cell !== '')) {
        status.textContent = 'It\'s a Draw!';
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = '';
    gameActive = true;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
