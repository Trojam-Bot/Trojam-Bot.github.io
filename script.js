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

// Calculator Functions
function appendToDisplay(value) {
  document.getElementById('calc-display').value += value;
}

function clearDisplay() {
  document.getElementById('calc-display').value = '';
}

function calculateResult() {
  const display = document.getElementById('calc-display');
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}
