const widget = document.getElementById('widget');
const menu = document.getElementById('menu');
const screenEl = document.getElementById('screen');
const screenContent = document.getElementById('screenContent');
const backBtn = document.getElementById('backBtn');

// Toggle menu
widget.addEventListener('click', () => {
  if (widget.classList.contains('hidden')) {
    widget.classList.remove('hidden');
    return;
  }

  menu.classList.toggle('show');
});


// Auto-close when clicking outside
document.addEventListener('click', (e) => {
  if (!widget.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('show');
  }
});

// Tool selection
document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const tool = icon.dataset.tool;

    widget.style.display = 'none';
    menu.classList.remove('show');
    screenEl.classList.add('show');

    const fileName = tool.toLowerCase().replace(/\s+/g, '') + ".html";

    // Load tool inside iframe
    const iframe = document.createElement("iframe");
    iframe.src = `tools/${fileName}`;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    // Clear previous content
    screenContent.innerHTML = "";
    screenContent.appendChild(iframe);
  });
});
function showWidgetBubble(message) {
  const bubble = document.getElementById('widgetBubble');
  bubble.textContent = message;
  bubble.classList.add('show');
  setTimeout(() => {
    bubble.classList.remove('show');
  }, 4000);
}
window.showWidgetBubble = showWidgetBubble;

// Back button
backBtn.addEventListener('click', () => {
  screenEl.classList.remove('show');
  widget.style.display = 'flex';
});

// Magnetize to right edge after inactivity
let hideTimeout;
function scheduleHide() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    // Hide icons if menu is open but no tool chosen
    menu.classList.remove('show');
    // Magnetize widget
    widget.classList.add('hidden');
  }, 5000); // 5s idle then hide
}
scheduleHide();

document.addEventListener('mousemove', scheduleHide);
document.addEventListener('click', scheduleHide);
