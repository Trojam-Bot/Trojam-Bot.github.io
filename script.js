// Game Variables
let score = 0;
let multiplier = 1;
let buttonSize = 100;
let buttonColor = '#ff4444';
let message = 'Start clicking!';
let eventCounter = 0;
let isBossFight = false;
let bossHealth = 30;
let bossTimer = 30;
let buttonHat = null;
let isShopOpen = false;
let ownedItems = [];

const shopItems = [
  { id: 'hat1', type: 'hat', name: 'Party Hat', price: 100, style: '🎉' },
  { id: 'hat2', type: 'hat', name: 'Crown', price: 200, style: '👑' },
  { id: 'color1', type: 'color', name: 'Golden', price: 150, style: '#FFD700' },
  { id: 'color2', type: 'color', name: 'Neon', price: 300, style: '#39FF14' },
  { id: 'multiplier1', type: 'multiplier', name: 'Double Click', price: 500, value: 2 },
  { id: 'multiplier2', type: 'multiplier', name: 'Triple Click', price: 1000, value: 3 },
];

// DOM Elements
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
const clickButton = document.getElementById('clickButton');
const shopButton = document.getElementById('shopButton');
const shop = document.getElementById('shop');
const shopItemsContainer = document.getElementById('shopItems');
const multiplierDisplay = document.getElementById('multiplier');
const bossFightUI = document.getElementById('bossFight');
const bossHealthDisplay = document.getElementById('bossHealth');
const bossTimerDisplay = document.getElementById('bossTimer');

// Random Events
const randomEvents = [
  {
    name: 'Double Trouble',
    effect: () => {
      multiplier *= 2;
      showMessage('DOUBLE POINTS ACTIVATED!');
      setTimeout(() => {
        multiplier /= 2;
        showMessage('Back to normal...');
      }, 5000);
    }
  },
  {
    name: 'Button Growth',
    effect: () => {
      buttonSize *= 1.5;
      updateButtonStyle();
      showMessage('THE BUTTON GROWS HUNGRY!');
      setTimeout(() => {
        buttonSize = 100;
        updateButtonStyle();
        showMessage('The button calms down');
      }, 3000);
    }
  },
  {
    name: 'Color Chaos',
    effect: () => {
      buttonColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      updateButtonStyle();
      showMessage('RAINBOW POWER!');
    }
  },
  {
    name: 'Score Roulette',
    effect: () => {
      const random = Math.random();
      if (random > 0.5) {
        score *= 2;
        showMessage('JACKPOT! Score doubled!');
      } else {
        score = Math.floor(score / 2);
        showMessage('Oops! Score halved!');
      }
      updateScore();
    }
  }
];

// Initialize Shop
function initializeShop() {
  shopItemsContainer.innerHTML = shopItems.map(item => `
    <div class="shopItem">
      <div>${item.name} - ${item.price} points</div>
      <button onclick="purchaseItem('${item.id}')" 
              ${score < item.price || ownedItems.includes(item.id) ? 'disabled' : ''}>
        ${ownedItems.includes(item.id) ? 'Owned' : 'Buy'}
      </button>
    </div>
  `).join('');
}

// Purchase Item
function purchaseItem(itemId) {
  const item = shopItems.find(i => i.id === itemId);
  if (score >= item.price && !ownedItems.includes(item.id)) {
    score -= item.price;
    ownedItems.push(item.id);
    updateScore();

    switch (item.type) {
      case 'hat':
        buttonHat = item.style;
        break;
      case 'color':
        buttonColor = item.style;
        updateButtonStyle();
        break;
      case 'multiplier':
        multiplier += item.value - 1;
        updateMultiplier();
        break;
    }
    initializeShop();
  }
}

// Update Button Style
function updateButtonStyle() {
  clickButton.style.width = `${buttonSize}px`;
  clickButton.style.height = `${buttonSize}px`;
  clickButton.style.backgroundColor = buttonColor;
  clickButton.style.fontSize = `${buttonSize / 8}px`;
}

// Update Score
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Update Multiplier
function updateMultiplier() {
  multiplierDisplay.textContent = `Current Multiplier: x${multiplier}`;
}

// Show Message
function showMessage(text) {
  messageDisplay.textContent = text;
}

// Handle Click
function handleClick() {
  score += multiplier;
  updateScore();
  eventCounter++;

  // Trigger random events or boss fight
  if (eventCounter > 0) {
    if (eventCounter % 10 === 0) {
      const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      randomEvent.effect();
    }
    // 5% chance to trigger boss fight
    if (Math.random() < 0.05 && !isBossFight) {
      startBossFight();
    }
  }
  // Handle boss fight clicks
  if (isBossFight) {
    bossHealth--;
    bossHealthDisplay.textContent = `Boss Health: ${bossHealth}/30`;
    if (bossHealth <= 0) {
      endBossFight(true);
    }
  }
}

// Start Boss Fight
function startBossFight() {
  isBossFight = true;
  bossHealth = 30;
  bossTimer = 30;
  bossFightUI.classList.remove('hidden');
  showMessage('BOSS FIGHT STARTED! CLICK FAST!');

  const interval = setInterval(() => {
    bossTimer--;
    bossTimerDisplay.textContent = `Time Left: ${bossTimer}s`;
    if (bossTimer <= 0) {
      clearInterval(interval);
      endBossFight(false);
    }
  }, 1000);
}

// End Boss Fight
function endBossFight(victory) {
  isBossFight = false;
  bossFightUI.classList.add('hidden');
  if (victory) {
    score += 100;
    showMessage('Boss defeated! +100 points!');
  } else {
    score = Math.max(0, score - 200);
    showMessage('Boss won! -200 points!');
  }
  updateScore();
}

// Initialize
initializeShop();
clickButton.addEventListener('click', handleClick);
shopButton.addEventListener('click', () => {
  isShopOpen = !isShopOpen;
  shop.classList.toggle('hidden');
});
