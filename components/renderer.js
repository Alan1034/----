/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-03-14 16:28:50
 * @LastEditTime: 2022-04-12 15:32:10
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \desktop-map\components\renderer.js
 * 
 */


// const AMapLoader = require('@amap/amap-jsapi-loader');
// const { app, BrowserWindow, Notification } = require('electron')


export default class MapData {
  constructor() {
    this.map = new AMap.Map("container", { //设置地图容器id
      // viewMode: "3D",         //是否为3D地图模式
      zoom: 14,                //初始化地图级别
      center: [116.434381, 39.898515], //初始化地图中心点位置
    })
  }

}