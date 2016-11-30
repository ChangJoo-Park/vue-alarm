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
  const iconPath = path.join(__dirname, './src/assets/images/tray-icon.png')
  trayMenu = new Tray(iconPath)
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
  console.log('update tray')
  console.log(alarms)
  const menu = [{label: 'Vue-Alarm', type: 'normal', click() {mainWindow.show()}}]
  menu.push({label: '', type: 'separator'})
  if (alarms && alarms.length > 0) {
    const alarmCount = `${alarms.length}개`
    menu.push({label: `오늘의 알람 ${alarmCount}`, type: 'normal'})
    menu.push({label: '', type: 'separator'})
  } else {
    menu.push({label: `알람이 없습니다`, type: 'normal'})
  }
  alarms.forEach((alarm, index) => {
    // TODO: click 이벤트
    const isOnOff = alarm.isOn ? '켜짐' : '꺼짐'
    const menuItem = {label: `[${index + 1}] : ${alarm.time} (${isOnOff})`,type: 'normal'}
    menu.push(menuItem)
  })
  menu.push({label: '', type: 'separator'})
  menu.push({label: 'Quit', type: 'normal', click() {trayUtil.quitApp()}})
  const contextMenu = Menu.buildFromTemplate(menu)
  trayMenu.setContextMenu(contextMenu)
  // event.sender.send('async-reply', 'pong')
})
