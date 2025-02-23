const topicsList = [
    {
        name: "Minecraft",
        emoji: "🎮",
        description: `
            <h2>What is Minecraft?</h2>
            <p>Minecraft is a sandbox game where players can build and explore blocky worlds.</p>
            <img src="https://via.placeholder.com/800x400" alt="Minecraft">
            <h2>Gameplay</h2>
            <p>Players can mine resources, craft tools, and build structures in a procedurally generated world.</p>
            <h2>Why Play Minecraft?</h2>
            <p>Minecraft encourages creativity, problem-solving, and collaboration.</p>
        `
    },
    {
        name: "Roblox",
        emoji: "👾",
        description: `
            <h2>What is Roblox?</h2>
            <p>Roblox is a platform where users can create and play games.</p>
            <img src="https://via.placeholder.com/800x400" alt="Roblox">
            <h2>Game Creation</h2>
            <p>Roblox Studio allows users to design their own games using Lua scripting.</p>
            <h2>Why Play Roblox?</h2>
            <p>Roblox offers endless possibilities for creativity and social interaction.</p>
        `
    }
];

function displayTopics() {
    const searchInput = document.getElementById('searchInput');
    const topicsContainer = document.getElementById('topics');
    const notFound = document.getElementById('notFound');
    topicsContainer.innerHTML = "";
    const filteredTopics = topicsList.filter(topic => topic.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    
    if (filteredTopics.length === 0) {
        notFound.style.display = 'block';
    } else {
        notFound.style.display = 'none';
        filteredTopics.forEach(topic => {
            const topicElement = document.createElement('div');
            topicElement.classList.add('topic');
            topicElement.innerHTML = `<div class="topic-content">
                    <div class="emoji">${topic.emoji}</div>
                    ${topic.name}
                </div>`;
            topicElement.addEventListener('click', () => openModal(topic));
            topicElement.addEventListener('mousemove', (e) => handleMouseMove(e, topicElement));
            topicElement.addEventListener('mouseleave', () => handleMouseLeave(topicElement));
            topicsContainer.appendChild(topicElement);
        });
    }
}

function handleMouseMove(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;

    gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
    });
}

function handleMouseLeave(element) {
    gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
}

function openModal(topic) {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    modalTitle.textContent = topic.name;
    modalDescription.innerHTML = topic.description;

    // GSAP Animation: Fade in modal
    gsap.fromTo(modal, { opacity: 0, visibility: 'hidden' }, { opacity: 1, visibility: 'visible', duration: 0.5 });
    gsap.fromTo(modalContent, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });

    // Generate Table of Contents
    const tocList = document.getElementById('tocList');
    tocList.innerHTML = "";
    const headings = modalDescription.querySelectorAll('h2');
    headings.forEach(heading => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = heading.textContent;
        a.href = `#${heading.textContent.replace(/\s+/g, '-').toLowerCase()}`;
        a.onclick = (e) => {
            e.preventDefault();
            gsap.to(window, { scrollTo: heading, duration: 1, ease: 'power3.out' });
        };
        li.appendChild(a);
        tocList.appendChild(li);
    });

    // Show Table of Contents
    const tableOfContents = document.getElementById('tableOfContents');
    gsap.fromTo(tableOfContents, { opacity: 0, visibility: 'hidden' }, { opacity: 1, visibility: 'visible', duration: 0.5 });
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const tableOfContents = document.getElementById('tableOfContents');

    // GSAP Animation: Fade out modal
    gsap.to(modal, { opacity: 0, visibility: 'hidden', duration: 0.5 });
    gsap.to(modalContent, { scale: 0.8, opacity: 0, duration: 0.5, ease: 'power3.in' });
    gsap.to(tableOfContents, { opacity: 0, visibility: 'hidden', duration: 0.5 });
}

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
document.getElementById('searchInput').addEventListener('input', displayTopics);

displayTopics();
