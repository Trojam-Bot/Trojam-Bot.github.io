// Load Game Function
function loadGame(gameName) {
  const gameContainer = document.getElementById('game-container');
  const gameContent = document.getElementById('game-content');

  // Load the game script dynamically
  const script = document.createElement('script');
  script.src = `assets/${gameName}.js`;
  document.body.appendChild(script);

  // Show the game container
  gameContainer.classList.remove('hidden');
}

// Close Game Function
function closeGame() {
  const gameContainer = document.getElementById('game-container');
  gameContainer.classList.add('hidden');
  document.getElementById('game-content').innerHTML = '';
}
document.getElementById('game-content').innerHTML = `
  <h2>Tic Tac Toe</h2>
  <div class="tic-tac-toe">
    <div class="row">
      <div class="cell" onclick="makeMove(0)"></div>
      <div class="cell" onclick="makeMove(1)"></div>
      <div class="cell" onclick="makeMove(2)"></div>
    </div>
    <div class="row">
      <div class="cell" onclick="makeMove(3)"></div>
      <div class="cell" onclick="makeMove(4)"></div>
      <div class="cell" onclick="makeMove(5)"></div>
    </div>
    <div class="row">
      <div class="cell" onclick="makeMove(6)"></div>
      <div class="cell" onclick="makeMove(7)"></div>
      <div class="cell" onclick="makeMove(8)"></div>
    </div>
  </div>
`;

let currentPlayer = 'X';
let board = Array(9).fill('');

function makeMove(index) {
  if (board[index] === '') {
    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    checkWinner();
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      alert(`${board[a]} wins!`);
      resetGame();
      return;
    }
  }

  if (!board.includes('')) {
    alert('It\'s a draw!');
    resetGame();
  }
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  Array.from(document.getElementsByClassName('cell')).forEach(cell => cell.textContent = '');
}
