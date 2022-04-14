/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-03-14 16:24:24
 * @LastEditTime: 2022-04-14 17:10:25
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \desktop-map\preload.js
 * 
 */


const { contextBridge } = require('electron')
const fs = require('fs')
const os = require('os');
const path = require('path');

contextBridge.exposeInMainWorld(
  'electron',
  {
    createWriteStream: (name, path) => {
      const writerStream = fs.createWriteStream(name);
      writerStream.write(JSON.stringify(path), 'UTF8');
      writerStream.end()
      return (channel = "close", func) => writerStream.on(channel, () => {
        func(writerStream)
      })
    },
    getHomeDesktopDir: (filename) => {
      const homedir = os.homedir()
      const dirPath = path.format({
        dir: path.join(homedir, "Desktop"),
        base: `${filename}`
      });
      return dirPath
    }
  }
)
