/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-04-15 16:53:53
 * @LastEditTime: 2023-03-21 12:08:18
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: electron-forge打包配置
 * @FilePath: \desktop-map\forge.config.js
 * 
 */
module.exports = {
  packagerConfig: {
    // extraResource: ['./assets/Readme.txt', './assets/img/a.png'], // 静态文件
    icon: './assets/icon',
    asar: true, // 以asar的方法加密，以防源码泄露
    osxSign: {} //IOS object must exist even if empty
  },

  makers: [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "desktop_map",
        "setupIcon": "./assets/icon.ico",
      }
    },
    // {
    //   "name": "@electron-forge/maker-zip",
    //   "platforms": [
    //     "darwin"
    //   ]
    // },
    // {
    //   "name": "@electron-forge/maker-deb",
    //   "config": {}
    // },
    // {
    //   "name": "@electron-forge/maker-rpm",
    //   "config": {}
    // }
  ]
}