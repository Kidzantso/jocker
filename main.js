const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

let win;

const MARGIN_PX = 40;
const MODES = {
  collapsed: { width: 96, height: 96, magnetized: false },
  collapsedHidden: { width: 96, height: 96, magnetized: true },
  menu: { width: 120, height: 460, magnetized: false },
  screen: { width: 640, height: 640, magnetized: false }
};

function applyMode(mode) {
  if (!win) return;
  const spec = MODES[mode] || MODES.collapsed;

  const { width: screenW, height: screenH } = screen.getPrimaryDisplay().workAreaSize;
  const xNormal = screenW - spec.width - MARGIN_PX;
  const xMagnetized = screenW - Math.floor(spec.width / 2);
  const x = spec.magnetized ? xMagnetized : xNormal;
  const y = screenH - spec.height - MARGIN_PX;

  win.setBounds({ x, y, width: spec.width, height: spec.height }, true);
}

function createWidget() {
  win = new BrowserWindow({
    width: MODES.collapsed.width,
    height: MODES.collapsed.height,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile('index.html');
  applyMode('collapsed');
}

app.whenReady().then(() => {
  createWidget();
  app.setLoginItemSettings({ openAtLogin: true });
});

ipcMain.on('widget:setMode', (_evt, mode) => {
  applyMode(String(mode || 'collapsed'));
});
ipcMain.on('toggle-menu', (_evt, state) => applyMode(state ? 'menu' : 'collapsed'));
ipcMain.on('open-tool', (_evt, tool) => applyMode('screen'));