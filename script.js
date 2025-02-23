// Open Game Info Panel
const gameBoxes = document.querySelectorAll('.game-box');
const infoPanel = document.querySelector('.info-panel');
const closeBtn = document.querySelector('.close-btn');

gameBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const game = box.getAttribute('data-game');
        loadGameInfo(game);
        infoPanel.style.display = 'flex';
    });
});

// Close Game Info Panel
closeBtn.addEventListener('click', () => {
    infoPanel.style.display = 'none';
});

// Load Game Info
function loadGameInfo(game) {
    const gameTitle = document.querySelector('.game-title');
    const gameDescription = document.querySelector('.game-description');
    const links = document.querySelector('.links');

    if (game === 'minecraft') {
        gameTitle.textContent = 'Minecraft';
        gameDescription.textContent = 'Minecraft is a sandbox game where players can build and explore blocky worlds.';
        links.innerHTML = `
            <a href="https://www.minecraft.net" target="_blank">Official Website</a>
            <a href="https://store.steampowered.com" target="_blank">Download on Steam</a>
        `;
    } else if (game === 'roblox') {
        gameTitle.textContent = 'Roblox';
        gameDescription.textContent = 'Roblox is a platform where users can create and play games.';
        links.innerHTML = `
            <a href="https://www.roblox.com" target="_blank">Official Website</a>
            <a href="https://store.steampowered.com" target="_blank">Download on Steam</a>
        `;
    }
}
