/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-03-14 16:24:24
 * @LastEditTime: 2022-03-15 17:37:02
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \选区工具\preload.js
 * 
 */
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency])
//   }
// })

const { contextBridge } = require('electron')
const fs = require('fs')


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
  }
)
