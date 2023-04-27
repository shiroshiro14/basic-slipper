const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';
const fs = require('fs');
const pdfEncrypt = require('./renderer/js/encrypt-pdf.js');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Image Resizer',
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    //For devtool in dev environment 
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('request-mainprocess-action', (event, arg) => {
    var filePath = arg.pdfPath.toString().replaceAll('\\', '/');
    var password = arg.password;
    
    pdfEncrypt.encryptPdf(filePath,password);
})
