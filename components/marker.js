/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-04-13 17:45:44
 * @LastEditTime: 2022-04-14 18:18:03
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 逆地理坐标
 * @FilePath: \desktop-map\components\marker.js
 * 
 */

import MapData from "./renderer.js";

export default class Marker extends MapData {

  constructor() {
    super()
    this.marker = new AMap.Marker({
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      anchor: 'bottom-center'
    })

  }
  mapClick = async () => {
    await new Promise((resolve) => {
      new AMap.plugin(["AMap.Geocoder"], () => {
        console.log("AMap.Geocoder")
        resolve();
      });
    });
    console.log("AMap.Geocoder")
    document.getElementById("regeo").onclick = this.regeoCode;
    document.getElementById('lnglat').onkeydown = (e) => {
      if (e.keyCode === 13) {
        this.regeoCode();
        return false;
      }
      return true;
    };
  }

  click = (e) => {
    console.log("bind")
    document.getElementById('lnglat').value = e.lnglat;
    this.regeoCode();
  }

  bind = () => {
    console.log("bind")
    console.log(this.map)
    this.map.on('click', this.click)

  }

  unbind = () => {
    this.map.off('click', this.click)

  }

  regeoCode = () => {
    console.log("regeoCode")
    const lnglat = document.getElementById('lnglat').value.split(',');
    this.map.add(this.marker);
    this.marker.setPosition(lnglat);
    const geocoder = new AMap.Geocoder({
      // city: "010", //城市设为北京，默认：“全国”
      radius: 1000 //范围，默认：500
    });
    geocoder.getAddress(lnglat, (status, result) => {
      // console.log(status, result)
      if (status === 'complete' && result.regeocode) {
        const address = result.regeocode.formattedAddress;
        document.getElementById('address').value = address;
      } else {
        log.error('根据经纬度查询地址失败')
      }
    });
  }

}