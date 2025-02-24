// Game Variables
let score = 0;
let clickPower = 1;
let autoClickerInterval;
let multiplier = 1;
let chaosModeActive = false;
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
const autoClickerUpgrade = document.getElementById("autoClicker");
const multiplierUpgrade = document.getElementById("multiplier");
const chaosModeUpgrade = document.getElementById("chaosMode");

// Core Clicker Functionality
clickButton.addEventListener("click", () => {
  score += clickPower * multiplier;
  updateScore();
  checkForEvents();
});

// Upgrades
autoClickerUpgrade.addEventListener("click", () => {
  if (score >= 10) {
    score -= 10;
    updateScore();
    startAutoClicker();
    autoClickerUpgrade.style.display = "none";
  }
});

multiplierUpgrade.addEventListener("click", () => {
  if (score >= 20) {
    score -= 20;
    updateScore();
    multiplier += 1;
    multiplierUpgrade.style.display = "none";
  }
});

chaosModeUpgrade.addEventListener("click", () => {
  if (score >= 50) {
    score -= 50;
    updateScore();
    chaosModeActive = true;
    chaosModeUpgrade.style.display = "none";
    startChaosMode();
  }
});

// Auto-Clicker
function startAutoClicker() {
  autoClickerInterval = setInterval(() => {
    score += clickPower * multiplier;
    updateScore();
  }, 1000);
}

// Chaos Mode
function startChaosMode() {
  setInterval(() => {
    if (chaosModeActive) {
      triggerRandomEvent();
    }
  }, 3000);
}

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
  eventLog.classList.add("show");
  setTimeout(() => {
    eventLog.classList.remove("show");
  }, 3000);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}
