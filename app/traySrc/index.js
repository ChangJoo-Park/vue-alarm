const electron = require('electron')
const { app, Menu, Tray } = electron
const traySrc = {
  appOpen: function () {

  },
  quitApp: function () {
    console.log('quitApp')
    app.quit()
  }
}

module.exports = traySrc
