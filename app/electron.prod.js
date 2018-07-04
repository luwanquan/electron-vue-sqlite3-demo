const { app, BrowserWindow } = require('electron')
let mainWindow = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false
    },
    minWidth: 1092,
    minHeight: 768,
    fullscreenWindowTitle: true,
    autoHideMenuBar: true,
    show: false,
    backgroundColor: '#FAFAFA'
  })
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
  mainWindow.once('ready-to-show', () => {
    mainWindow.webContents.openDevTools()
    mainWindow.show()
    mainWindow.focus()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
