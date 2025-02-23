// Mouse-Responsive Light Effects
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  document.body.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, #f4f4f9, #ddd)`;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('header a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
