const widget = document.getElementById('widget');
const menu = document.getElementById('menu');
const screen = document.getElementById('screen');
const screenContent = document.getElementById('screenContent');
const backBtn = document.getElementById('backBtn');

widget.addEventListener('click', () => {
  menu.classList.toggle('show');
});

document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const tool = icon.dataset.tool;

    // Hide widget + menu
    widget.style.display = 'none';
    menu.classList.remove('show');

    // Show screen
    screen.classList.add('show');

    // Inject dynamic content
    screenContent.innerHTML = `
      <h2>${tool}</h2>
      <p>This is the ${tool} screen.</p>
    `;
  });
});

backBtn.addEventListener('click', () => {
  screen.classList.remove('show');
  widget.style.display = 'flex';
});