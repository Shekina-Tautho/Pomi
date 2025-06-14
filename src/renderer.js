const { ipcRenderer } = require('electron');

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-app");
});
