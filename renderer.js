/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-03-14 16:28:50
 * @LastEditTime: 2022-03-16 10:32:40
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \desktop-map\renderer.js
 * 
 */


// const AMapLoader = require('@amap/amap-jsapi-loader');
// const { app, BrowserWindow, Notification } = require('electron')

const map = new AMap.Map("container", { //设置地图容器id
  // viewMode: "3D",         //是否为3D地图模式
  zoom: 14,                //初始化地图级别
  center: [116.434381, 39.898515], //初始化地图中心点位置
});

var mouseTool = new AMap.MouseTool(map);

function drawPolygon() {
  mouseTool.polygon({
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

let polyEditor;
let path;
mouseTool.on("draw", (event) => {
  // event.obj 为绘制出来的覆盖物对象
  path = event.obj.w.path
  log.info("覆盖物对象绘制完成");
  new Notification("地图工具", { body: "覆盖物对象绘制完成" })

  polygon = event.obj;
  polyEditor = edit(event.obj);
});

const edit = (polygon) => {
  if (!polygon) return;
  const polyEditor = new AMap.PolyEditor(map, polygon);

  polyEditor.on("addnode", function (event) {
    log.info("触发事件：addnode");
  });

  polyEditor.on("adjust", function (event) {
    log.info("触发事件：adjust");
  });

  polyEditor.on("removenode", function (event) {
    log.info("触发事件：removenode");
  });

  polyEditor.on("end", function (event) {
    log.info("触发事件： end", event.target.w.path);
    // event.target 即为编辑后的多边形对象
    new Notification("多边形路径", { body: JSON.stringify(event.target.w.path) })
    writeData(event.target.w.path)
  });
  return polyEditor;
};



const writeData = async () => {
  if (!path) {
    new Notification("警告", {
      body:
        `没有覆盖物路径`
    })
    return
  }
  const homedir = window.electron.getHomeDesktopDir("多边形路径.txt");
  const writer = window.electron.createWriteStream(`${homedir}`, path);
  writer("close", (writerStream) => {
    new Notification("生成文件完成", {
      body:
        `总共写入了${writerStream.bytesWritten}个字节到桌面"${writerStream.path}"文件`
    })
  })
}

const addPath = () => {
  const text = document.getElementById("tipinput").value

  if (!text || !JSON.parse(text)) {
    return
  }
  const polylinePath = JSON.parse(text).map((item) => {
    return new AMap.LngLat(item.lng, item.lat)
  });
  path = polylinePath

  const polygon = new AMap.Polygon({
    path: path,
  });

  map.add(polygon)
  map.setFitView(polygon);
  polyEditor = edit(polygon);
  // overlayGroup.show();
}

const removeAllOverlay = () => {
  path = null
  // 清除地图上所有添加的覆盖物
  map.clearMap();
}