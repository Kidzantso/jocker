const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openTool: (tool) => ipcRenderer.send('open-tool', tool),
  toggleMenu: (state) => ipcRenderer.send('toggle-menu', state),
  setWidgetMode: (mode) => ipcRenderer.send('widget:setMode', mode)
});