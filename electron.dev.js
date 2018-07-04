const { app, BrowserWindow } = require('electron')
let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // width: 1092,
        // height: 768,
        useContentSize: true,
        titleBarStyle: 'hiddenInset',
        autoHideMenuBar: true
    })
    mainWindow.loadURL('http://localhost:8080')
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})
