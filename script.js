// Game Variables
let score = 0;
let clickPower = 1;
let autoClickerPower = 0;
let multiplier = 1;
let eventInterval;
let idleTimer;
let bossHealth = 100;
let bossTimer;
const events = [
  "buttonMove",
  "cursorClone",
  "glitchEffect",
  "bossFight",
  "buttonShrink",
  "jumpscare",
];

// DOM Elements
const scoreDisplay = document.getElementById("score");
const clickButton = document.getElementById("clickButton");
const eventLog = document.getElementById("eventLog");
const upgradeClickPowerButton = document.getElementById("upgradeClickPower");
const upgradeAutoClickerButton = document.getElementById("upgradeAutoClicker");
const upgradeMultiplierButton = document.getElementById("upgradeMultiplier");
const bossFightUI = document.getElementById("bossFight");
const bossHealthDisplay = document.getElementById("bossHealth");
const punchBossButton = document.getElementById("punchBoss");

// Core Clicker Functionality
clickButton.addEventListener("click", () => {
  score += clickPower * multiplier;
  updateScore();
  checkForEvents();
  resetIdleTimer();
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
      startBossFight();
      break;
    case "buttonShrink":
      buttonShrink();
      break;
    case "jumpscare":
      triggerJumpscare();
      break;
    default:
      break;
  }
}

// Event Functions
function moveButton() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  clickButton.style.transition = "all 0.5s ease";
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
  document.body.classList.add("glitch");
  setTimeout(() => document.body.classList.remove("glitch"), 1000);
  logEvent("The screen glitched!");
}

function buttonShrink() {
  clickButton.style.transition = "all 0.5s ease";
  clickButton.style.transform = "scale(0.5)";
  setTimeout(() => {
    clickButton.style.transform = "scale(1)";
  }, 1000);
  logEvent("The button shrank!");
}

function triggerJumpscare() {
  const jumpscare = document.createElement("div");
  jumpscare.classList.add("jumpscare");
  document.body.appendChild(jumpscare);
  setTimeout(() => jumpscare.remove(), 500);
  logEvent("BOO! Did I scare you?");
}

function startBossFight() {
  bossHealth = 100;
  bossFightUI.classList.remove("hidden");
  bossTimer = setTimeout(() => {
    bossFightUI.classList.add("hidden");
    score = Math.floor(score / 2);
    updateScore();
    logEvent("The boss stole half your points!");
  }, 300000); // 5 minutes
}

punchBossButton.addEventListener("click", () => {
  bossHealth -= 10;
  bossHealthDisplay.textContent = `Health: ${bossHealth}`;
  if (bossHealth <= 0) {
    clearTimeout(bossTimer);
    bossFightUI.classList.add("hidden");
    score += 1000;
    updateScore();
    logEvent("You defeated the boss and earned 1000 points!");
  }
});

// Idle Jokes
function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    logEvent("Are you still there? Keep clicking!");
  }, 120000); // 2 minutes
}

// Helper Functions
function checkForEvents() {
  if (Math.random() < 0.1) {
    triggerRandomEvent();
  }
}

function logEvent(message) {
  eventLog.textContent = message;
  eventLog.style.opacity = 1;
  setTimeout(() => {
    eventLog.style.opacity = 0;
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
