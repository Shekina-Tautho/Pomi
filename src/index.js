const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
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

  // Optional: Remove this in production
  mainWindow.webContents.openDevTools();
};

// ✅ IPC Listener for closing the app
ipcMain.on('close-app', () => {
  BrowserWindow.getFocusedWindow().close();
});

// ✅ IPC Listener for opening the settings window
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


// ✅ Forward updated timer settings to main window
ipcMain.on("update-settings", (event, settings) => {
  mainWindow.webContents.send("apply-settings", settings);
});


// Create main window when ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit on all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});