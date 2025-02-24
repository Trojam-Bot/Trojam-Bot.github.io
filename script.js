// Game Variables
let score = 0;
let clickPower = 1;
let eventInterval;
const events = [
  "buttonMove",
  "cursorClone",
  "glitchEffect",
  "bossFight",
  "fakeError",
];

// DOM Elements
const scoreDisplay = document.getElementById("score");
const clickButton = document.getElementById("clickButton");
const eventLog = document.getElementById("eventLog");

// Core Clicker Functionality
clickButton.addEventListener("click", () => {
  score += clickPower;
  scoreDisplay.textContent = `Score: ${score}`;
  checkForEvents();
});

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
    case "fakeError":
      fakeError();
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
    score += clickPower;
    scoreDisplay.textContent = `Score: ${score}`;
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

function fakeError() {
  logEvent("Oh no! The game crashed!");
  setTimeout(() => {
    logEvent("Just kidding! Keep clicking!");
  }, 2000);
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

// Start Event Interval
eventInterval = setInterval(() => {
  if (Math.random() < 0.05) {
    triggerRandomEvent();
  }
}, 5000);
