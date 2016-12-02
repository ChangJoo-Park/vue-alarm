'use strict'

const electron = require('electron')
const { app, Menu, Tray, ipcMain } = electron
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const trayUtil = require('./traySrc')

console.log(trayUtil)
let mainWindow
let trayMenu
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    minWidth: 400,
    minHeight: 500,
    resizable: false
  })


  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  // mainWindow.on('close', function (event) {
  //   if (!app.isQuiting) {
  //     event.preventDefault()
  //     mainWindow.hide()
  //   }
  //   return false;
  // })

  console.log('mainWindow opened')

}

function createTrayMenu () {
  console.log('trayMenu')
  // >> Build
  // const iconPath = path.join(app.getAppPath(), './dist/imgs/light-tray-icon.png')
  // const highlightIconPath = path.join(app.getAppPath(), './dist/imgs/dark-tray-icon.png')
  const iconPath = path.join(__dirname, './dist/imgs/light-tray-icon.png')
  const highlightIconPath = path.join(__dirname, './dist/imgs/dark-tray-icon.png')
  // >> Dev
  // const iconPath = path.join(__dirname, 'light-tray-icon.png')
  // const highlightIconPath = path.join(__dirname, 'dark-tray-icon.png')
  console.log('Before Tray instance create')
  trayMenu = new Tray(iconPath)
  console.log('After Tray instance create')
  trayMenu.setPressedImage(highlightIconPath)
  trayMenu.setToolTip('Vue-Alarm :)')
  const defaultContextMenu = Menu.buildFromTemplate([
    {label: 'Vue-Alarm', type: 'normal', click() {
      console.log('Show App')
      mainWindow.show()
    }},
    {label: '', type: 'separator'},
    {label: 'Quit', type: 'normal', click () {
      trayUtil.quitApp()
    }}
  ])
  trayMenu.setContextMenu(defaultContextMenu)
}

app.on('ready', () => {
  createWindow()
  createTrayMenu()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// IPC
// TODO: 문구들을 앱에서 전달받도록 해야함
ipcMain.on('async-update-tray', (event, alarms) => {
  const menu = [{label: 'Vue-Alarm', type: 'normal', click() {mainWindow.show()}}]
  menu.push({label: '', type: 'separator'})
  if (alarms && alarms.length > 0) {
    const alarmCount = `${alarms.length}개`
    menu.push({label: `예정된 알람 ${alarmCount}`, type: 'normal'})
    menu.push({label: '', type: 'separator'})
  } else {
    menu.push({label: `알람이 없습니다`, type: 'normal'})
  }
  // TODO: OS별 작동하는지 테스트
  app.setBadgeCount(alarms.length)
  alarms.forEach((alarm, index) => {
    const menuItem = {
      label: `[${index + 1}] : ${alarm.time}`,
      type: 'checkbox',
      checked: alarm.isOn,
      click() {
        event.sender.send('async-reply-tray', alarm)
      }
    }
    menu.push(menuItem)
  })
  menu.push({label: '', type: 'separator'})
  menu.push({label: 'Quit', type: 'normal', click() {trayUtil.quitApp()}})
  const contextMenu = Menu.buildFromTemplate(menu)
  trayMenu.setContextMenu(contextMenu)
})
