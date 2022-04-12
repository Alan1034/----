/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-04-12 10:58:59
 * @LastEditTime: 2022-04-12 18:37:09
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: polygon
 * @FilePath: \desktop-map\components\polygon.js
 * 
 */

import MapData from "./renderer.js";

export default class Polygon extends MapData {

  constructor() {
    super()
    this.mouseTool = new AMap.MouseTool(this.map);
    this.polyEditor;
    this.path;

  }


  drawPolygon = () => {
    this.mouseTool.polygon({
      strokeColor: "#FF33FF",
      strokeOpacity: 1,
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillColor: "#1791fc",
      fillOpacity: 0.4,
      // 线样式还支持 'dashed'
      strokeStyle: "solid",
      // strokeStyle是dashed时有效
      // strokeDasharray: [30,10],
    });
  }

  draw = () => {
    this.mouseTool.on("draw", (event) => {
      // event.obj 为绘制出来的覆盖物对象
      this.path = event.obj.w.path
      log.info("覆盖物对象绘制完成");
      new Notification("地图工具", { body: "覆盖物对象绘制完成" })

      this.polygon = event.obj;
      this.polyEditor = this.edit(event.obj);
    });
  }

  edit = (polygon) => {
    if (!polygon) return;
    const polyEditor = new AMap.PolyEditor(this.map, polygon);

    polyEditor.on("addnode", (event) => {
      log.info("触发事件：addnode");
    });

    polyEditor.on("adjust", (event) => {
      log.info("触发事件：adjust");
    });

    polyEditor.on("removenode", (event) => {
      log.info("触发事件：removenode");
    });

    polyEditor.on("end", (event) => {
      log.info("触发事件： end", event.target.w.path);
      // event.target 即为编辑后的多边形对象
      new Notification("多边形路径", { body: JSON.stringify(event.target.w.path) })
      this.writeData(event.target.w.path)
    });
    return polyEditor;
  };



  writeData = async () => {
    if (!this.path) {
      new Notification("警告", {
        body:
          `没有覆盖物路径`
      })
      return
    }
    const homedir = window.electron.getHomeDesktopDir("Polygon_path.txt");
    const writer = window.electron.createWriteStream(`${homedir}`, this.path);
    writer("close", (writerStream) => {
      new Notification("生成文件完成", {
        body:
          `总共写入了${writerStream.bytesWritten}个字节到桌面"${writerStream.path}"文件`
      })
    })
  }

  addPath = () => {
    const text = document.getElementById("tipinput").value

    if (!text || !JSON.parse(text)) {
      return
    }
    const polylinePath = JSON.parse(text).map((item) => {
      return new AMap.LngLat(item.lng, item.lat)
    });
    this.path = polylinePath

    const polygon = new AMap.Polygon({
      path: this.path,
      fillOpacity: 0.35,
    });

    this.map.add(polygon)
    this.map.setFitView(polygon);
    this.polyEditor = this.edit(polygon);
    // overlayGroup.show();
  }

  removeAllOverlay = () => {
    this.path = null
    // 清除地图上所有添加的覆盖物
    this.map.clearMap();
  }
}


