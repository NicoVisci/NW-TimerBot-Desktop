const electron = require('electron');
const { globalShortcut } = require('electron');
// Module to control application life.
const { app, BrowserWindow } = require('electron');
// include the Node.js 'path' module at the top of your file
const path = require('path');
const { ipcMain } = require('electron/main');

require("electron-reload")(__dirname)

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    let chosenWidth = 180, chosenHeight = 130;
    const win = new BrowserWindow({
        width: chosenWidth,
        height: chosenHeight, 
        maxWidth: chosenWidth, minWidth: chosenWidth,
        maxHeight: chosenHeight, minHeight: chosenHeight,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            //preload: path.join(__dirname, 'preload.js')
        },
        transparent: true,
        alwaysOnTop: true,
    });
    let mlock = false;
    globalShortcut.register('Alt+CommandOrControl+X', () => {
        if(!mlock) { 
            win.setIgnoreMouseEvents(true);
            mlock = true;
        } else {
            win.setIgnoreMouseEvents(false);
            mlock = false;
        }
    })
    ipcMain.on("close-app", () => app.quit());
    win.loadFile('src/timer.html');

    const popupWin = new BrowserWindow({
        width: 400,
        height: 120, 
        maxWidth: 400, minWidth: 400,
        maxHeight: 120, minHeight: 120,
        frame: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            //preload: path.join(__dirname, 'preload.js')
        },
    });

    popupWin.loadFile("src/popup.html");
  };

const createSettingsWindow = () => {
    const settingsWin = new BrowserWindow({
        width: 450,
        height: 700,
        maxWidth: 450, minWidth: 450,
        maxHeight: 700, minHeight: 700,
        frame: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        },
        alwaysOnTop: true,
    });

    ipcMain.on("close-app", () => app.quit());
    settingsWin.loadFile('src/settings.html')
}

app.whenReady().then(createWindow)

app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
