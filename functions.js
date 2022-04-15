/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-04-12 15:32:29
 * @LastEditTime: 2022-04-15 14:48:33
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \desktop-map\functions.js
 * 
 */


import MapData from "./components/renderer.js";
import Polygon from "./components/polygon.js";
import Marker from "./components/marker.js";




const loadApp = async () => {
  const mapData = new MapData
  await mapData.loadMap()
  window.map = mapData.map

  window.Marker = new Marker
  window.Polygon = new Polygon
  // 加载地图工具，绘制事件
  window.Polygon.draw()
  // 加载地图插件和点击事件
  window.Marker.mapClick()
}
loadApp()
