/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-03-14 16:28:50
 * @LastEditTime: 2022-04-15 14:56:42
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
    this.map
  }

  loadMap = () => {
    this.map = new AMap.Map("container", { //设置地图容器id
      // viewMode: "3D",         //是否为3D地图模式
      zoom: 14,                //初始化地图级别
      center: [116.434381, 39.898515], //初始化地图中心点位置
    })
    return new Promise((resolve) => {
      this.map.on("complete", () => {
        console.log("地图加载完成！");
        resolve()
      });
    })
  }

  mapEvent=()=>{
    this.map.on('dblclick', function (ev) {
      console.log(ev)
      // 触发事件的对象
      var target = ev.target;
      console.log(target)
      // 触发事件的地理坐标，AMap.LngLat 类型
      var lnglat = ev.lnglat;
  
      // 触发事件的像素坐标，AMap.Pixel 类型
      var pixel = ev.pixel;
  
      // 触发事件类型
      var type = ev.type;
      console.log(target)
    });
  }
}