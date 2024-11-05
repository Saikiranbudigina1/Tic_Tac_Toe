const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `${currentPlayer} wins!`;
            isGameOver = true;
        } else if (board.every(cell => cell !== '')) {
            message.textContent = `It's a draw!`;
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function restartGame() {
    board.fill('');
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    isGameOver = false;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

// Initial message
message.textContent = `Player ${currentPlayer}'s turn`;
