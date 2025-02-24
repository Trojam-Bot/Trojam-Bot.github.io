// Game Variables
let score = 0;
let clickPower = 1;
let autoClickerPower = 0;
let multiplier = 1;
let eventInterval;
const events = [
  "buttonMove",
  "cursorClone",
  "glitchEffect",
  "bossFight",
];

// DOM Elements
const scoreDisplay = document.getElementById("score");
const clickButton = document.getElementById("clickButton");
const eventLog = document.getElementById("eventLog");
const upgradeClickPowerButton = document.getElementById("upgradeClickPower");
const upgradeAutoClickerButton = document.getElementById("upgradeAutoClicker");
const upgradeMultiplierButton = document.getElementById("upgradeMultiplier");

// Core Clicker Functionality
clickButton.addEventListener("click", () => {
  score += clickPower * multiplier;
  updateScore();
  checkForEvents();
});

// Upgrade Functions
upgradeClickPowerButton.addEventListener("click", () => {
  if (score >= 10) {
    score -= 10;
    clickPower += 1;
    updateScore();
    logEvent("Click power increased!");
  }
});

upgradeAutoClickerButton.addEventListener("click", () => {
  if (score >= 50) {
    score -= 50;
    autoClickerPower += 1;
    updateScore();
    logEvent("Auto-clicker purchased!");
  }
});

upgradeMultiplierButton.addEventListener("click", () => {
  if (score >= 100) {
    score -= 100;
    multiplier += 1;
    updateScore();
    logEvent("Multiplier purchased!");
  }
});

// Auto-Clicker Functionality
setInterval(() => {
  score += autoClickerPower * multiplier;
  updateScore();
}, 1000);

// Unpredictable Events
function triggerRandomEvent() {
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  switch (randomEvent) {
    case "buttonMove":
      moveButton();
      break;
    case "cursorClone":
      cursorClone();
      break;
    case "glitchEffect":
      glitchEffect();
      break;
    case "bossFight":
      bossFight();
      break;
    default:
      break;
  }
}

// Event Functions
function moveButton() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  clickButton.style.position = "absolute";
  clickButton.style.left = `${x}px`;
  clickButton.style.top = `${y}px`;
  logEvent("The button moved! Find it!");
}

function cursorClone() {
  const clone = clickButton.cloneNode(true);
  clone.id = "cloneButton";
  document.body.appendChild(clone);
  clone.addEventListener("click", () => {
    score += clickPower * multiplier;
    updateScore();
  });
  logEvent("Your cursor cloned itself!");
}

function glitchEffect() {
  document.body.style.backgroundColor = "#000";
  document.body.style.color = "#0f0";
  setTimeout(() => {
    document.body.style.backgroundColor = "#1a1a1a";
    document.body.style.color = "#fff";
  }, 1000);
  logEvent("The screen glitched!");
}

function bossFight() {
  logEvent("A boss appeared! Click like crazy to defeat it!");
  let bossHealth = 10;
  const bossInterval = setInterval(() => {
    if (bossHealth <= 0) {
      clearInterval(bossInterval);
      logEvent("You defeated the boss!");
    } else {
      bossHealth--;
    }
  }, 500);
}

// Helper Functions
function checkForEvents() {
  if (Math.random() < 0.1) {
    triggerRandomEvent();
  }
}

function logEvent(message) {
  eventLog.textContent = message;
  setTimeout(() => {
    eventLog.textContent = "";
  }, 3000);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
  upgradeClickPowerButton.disabled = score < 10;
  upgradeAutoClickerButton.disabled = score < 50;
  upgradeMultiplierButton.disabled = score < 100;
}

// Start Event Interval
eventInterval = setInterval(() => {
  if (Math.random() < 0.05) {
    triggerRandomEvent();
  }
}, 5000);
