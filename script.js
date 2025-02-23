// Particle Background
particlesJS.load('particles-js', 'particles.json', function () {
  console.log('Particles loaded!');
});

// Topics Data
const topicsList = [
  {
    name: "AI",
    emoji: "🤖",
    description: `
      <h2>What is AI?</h2>
      <p>Artificial Intelligence (AI) refers to the simulation of human intelligence in machines.</p>
      <img src="https://via.placeholder.com/800x400" alt="AI">
    `,
  },
  {
    name: "Linux",
    emoji: "🐧",
    description: `
      <h2>What is Linux?</h2>
      <p>Linux is an open-source operating system based on Unix.</p>
      <img src="https://via.placeholder.com/800x400" alt="Linux">
    `,
  },
  // Add more topics here
];

// Display Topics
function displayTopics() {
  const searchInput = document.getElementById('searchInput');
  const topicsContainer = document.getElementById('topics');
  const notFound = document.getElementById('notFound');
  topicsContainer.innerHTML = "";
  const filteredTopics = topicsList.filter((topic) =>
    topic.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  if (filteredTopics.length === 0) {
    notFound.style.display = 'block';
  } else {
    notFound.style.display = 'none';
    filteredTopics.forEach((topic) => {
      const topicElement = document.createElement('div');
      topicElement.classList.add('topic');
      topicElement.innerHTML = `
        <div class="emoji">${topic.emoji}</div>
        <div>${topic.name}</div>
      `;
      topicElement.addEventListener('click', () => openModal(topic));
      topicsContainer.appendChild(topicElement);
    });
  }
}

// Open Modal
function openModal(topic) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  modalTitle.textContent = topic.name;
  modalDescription.innerHTML = topic.description;
  modal.classList.add('open');
}

// Close Modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('open');
}

// Update Clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// Initialize
document.getElementById('searchInput').addEventListener('input', displayTopics);
setInterval(updateClock, 1000);
displayTopics();
