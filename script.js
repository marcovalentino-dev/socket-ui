const rocket = document.getElementById('rocket');
const btn = document.getElementById('launchBtn');

btn.addEventListener('click', () => {
  rocket.style.transform = 'translateY(-120vh)';
  setTimeout(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, 2500);
});
