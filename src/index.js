const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');


if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 290,
    height: 370,
    resizable: false,
    transparent: true,
    frame: false,
    alwaysOnTop: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

 
  mainWindow.webContents.openDevTools();
};


ipcMain.on('close-app', () => {
  BrowserWindow.getFocusedWindow().close();
});


ipcMain.on("open-timer-settings", () => {
  const settingsWindow = new BrowserWindow({
    width: 290,
    height: 370,
    resizable: false,
    parent: mainWindow,
    transparent: true,
    frame: false,
    alwaysOnTop: false,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  settingsWindow.loadFile(path.join(__dirname, 'timer-settings.html'));
  settingsWindow.once("ready-to-show", () => {
    settingsWindow.show();
  });
});



ipcMain.on("update-settings", (event, settings) => {
  mainWindow.webContents.send("apply-settings", settings);
});



app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});