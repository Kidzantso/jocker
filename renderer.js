const widget = document.getElementById('widget');
const menu = document.getElementById('menu');
const screenEl = document.getElementById('screen');
const screenContent = document.getElementById('screenContent');
const backBtn = document.getElementById('backBtn');

const api = window.electronAPI;
function setMode(mode) {
  if (api && typeof api.setWidgetMode === 'function') api.setWidgetMode(mode);
}

let isHoveringWidget = false;

// Start collapsed (circle only)
setMode('collapsed');

// Reactivate when magnetized and hovered
widget.addEventListener('mouseenter', () => {
  isHoveringWidget = true;
  if (widget.classList.contains('hidden')) {
    widget.classList.remove('hidden');
    menu.classList.remove('show');
    setMode('collapsed');
  }
  scheduleHide();
});
widget.addEventListener('mouseleave', () => {
  isHoveringWidget = false;
  scheduleHide();
});

// Toggle menu
widget.addEventListener('click', (e) => {
  e.stopPropagation();
  if (widget.classList.contains('hidden')) {
    widget.classList.remove('hidden');
    menu.classList.remove('show');
    setMode('collapsed');
    scheduleHide();
    return;
  }

  const opening = !menu.classList.contains('show');
  if (opening) {
    // Resize first, then reveal icons to avoid clipping/flicker.
    setMode('menu');
    requestAnimationFrame(() => menu.classList.add('show'));
  } else {
    // Hide icons, then shrink window after the transition.
    menu.classList.remove('show');
    setTimeout(() => setMode('collapsed'), 220);
  }
  scheduleHide();
});


// Auto-close when clicking outside
document.addEventListener('click', (e) => {
  if (screenEl.classList.contains('show')) return;
  if (!widget.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('show');
    if (widget.classList.contains('hidden')) {
      setMode('collapsedHidden');
    } else {
      setTimeout(() => setMode('collapsed'), 220);
    }
  }
});

// Tool selection
document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const tool = icon.dataset.tool;

    widget.style.display = 'none';
    menu.classList.remove('show');
    screenEl.classList.add('show');
    setMode('screen');

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
  setMode(widget.classList.contains('hidden') ? 'collapsedHidden' : 'collapsed');
});

// Magnetize to right edge after inactivity
let hideTimeout;
function scheduleHide() {
  clearTimeout(hideTimeout);
  if (screenEl.classList.contains('show')) return;
  if (isHoveringWidget) return;
  hideTimeout = setTimeout(() => {
    // Hide icons if menu is open but no tool chosen
    menu.classList.remove('show');
    // Magnetize widget
    widget.classList.add('hidden');
    setMode('collapsedHidden');
  }, 5000); // 5s idle then hide
}
scheduleHide();

document.addEventListener('mousemove', scheduleHide);
document.addEventListener('click', scheduleHide);
