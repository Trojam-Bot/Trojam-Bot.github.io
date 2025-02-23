
// Smooth scroll animation for feature cards
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Install button hover effect
const installButton = document.querySelector('.install-button');
installButton.addEventListener('mouseenter', () => {
    installButton.style.transform = 'scale(1.1)';
    installButton.style.boxShadow = '0 0 20px rgba(0, 191, 255, 0.8)';
});

installButton.addEventListener('mouseleave', () => {
    installButton.style.transform = 'scale(1)';
    installButton.style.boxShadow = '0 0 10px rgba(0, 191, 255, 0.5)';
});
