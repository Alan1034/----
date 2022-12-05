/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-04-13 17:45:44
 * @LastEditTime: 2022-12-05 11:02:32
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 逆地理坐标
 * @FilePath: \desktop-map\components\marker.js
 * 
 */

export default class Marker {

  constructor() {
    this.marker = new AMap.Marker({
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      anchor: 'bottom-center'
    })
    new AMap.plugin(["AMap.Geocoder"], () => {
      console.info("AMap.Geocoder", "加载完成")
      this.geocoder = new AMap.Geocoder({
        // city: "010", //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
      });
    });

  }

  mapClick = async () => {
    // 逆地理编码（坐标 -> 地址）
    document.getElementById("regeo").onclick = this.regeoCode;
    document.getElementById('lnglat').onkeydown = (e) => {
      if (e.keyCode === 13) {
        this.regeoCode();
        return false;
      }
      return true;
    };
    // 地理编码（地址 -> 坐标）
    document.getElementById("geo").onclick = this.geoCode;
    document.getElementById('address').onkeydown = (e) => {
      if (e.keyCode === 13) {
        this.geoCode();
        return false;
      }
      return true;
    };
  }

  // 输入或点击地图获取经纬度。
  click = (e) => {
    document.getElementById('lnglat').value = e.lnglat;
    this.regeoCode();
  }

  bind = () => {
    window.map.on('click', this.click)

  }

  unbind = () => {
    window.map.off('click', this.click)

  }

  regeoCode = () => {
    const lnglat = document.getElementById('lnglat').value.split(',');
    window.map.add(this.marker);
    this.marker.setPosition(lnglat);
    this.geocoder.getAddress(lnglat, (status, result) => {
      if (status === 'complete' && result.regeocode) {
        const address = result.regeocode.formattedAddress;
        document.getElementById('address').value = address;
      } else {
        log.error('根据经纬度查询地址失败')
      }
    });
  }
  geoCode = () => {
    const address = document.getElementById('address').value;
    this.geocoder.getLocation(address, (status, result) => {
      if (status === 'complete' && result.geocodes.length) {
        var lnglat = result.geocodes[0].location
        document.getElementById('lnglat').value = lnglat;
        this.marker.setPosition(lnglat);
        window.map.add(this.marker);
        window.map.setFitView(this.marker);
      } else {
        log.error('根据地址查询位置失败');
      }
    });
  }

}