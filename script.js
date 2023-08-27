const board = document.getElementById('game-board');
const size = 5;
let tiles = [];
let emptyTile = { row: size - 1, col: size - 1 };

function createTile(value) {
    console.log("createTile",value)
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = value === size * size ? '' : value;
    return tile;
}

function shuffleTiles() {
    console.log("shuffleTiles",value)
    tiles = [];
    for (let i = 1; i <= size * size; i++) {
        tiles.push(i);
    }
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const value = tiles[row * size + col];
            const tile = createTile(value);
            tile.addEventListener('click', () => moveTile(row, col));
            board.appendChild(tile);
        }
    }
}

function moveTile(row, col) {
    if (Math.abs(emptyTile.row - row) + Math.abs(emptyTile.col - col) !== 1) {
        return;
    }
    tiles[emptyTile.row * size + emptyTile.col] = tiles[row * size + col];
    tiles[row * size + col] = size * size;
    emptyTile = { row, col };
    renderBoard();
    if (checkWin()) {
        setTimeout(() => alert('You win!'), 100);
    }
}

function checkWin() {
    for (let i = 0; i < size * size - 1; i++) {
        if (tiles[i] !== i + 1) {
            return false;
        }
    }
    return true;
}

function init() {
    shuffleTiles();
    renderBoard();
}

init();
