/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-03-14 16:22:58
 * @LastEditTime: 2022-04-15 16:30:39
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \desktop-map\main.js
 * 
 */
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      // nodeIntegration: true,  //直接暴露node方法到JS中，不安全，推荐preload里面按需加载
      // nodeIntegrationInWorker: true,
      // contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, './assets/favicon.png'),
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()

  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})