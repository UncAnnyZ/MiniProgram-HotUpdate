
  const app = getApp()

  var onload = app.jsRun('', `/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function runCode() {
  // pages/schoolNav/schoolNav.js


  var Page = function Page(page) {
    return page;
  };
  return Page({
    parseTag: function parseTag(tag) {
      var res = {
        type1: "tag",
        name: "",
        voidElement: false,
        // attrs: {},
        children: []
      };
      var tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
      if (tagMatch) {
        // 标签名称为正则匹配的第2项
        res.type1 = tagMatch[1];
        if (tag.charAt(tag.length - 2) === "/") {
          // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
          res.voidElement = true;
        }
      }
      // 匹配所有的标签正则
      var classList = tag.match(/\\s([^'"/\\s><]+?)\\s*?=\\s*?(".*?"|'.*?')/g);

      if (classList) {
        var style = '';
        for (var i = 0; i < classList.length; i++) {
          // 去空格再以= 分隔字符串  得到['属性名称','属性值']

          var c = classList[i].split("=");
          // c[1] = c[1].replace(/\\s*/g, "")
          c[0] = c[0].replace(/\\s*/g, "");
          // 循环设置属性
          var p = c[1].substring(1, c[1].length - 1);
          try {
            p = JSON.parse(c[1].substring(1, c[1].length - 1));
          } catch (e) {}

          if (c[1]) {
            if (c[0] === 'style') {
              style += p;
              res[c[0]] = style;
            } else {
              res[c[0]] = p;
            }
          };
        }
      }
      return res;
    },
    parse: function parse(html) {
      var that = this;
      var result = [];
      var current = void 0;
      var level = -1;
      var arr = [];
      var tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
      html.replace(tagRE, function (tag, index) {
        // 判断第二个字符是不是'/'来判断是否open
        var isOpen = tag.charAt(1) !== "/";
        // 获取标签末尾的索引
        var start = index + tag.length;
        // 标签之前的文本信息
        var text = html.slice(start, html.indexOf("<", start));

        var parent = void 0;
        if (isOpen) {
          level++;
          // 设置标签属性
          current = that.parseTag(tag);
          // 判断是否为文本信息，是就push一个text children  不等于'  '
          if (!current.voidElement && text.trim()) {
            current["text"] = text;
          }
          // 如果我们是根用户，则推送新的基本节点
          if (level === 0) {
            result.push(current);
          }
          // 判断有没有上层，有就push当前标签
          parent = arr[level - 1];
          if (parent) {
            parent.children.push(current);
          }
          // console.log(current)
          arr[level] = current;
        }
        // 如果不是开标签，或者是空元素：</div><img>
        if (!isOpen || current.voidElement) {
          // level--
          level--;
        }
      });
      // console.log(result)
      return result;
    },

    setdata: function setdata(dictData) {

      this.setData(dictData);
      var html = "<view class='remind-box' wx:if='" + (_typeof(this.data.isLoading) === "object" ? JSON.stringify(this.data.isLoading) : this.data.isLoading) + "' style='align-items: center; display: flex; flex: 1; flex-direction: column; justify-content: center;'>  <image class='remind-img' src='/images/loading.gif'></image></view><view wx:else>  <view class='map_box' style='bottom: 130px; left: 0px; position: absolute; right: 0px; top: 0px;'>    <map style='height: 100%; width: 100%;' id='navi_map' longitude='" + (_typeof(this.data.userLongitude) === "object" ? JSON.stringify(this.data.userLongitude) : this.data.userLongitude) + "' latitude='" + (_typeof(this.data.userLatitude) === "object" ? JSON.stringify(this.data.userLatitude) : this.data.userLatitude) + "' scale='18' markers='" + (_typeof(this.data.markers) === "object" ? JSON.stringify(this.data.markers) : this.data.markers) + "' polyline='" + (_typeof(this.data.polyline) === "object" ? JSON.stringify(this.data.polyline) : this.data.polyline) + "' bindmarkertap='makertap' show-location subkey='JLHBZ-JQELU-I7HVD-B2XSN-5VU3Z-BZFDK' enable-3D='true' show-compass>      <cover-view class='controls " + (_typeof(this.data.fullscreen) === "object" ? JSON.stringify(this.data.fullscreen) : this.data.fullscreen ? "full" : "") + "' style='left: 85%; position: relative; top: 70%;'>        <cover-view bindtap='jtt'>          <cover-image class='img' src='image/staticMap.png' style='height: 80rpx; margin-top: 5px; width: 80rpx;'>        </cover-image></cover-view>        <cover-view bindtap='moveSchool'>          <cover-image class='img' src='image/moveSchool.png' style='height: 80rpx; margin-top: 5px; width: 80rpx;'>        </cover-image></cover-view>        <cover-view bindtap='location'>          <cover-image class='img' src='image/location.png' style='height: 80rpx; margin-top: 5px; width: 80rpx;'>        </cover-image></cover-view>      </cover-view>    </map>  </view>  <view class='text_box' style='bottom: 0px; height: 130px; left: 0px; position: absolute; right: 0px;'>    <view class='text_box_text' style='margin: 15px;'>\\u5E7F\\u4E1C\\u77F3\\u6CB9\\u5316\\u5DE5\\u5B66\\u9662 (\\u90AE\\u7F16\\uFF1A525000)</view>    <view class='text_box_text' style='margin: 15px;'>\\u5B98\\u6E21\\u6821\\u533A\\uFF1A\\u5E7F\\u4E1C\\u7701\\u8302\\u540D\\u5E02\\u8302\\u5357\\u533A\\u5B98\\u6E21\\u4E8C\\u8DEF139\\u53F7</view>    <view class='text_box_text' style='margin: 15px;'>\\u897F\\u57CE\\u6821\\u533A\\uFF1A\\u8302\\u540D\\u5E02\\u8302\\u5357\\u533A\\u4E2D\\u79D1\\u4E91\\u7CA4\\u897F\\u4EA7\\u4E1A\\u56ED</view>  </view></view>";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      mapHeight: "800",
      placeName: "",
      hideOrNot: 0,
      activePlaceID: -1,
      markers: [{
        id: 0,
        latitude: 21.677456,
        longitude: 110.924444,
        iconPath: "image/others.png",
        width: 23,
        height: 24,
        callout: {
          content: '公交站',
          display: 'ALWAYS'
        }
      }, {
        id: 1,
        latitude: 21.679041,
        longitude: 110.922631,
        iconPath: "image/sports.png",
        width: 23,
        height: 24,
        callout: {
          content: '体育馆',
          display: 'ALWAYS'
        }
      }, {
        id: 2,
        latitude: 21.680033,
        longitude: 110.924519,
        iconPath: "image/sports.png",
        width: 23,
        height: 24,
        callout: {
          content: '游泳池',
          display: 'ALWAYS'
        }
      }, {
        id: 3,
        latitude: 21.681175,
        longitude: 110.922615,
        iconPath: "image/sports.png",
        width: 23,
        height: 24,
        callout: {
          content: '球类体育场',
          display: 'ALWAYS'
        }
      }, {
        id: 4,
        latitude: 21.678962,
        longitude: 110.923371,
        iconPath: "image/xingzheng.png",
        width: 23,
        height: 24,
        callout: {
          content: '综合楼',
          display: 'ALWAYS'
        }
      }, {
        id: 5,
        latitude: 21.677855,
        longitude: 110.921939,
        iconPath: "image/xingzheng.png",
        width: 23,
        height: 24,
        callout: {
          content: '中专楼',
          display: 'ALWAYS'
        }
      }, {
        id: 6,
        latitude: 21.680981,
        longitude: 110.921472,
        iconPath: "image/sports.png",
        width: 23,
        height: 24,
        callout: {
          content: '操场',
          display: 'ALWAYS'
        }
      }, {
        id: 7,
        latitude: 21.677591,
        longitude: 110.922867,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '一教',
          display: 'ALWAYS'
        }
      }, {
        id: 8,
        latitude: 21.677147,
        longitude: 110.921789,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '二教A',
          display: 'ALWAYS'
        }
      }, {
        id: 9,
        latitude: 21.677541,
        longitude: 110.921778,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '二教B',
          display: 'ALWAYS'
        }
      }, {
        id: 10,
        latitude: 21.678897,
        longitude: 110.920882,
        iconPath: "image/xiaomen.png",
        width: 23,
        height: 24,
        callout: {
          content: '计算机楼',
          display: 'ALWAYS'
        }
      }, {
        id: 11,
        latitude: 21.679276,
        longitude: 110.920893,
        iconPath: "image/shitang.png",
        width: 23,
        height: 24,
        callout: {
          content: '一饭',
          display: 'ALWAYS'
        }
      }, {
        id: 12,
        latitude: 21.682197,
        longitude: 110.922476,
        iconPath: "image/shitang.png",
        width: 23,
        height: 24,
        callout: {
          content: '二饭',
          display: 'ALWAYS'
        }
      }, {
        id: 13,
        latitude: 21.679365,
        longitude: 110.920169,
        iconPath: "image/shitang.png",
        width: 23,
        height: 24,
        callout: {
          content: '四饭和4D区',
          display: 'ALWAYS'
        }
      }, {
        id: 14,
        latitude: 21.679699,
        longitude: 110.920732,
        iconPath: "image/shitang.png",
        width: 23,
        height: 24,
        callout: {
          content: '五饭',
          display: 'ALWAYS'
        }
      }, {
        id: 15,
        latitude: 21.679704,
        longitude: 110.92158,
        iconPath: "image/sushe.png",
        width: 23,
        height: 24,
        callout: {
          content: '1区',
          display: 'ALWAYS'
        }
      }, {
        id: 16,
        latitude: 21.678842,
        longitude: 110.920657,
        iconPath: "image/sushe.png",
        width: 23,
        height: 24,
        callout: {
          content: '2区',
          display: 'ALWAYS'
        }
      }, {
        id: 17,
        latitude: 21.682227,
        longitude: 110.921794,
        iconPath: "image/sushe.png",
        width: 23,
        height: 24,
        callout: {
          content: '3区',
          display: 'ALWAYS'
        }
      }, {
        id: 18,
        latitude: 21.680123,
        longitude: 110.920544,
        iconPath: "image/sushe.png",
        width: 23,
        height: 24,
        callout: {
          content: '4区',
          display: 'ALWAYS'
        }
      }, {
        id: 19,
        latitude: 21.676374,
        longitude: 110.92346,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '实验楼',
          display: 'ALWAYS'
        }
      }, {
        id: 20,
        latitude: 21.678588,
        longitude: 110.924026,
        iconPath: "image/sushe.png",
        width: 23,
        height: 24,
        callout: {
          content: '5区',
          display: 'ALWAYS'
        }
      }, {
        id: 21,
        latitude: 21.658237,
        longitude: 110.820106,
        iconPath: "image/sushe.png",
        width: 23,
        height: 24,
        callout: {
          content: '北苑B区',
          display: 'ALWAYS'
        }
      }, {
        id: 22,
        latitude: 21.65702,
        longitude: 110.820272,
        iconPath: "image/sushe.png",
        width: 23,
        height: 24,
        callout: {
          content: '北苑A区',
          display: 'ALWAYS'
        }
      }, {
        id: 23,
        latitude: 21.655834,
        longitude: 110.823206,
        iconPath: "image/sports.png",
        width: 23,
        height: 24,
        callout: {
          content: '体育馆',
          display: 'ALWAYS'
        }
      }, {
        id: 24,
        latitude: 21.656662,
        longitude: 110.819054,
        iconPath: "image/shitang.png",
        width: 23,
        height: 24,
        callout: {
          content: '北华饭堂',
          display: 'ALWAYS'
        }
      }, {
        id: 25,
        latitude: 21.65375,
        longitude: 110.821023,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '艺术楼',
          display: 'ALWAYS'
        }
      }, {
        id: 26,
        latitude: 21.652952,
        longitude: 110.81847,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '教学综合楼',
          display: 'ALWAYS'
        }
      }, {
        id: 27,
        latitude: 21.653321,
        longitude: 110.815943,
        iconPath: "image/sushe.png",
        width: 23,
        height: 24,
        callout: {
          content: '西南区饭堂',
          display: 'ALWAYS'
        }
      }, {
        id: 28,
        latitude: 21.65553,
        longitude: 110.816774,
        iconPath: "image/jiaoxuelou.png",
        width: 23,
        height: 24,
        callout: {
          content: '教学楼（看详细地图）',
          display: 'ALWAYS'
        }
      }],
      distance: '',
      cost: '',
      polyline: [],
      userLongitude: 110.922599,
      userLatitude: 21.679529,
      inSchool: false,
      isLoading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(e) {
      var _this = this;
      wx.showModal({
        title: '选择校区',
        showCancel: true, //是否显示取消按钮
        content: "请选择校区",
        cancelText: "西城校区", //默认是“取消”
        confirmText: "官渡校区", //默认是“确定”
        success: function success(res) {
          if (res.cancel) {
            _this.setdata({
              userLongitude: 110.818019,
              userLatitude: 21.654388
            });
          } else {
            _this.setdata({
              userLongitude: 110.922599,
              userLatitude: 21.679529
            });
          }
        },
        fail: function fail(res) {}, //接口调用失败的回调函数
        complete: function complete(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
      });

      // if (e.markerId !== '' && Object.keys(e).length !== 0) {
      //   _this.makertap(e);
      // }
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function success(res) {
          _this.setdata({
            userLongitude: res.longitude,
            userLatitude: res.latitude
          });
        }
      });
    },
    onReady: function onReady() {
      this.setdata({});
      var that = this;
      setTimeout(function () {
        that.setdata({
          isLoading: false
        });
      }, 800);
    },
    makertap: function makertap(e) {
      console.log(e);
      var id = e.markerId;
      var that = this;
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function success(res) {
          that.setdata({
            userLongitude: res.longitude,
            userLatitude: res.latitude
          });
          that.setdata({
            activePlaceID: id,
            placeName: that.data.markers[id].callout.content
          });
          var userLocation = that.data.userLongitude + ',' + that.data.userLatitude;
          var destination = that.data.markers[id].longitude + ',' + that.data.markers[id].latitude;
          that.planPolyline(userLocation, destination);
        }
      });
    },
    planPolyline: function planPolyline(origin, destination) {
      var that = this;
      var id = that.data.activePlaceID;
      //规划步行路线
      myAmapFun.getWalkingRoute({
        origin: origin,
        destination: destination,
        success: function success(data) {
          var points = [];
          if (data.paths && data.paths[0] && data.paths[0].steps) {
            var steps = data.paths[0].steps;
            for (var i = 0; i < steps.length; i++) {
              var poLen = steps[i].polyline.split(';');
              for (var j = 0; j < poLen.length; j++) {
                points.push({
                  longitude: parseFloat(poLen[j].split(',')[0]),
                  latitude: parseFloat(poLen[j].split(',')[1])
                });
              }
            }
          }
          that.setdata({
            json: data.paths[0],
            polyline: [{
              points: points,
              color: "#7acfa6",
              width: 6
            }]
          });
          if (data.paths[0] && data.paths[0].distance) {
            that.setdata({
              distance: data.paths[0].distance + '米'
            });
          }
          if (data.paths[0] && data.paths[0].duration) {
            that.setdata({
              cost: parseInt(data.paths[0].duration / 60) + '分钟'
            });
          }
          var markers = that.data.markers;
          var points = that.data.polyline[0].points;
          //暂时一共70个坐标点
          markers[22] = {
            id: 22,
            latitude: points[0].latitude,
            longitude: points[0].longitude,
            iconPath: '../..image/mapicon_navi_s.png',
            width: 23,
            height: 33
          };
          markers[23] = {
            id: 23,
            latitude: points[points.length - 1].latitude,
            longitude: points[points.length - 1].longitude,
            iconPath: '../..image/mapicon_navi_e.png',
            width: 24,
            height: 34
          };

          that.setdata({
            markers: markers
          });
        }
      });
    },
    location: function location() {
      var _this = this;
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
        success: function success(res) {
          _this.setdata({
            userLongitude: res.longitude,
            userLatitude: res.latitude
          });
        }
      });
    },
    moveSchool: function moveSchool() {
      //视图返回学校
      var _this = this;
      wx.showModal({
        title: '选择校区',
        showCancel: true, //是否显示取消按钮
        content: "请选择校区",
        cancelText: "西城校区", //默认是“取消”
        confirmText: "官渡校区", //默认是“确定”
        success: function success(res) {
          if (res.cancel) {
            _this.setdata({
              userLongitude: 110.818019,
              userLatitude: 21.654388
            });
          } else {
            _this.setdata({
              userLongitude: 110.922599,
              userLatitude: 21.679529
            });
          }
        },
        fail: function fail(res) {}, //接口调用失败的回调函数
        complete: function complete(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
      });
    },
    jtt: function jtt() {
      wx.showModal({
        title: '选择校区',
        showCancel: true, //是否显示取消按钮
        content: "请选择校区",
        cancelText: "西城校区", //默认是“取消”
        confirmText: "官渡校区", //默认是“确定”
        success: function success(res) {
          if (res.cancel) {
            wx.previewImage({
              current: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/a.png", // 当前显示图片的http链接
              urls: ["cloud://un1-d62c68.756e-un1-d62c68-1258307938/a.png"] // 需要预览的图片http链接列表
            });
          } else {
            wx.previewImage({
              current: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/b.png", // 当前显示图片的http链接
              urls: "cloud://un1-d62c68.756e-un1-d62c68-1258307938/b.png" // 需要预览的图片http链接列表
            });
          }
        },
        fail: function fail(res) {}, //接口调用失败的回调函数
        complete: function complete(res) {} //接口调用结束的回调函数（调用成功、失败都会执行）
      });
    },
    goDetail: function goDetail() {
      var that = this;
      var latitude = that.data.markers[that.data.activePlaceID].latitude;
      var longitude = that.data.markers[that.data.activePlaceID].longitude;
      var name = that.data.markers[that.data.activePlaceID].callout.content;
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        name: name,
        address: '广东石油化工学院',
        scale: 8
      });
    }
  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map`)
  console.log(onload())
  Page(onload())
