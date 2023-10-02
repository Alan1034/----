<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2022-03-15 18:34:04
 * @LastEditTime: 2023-10-02 23:49:22
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \desktop-map\readme.md
 * 
-->
开始start:
npm install
npm run start

打包package:
npx electron-forge import
npm run make 

windows环境下数据文件会生成到桌面
under windows environment the data file should created in Desktop

路径内不能有中文

如果打开后地图无法显示，请到高德开放平台 https://console.amap.com/dev/key/app 申请Key和安全密钥并根据提示进行修改
If the map cannot be displayed after opening, please go to the Gaode Open Platform https://console.amap.com/dev/key/app Apply for a Key and security key and modify them according to the prompts

逆地理编码功能：

Reverse geocoding:

![insta](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202206271221764.gif)



绘制覆盖物（多边形）功能：

Draw cover (polygon):

![insta](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202206281142003.gif)