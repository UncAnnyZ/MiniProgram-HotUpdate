
  const app = getApp()
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      html : [{type: 'view', text: '模版错误啦'}],
      
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var args = {
        xxx: 'xxx',
        code: `/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function runCode() {

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
          var lengthc = 2;
          for (lengthc; lengthc < c.length; lengthc++) {
            c[1] += "=" + c[lengthc];
          }
          var p = c[1].substring(1, c[1].length - 1);
          try {
            p = JSON.parse(c[1].substring(1, c[1].length - 1));
          } catch (e) {}

          if (c[1]) {
            if (c[0] === 'style') {
              style = p + style;
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

      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var html = "<view class='page' style='background-color: rgba(246,246,246); height: 1720rpx; margin: 0; width: 100%;'>  <view class='container' style='height: 100%;'>    <view class='write_Info_Container' style='left: 15rpx; position: absolute; right: 15rpx; top: 20rpx;'>      <view class='title' style='color: rgba(16,16,16,0.5); font-size: 36rpx; font-weight: 800; margin-bottom: 30rpx; padding-bottom: 15rpx; padding-top: 40rpx; text-align: center;'><text>test</text></view>      <view class='temperature' style='background-color: white; border-radius: 10rpx; display: flex; font-size: 28rpx; font-weight: 500; margin-bottom: 30rpx; padding: 20rpx 0rpx; padding-bottom: 15rpx; padding-left: 10rpx; padding-right: 10rpx;'>        <view>\\u9009\\u62E9\\u5B66\\u6821</view>        <view class='section_temperature'>          <picker bindchange='chooseTemperature' value='" + (_typeof(this.data.temperature) === "object" ? JSON.stringify(this.data.temperature) : this.data.temperature) + "' range='" + (_typeof(this.data.temperature) === "object" ? JSON.stringify(this.data.temperature) : this.data.temperature) + "'>            <view class='tem' style='border-bottom: 1rpx solid rgba(231,231,231,086); font-size: 24rpx; position: absolute; right: 15rpx; text-align: center; width: 20%;'>              " + (_typeof(this.data.tem) === "object" ? JSON.stringify(this.data.tem) : this.data.tem) + "            </view>          </picker>        </view>      </view>      <view class='temperature' style='background-color: white; border-radius: 10rpx; display: flex; font-size: 28rpx; font-weight: 500; margin-bottom: 30rpx; padding: 20rpx 0rpx; padding-bottom: 15rpx; padding-left: 10rpx; padding-right: 10rpx;'>        <text>\\u662F\\u5426\\u6DFB\\u52A0\\u5230\\u9996\\u9875\\u914D\\u7F6E</text>        <view class='section_Yse_no'>          <picker bindchange='choose_ever' value='" + (_typeof(this.data.everInDangerRegionYesNo) === "object" ? JSON.stringify(this.data.everInDangerRegionYesNo) : this.data.everInDangerRegionYesNo) + "' range='" + (_typeof(this.data.everInDangerRegionYesNo) === "object" ? JSON.stringify(this.data.everInDangerRegionYesNo) : this.data.everInDangerRegionYesNo) + "'>            <view class='tem' style='border-bottom: 1rpx solid rgba(231,231,231,086); font-size: 24rpx; position: absolute; right: 15rpx; text-align: center; width: 20%;'>              " + (_typeof(this.data.everInDangerRegion) === "object" ? JSON.stringify(this.data.everInDangerRegion) : this.data.everInDangerRegion) + "            </view>          </picker>        </view>      </view>      " + (_typeof(this.data.Ever_InDanger) === "object" ? JSON.stringify(this.data.Ever_InDanger) : this.data.Ever_InDanger ? "<view style='temperature'  style='background-color: white; border-radius: 10rpx; display: flex; font-size: 28rpx; font-weight: 500; margin-bottom: 30rpx; padding: 20rpx 0rpx; padding-bottom: 15rpx; padding-left: 10rpx; padding-right: 10rpx;'>        <text style='line-height:64rpx'>\\u5177\\u4F53\\u5730\\u70B9</text>        <view class='ever_address_section'>          <picker mode='region' bindchange='everliveRegionChange' value='" + (_typeof(this.data.everLiveregion) === "object" ? JSON.stringify(this.data.everLiveregion) : this.data.everLiveregion) + "' custom-item='" + (_typeof(this.data.customItem) === "object" ? JSON.stringify(this.data.customItem) : this.data.customItem) + "'>            <view class='ever_region_section'>              " + (_typeof(this.data.everLiveregion) === "object" ? JSON.stringify(this.data.everLiveregion) : this.data.everLiveregion) + "            </view>          </picker>        </view>        <view style='width:80%'>          <input style='border-left: 1rpx solid rgba(127,127,127,0.3); border-radius: 10rpx; margin-left: 20rpx; padding: 10rpx 20rpx; vertical-align: middle; width: 60%;' type='text' placeholder='\\u8BE6\\u7EC6\\u5730\\u5740' bindinput='everIndangerPlaceText' value='" + (_typeof(this.data.everIndangerRegionText) === "object" ? JSON.stringify(this.data.everIndangerRegionText) : this.data.everIndangerRegionText) + "'></input>        </view>      </view>" : "      <view wx:else></view>") + "      <view class='temperature' style='background-color: white; border-radius: 10rpx; display: flex; font-size: 28rpx; font-weight: 500; margin-bottom: 30rpx; padding: 20rpx 0rpx; padding-bottom: 15rpx; padding-left: 10rpx; padding-right: 10rpx;'>        <text>\\u7248\\u672C\\u53F7</text>        <view>          <picker bindchange='QRcolor' value='" + (_typeof(this.data.QRcolor) === "object" ? JSON.stringify(this.data.QRcolor) : this.data.QRcolor) + "' range='" + (_typeof(this.data.QRcolor) === "object" ? JSON.stringify(this.data.QRcolor) : this.data.QRcolor) + "'>            <view class='tem' style='border-bottom: 1rpx solid rgba(231,231,231,086); font-size: 24rpx; position: absolute; right: 15rpx; text-align: center; width: 20%;'>              " + (_typeof(this.data.qrColor) === "object" ? JSON.stringify(this.data.qrColor) : this.data.qrColor) + "            </view>          </picker>        </view>      </view>      <view class='temperature' style='background-color: white; border-radius: 10rpx; display: flex; font-size: 28rpx; font-weight: 500; margin-bottom: 30rpx; padding: 20rpx 0rpx; padding-bottom: 15rpx; padding-left: 10rpx; padding-right: 10rpx;'>        <text>\\u540D\\u79F0</text>        <view>          <picker bindchange='inMaoMingChange' value='" + (_typeof(this.data.InMaoMingYesNo) === "object" ? JSON.stringify(this.data.InMaoMingYesNo) : this.data.InMaoMingYesNo) + "' range='" + (_typeof(this.data.InMaoMingYesNo) === "object" ? JSON.stringify(this.data.InMaoMingYesNo) : this.data.InMaoMingYesNo) + "'>            <view class='tem' style='border-bottom: 1rpx solid rgba(231,231,231,086); font-size: 24rpx; position: absolute; right: 15rpx; text-align: center; width: 20%;'>              " + (_typeof(this.data.inMaoMing) === "object" ? JSON.stringify(this.data.inMaoMing) : this.data.inMaoMing) + "            </view>          </picker>        </view>      </view>      <view class='inp'>        <text style='font-size:26rpx;font-weight:800;color:rgba(16,16,16,0.7)'>\\u5F53\\u524D\\u4EE3\\u7801</text>        <textarea type='text' placeholder='\\u8BF7\\u8F93\\u5165\\u8BE6\\u7EC6\\u5730\\u5740' value='" + (_typeof(this.data.text) === "object" ? JSON.stringify(this.data.text) : this.data.text) + "' bindinput='inp_region' style='background-color: #fff; border-radius: 20rpx; box-sizing: border-box; font-size: 24rpx; height: 200rpx; margin-top: 20rpx; padding: 10rpx 10rpx; width: 100%;'>        </textarea>      </view>      <view class='end' style='margin-top: 40rpx;'>        <view class='btn_color1'><button class='btnSubmit' bindtap='submit' style='background: #74d5d3; border-radius: 20rpx; color: white; font-size: 40rpx; font-weight: 800; height: 80rpx; line-height: 55rpx; margin-bottom: 20rpx; text-align: center; width: 400rpx;'>\\u54C8\\u54C8\\u54C8</button></view>        <button class='btnCancel' bindtap='cancel' style='border: 2rpx solid red; border-radius: 20rpx; color: red; font-size: 40rpx; font-weight: 500; height: 80rpx; line-height: 55rpx; margin: 0 auto; text-align: center; width: 600rpx;'>\\u6D4B\\u8BD5</button>      </view>    </view>  </view></view>";
      this.setData({ html: this.parse(html) });
    },

    /**
     * 页面的初始数据
     */
    data: {
      //输入的数据
      experimentData: ""
      //

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function onLoad(options) {
      var _this = this;

      options = this.options;this.data.dark = wx.getSystemInfoSync().theme;wx.onThemeChange(function (e) {
        console.log(e.theme);_this.setdata({ dark: e.theme });
      });this.setdata();
    },
    //输入

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function onReady() {},
    Check: function Check() {
      wx.navigateTo({
        url: '/pages/test1/test1'
      });
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function onPullDownRefresh() {},

    onReachBottom: function onReachBottom() {},

    onShareAppMessage: function onShareAppMessage() {}
  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map`
      }
      if (args) {
        try {
          var onload1 = app.jsRun(args, args.code)
          const onloadDict = onload1()
          for(let i in onloadDict){
            this[i] = onloadDict[i]
          }
          this.onLoad(this.options)
        } catch (e) {
          console.log(e)
        }
      }
  
    },
  
  })
