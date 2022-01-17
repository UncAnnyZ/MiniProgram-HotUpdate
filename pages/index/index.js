
  const app = getApp()

  var onload = app.jsRun('', `/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\\
  !*** ./dist/index.js ***!
  \\***********************/


function runCode() {
  //index.js
  //获取应用实例


  var Page = function Page(page) {
    return page;
  };
  return Page({

    onReady: function onReady(options) {
      this.setdata({});
    },

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
      var _this = this;

      this.setData(dictData);
      var html = "<view style='  border-top: 1rpx solid rgb(200, 200, 200);'><view style='  display: flex;  flex-direction: row;  justify-content: space-between;  align-items: center;  padding: 35rpx 30rpx;'>  <view style='  font-size: 50rpx;  /* color: rgb(200, 40, 40);   */  /* 0-50 */  /* color: rgb(250, 246, 40);  */  /* 50-60*/  /* color: rgb(40, 250, 40);   */'>    <label>\\u603B\\u5206\\uFF1A</label>    <text      style='color:rgb(" + (this.data.total < 50 ? 200 + this.data.total : 250 - 21 * (this.data.total - 50)) + "," + (this.data.total < 50 ? this.data.total * 4 + 40 : 240 + this.data.total) + ",40)'>" + this.data.total + "</text>  </view>  <view style='  display: flex;  flex-direction: row;  justify-content: center;  align-items: center;'>    <label>\\u5973</label>    <switch type='switch' bindchange='Setsex' checked='true'></switch>    <label>\\u7537</label>   </view></view><view style='  display: flex;  justify-content: space-evenly;  padding: 20rpx;  background-color: whitesmoke;  border-top: 1rpx solid rgb(200, 200, 200);'>  <button id='1' style='"+(this.data.grade==1?"  background-color: rgb(60, 200, 60);  color: white;":"  background-color: white;")+"' bindtap='gradeClick'>\\u5927\\u4E00</button>  <button id='2' style='"+(this.data.grade==2?"  background-color: rgb(60, 200, 60);  color: white;":"  background-color: white;")+"' bindtap='gradeClick'>\\u5927\\u4E8C</button>  <button id='3' style='"+(this.data.grade==3?"  background-color: rgb(60, 200, 60);  color: white;":"  background-color: white;")+"' bindtap='gradeClick'>\\u5927\\u4E09</button>  <button id='4' style='"+(this.data.grade==4?"  background-color: rgb(60, 200, 60);  color: white;":"  background-color: white;")+"' bindtap='gradeClick'>\\u5927\\u56DB</button></view>" + this.data.block.map(function (item, index) {
        return " <view wx:for='" + _this.data.block + "' wx:key='index'>  <view style='  display: flex;  flex-direction: row;  justify-content: space-between;  align-items: center;  padding: 35rpx 30rpx;  border-top: 1rpx solid rgb(200, 200, 200);'>    <label style='    width: 30%;' bindtap='tips' id='" + item.score + "' data-power='" + item.power + "'      data-label='" + item.label + "'>" + item.label + "\\uFF1A</label>    <view style='  display: flex;  flex-direction: row;  justify-content: center;  align-items: center;  width: 45%;'>      <input value='" + _this.data[item.input] + "' style='  color: rgb(100, 100, 100);  height: 50rpx;  width: 35%;  border-bottom: 1rpx solid rgb(200, 200, 200);  text-align: center;' bindinput='" + item.input + "' type='digit'></input>      <text style='  color: gray;  font-size: 14px;  padding-left: 10rpx;  width: 15%;  text-align: center;'>" + item.unit + "</text>    </view>    <view style='  width: 25%;  height: 100%;  font-size: 15px;  text-align: end;  color: rgb(0, 200, 0);'>      <text hidden='" + !(_this.data.score[item.score] != "" && _this.data.score[item.score] != 0) + "'>" + (_this.data.score[item.score] + " 分") + "</text>    </view>  </view></view>";
      }) + "<view style='  display: flex;  flex-direction: row;  justify-content: space-between;  align-items: center;  padding: 35rpx 30rpx;  border-top: 1rpx solid rgb(200, 200, 200);' id='longrun'>  <label style='    width: 30%;' bindtap='tips' id='longrun' data-power='0.2'    data-label='" + (this.data.sex ? "1000m" : "800m") + "'>" + (this.data.sex ? "1000m" : "800m") + "\\uFF1A</label>  <view style='  display: flex;  flex-direction: row;  justify-content: center;  align-items: center;  width: 45%;'>    <input style='  color: rgb(100, 100, 100);  height: 50rpx;  width: 35%;  border-bottom: 1rpx solid rgb(200, 200, 200);  text-align: center;' style='width:25%;' placeholder='\\u5206' bindinput='min' type='number'></input>    <text  style='  color: gray;  font-size: 14px;  padding-left: 10rpx;  width: 15%;  text-align: center;' style='width:10%;'>'</text>    <input style='width:25%;' placeholder=' \\u79D2' bindinput='second' type='number'></input>    <text style='  color: gray;  font-size: 14px;  padding-left: 10rpx;  width: 15%;  text-align: center;' style='width:10%;'>'</text>  </view>  <view style='  width: 25%;  height: 100%;  font-size: 15px;  text-align: end;  color: rgb(0, 200, 0);'>    <text hidden='" + !(this.data.score.longrun != "" && this.data.score.longrun != 0) + "'>" + (this.data.score.longrun + " 分") + "</text>  </view></view><view style='  display: flex;  flex-direction: row;  justify-content: center;  align-items: flex-end;      border-top: 1rpx solid rgb(200, 200, 200);  height: 100rpx;'>  <navigator style='  font-size: 300;  border: rgb(216, 216, 216) 1rpx solid;  border-radius: 50rpx;  padding: 10rpx 50rpx;' url='./tcdetail?sex=" + this.data.sex + "'>\\u56FD\\u5BB6\\u5B66\\u751F\\u4F53\\u8D28\\u5065\\u5EB7\\u6807\\u51C6</navigator></view></view>";
      this.setData({ html: this.parse(html) });
    },

    data: {
      grade: '', //年级
      sex: true, //性别    男:true  女:false
      tall: 0, //身高
      weight: 0, //体重
      volume: 0, //肺活量
      jump: 0, //跳远
      handlong: 0, //坐位体前屈
      ishandlong: false, //是否已填写
      shortrun: 0, //50m
      longrun: 0, //800、1000m
      min: 0,
      second: 0,
      sit_up: 0, //仰卧起坐
      pull_up: 0, //引体向上
      score: {
        fat: 0, //体脂
        tall: 0, //身高
        weight: 0, //体重
        volume: 0, //肺活量
        jump: 0, //跳远
        handlong: 0, //坐位体前屈
        shortrun: 0, //50m
        longrun: 0, //800、1000m
        sit_up: 0, //仰卧起坐
        pull_up: 0 //引体向上
      },
      total: 0,
      block: [{
        label: "身高",
        input: "tall",
        unit: "cm",
        score: "tall",
        sex: 2,
        power: 0.15
      }, {
        label: "体重",
        input: "weight",
        unit: "kg",
        score: "fat",
        sex: 2,
        power: 0.15
      }, {
        label: "肺活量",
        input: "volume",
        unit: "ml",
        score: "volume",
        sex: 2,
        power: 0.15
      }, {
        label: "立定跳远",
        input: "jump",
        unit: "cm",
        score: "jump",
        sex: 2,
        power: 0.1
      }, {
        label: "坐位体前屈",
        input: "handlong",
        unit: "cm",
        score: "handlong",
        sex: 2,
        power: 0.1
      }, {
        label: "引体向上",
        input: "pull_up",
        unit: "个",
        score: "pull_up",
        sex: true,
        power: 0.1
      }, {
        label: "仰卧起坐",
        input: "sit_up",
        unit: "个",
        score: "sit_up",
        sex: false,
        power: 0.1
      }, {
        label: "50m",
        input: "shortrun",
        unit: '"',
        score: "shortrun",
        sex: 2,
        power: 0.2
      }]
    },

    onLoad: function onLoad(e) {
      var that = this;
      wx.getSystemInfo({
        success: function success(res) {
          that.setdata({
            elementStyle: 'width:' + res.windowWidth + 'px;' + 'min-height:' + res.windowHeight + 'px;'
          });
        }
      });
      wx.setStorageSync('state', "onload");
      this.gradeClick({
        target: { id: 1 }
      });
      wx.removeStorageSync('state');
    },

    tips: function tips(e) {
      var id = e.target.id;
      var text;
      if (id == "tall" || id == "fat") text = "体脂权重为：" + e.target.dataset.power;else text = e.target.dataset.label + "" + "权重为：" + e.target.dataset.power;

      wx.showToast({
        title: text,
        icon: "none",
        duration: 2000
      });
    },


    /* 性别 */
    Setsex: function Setsex(e) {
      if (e.detail.value) {
        this.setdata({
          sex: e.detail.value, //男：true 女：false
          min: 0,
          second: 0,
          longrun: 0,
          "score.longrun": 0,
          sit_up: 0

        });
      }
      if (!e.detail.value) {
        this.setdata({
          sex: e.detail.value, //男：true 女：false
          min: 0,
          second: 0,
          longrun: 0,
          "score.longrun": 0,
          pull_up: 0
        });
      }
      this.update();
    },

    /* 年级 */
    gradeClick: function gradeClick(e) {
      this.setdata({
        grade: e.target.id
      });
      this.update();
    },

    /* 体脂 */
    tall: function tall(e) {
      if (e != undefined) this.setdata({
        tall: Number(e.detail.value)
      });
      var fat;
      if (this.data.tall != 0 && this.data.tall != "" && this.data.weight != 0 && this.data.weight != "") {
        fat = this.data.weight / (this.data.tall * this.data.tall / 10000);
        if (this.data.sex == true) //男生
          {
            if (fat >= 27.95) this.setdata({
              'score.fat': 60
            });
            if (23.95 <= fat < 27.95) this.setdata({
              'score.fat': 80
            });
            if (17.75 <= fat < 23.95) this.setdata({
              'score.fat': 100
            });
            if (fat < 17.75) this.setdata({
              'score.fat': 80
            });
          }
        if (this.data.sex == false) //女生
          {
            if (fat >= 27.95) this.setdata({
              'score.fat': 60
            });
            if (23.95 <= fat < 27.95) this.setdata({
              'score.fat': 80
            });
            if (17.15 <= fat < 23.95) this.setdata({
              'score.fat': 100
            });
            if (fat < 17.15) this.setdata({
              'score.fat': 80
            });
          }
        this.calculate();
      } else {
        this.setdata({
          'score.fat': 0
        });
        this.calculate();
      }
    },
    weight: function weight(e) {
      if (e != undefined) this.setdata({
        weight: Number(e.detail.value)
      });
      var fat;
      if (this.data.tall != 0 && this.data.tall != "" && this.data.weight != 0 && this.data.weight != "") {
        fat = this.data.weight / (this.data.tall * this.data.tall / 10000);
        if (this.data.sex == true) //男生
          {
            if (fat >= 27.95) this.setdata({
              'score.fat': 60
            });else if (fat >= 23.95) this.setdata({
              'score.fat': 80
            });else if (fat >= 17.75) this.setdata({
              'score.fat': 100
            });else if (fat < 17.75) this.setdata({
              'score.fat': 80
            });
          }
        if (this.data.sex == false) //女生
          {
            if (fat >= 27.95) this.setdata({
              'score.fat': 60
            });else if (fat >= 23.95) this.setdata({
              'score.fat': 80
            });else if (fat >= 17.15) this.setdata({
              'score.fat': 100
            });else if (fat < 17.15) this.setdata({
              'score.fat': 80
            });
          }
        this.calculate();
      } else {
        this.setdata({
          'score.fat': 0
        });
        this.calculate();
      }
    },

    /* 肺活量 */
    volume: function volume(e) {
      if (e != undefined) this.setdata({
        volume: Number(e.detail.value)
      });
      var volume;

      if (this.data.sex == true) {
        //男生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.volume >= 4300) {
            if (this.data.volume >= 5040) volume = 100;else if (this.data.volume >= 4800) volume = Math.floor((this.data.volume - 4800) / 120) * 5 + 90;else {
              volume = Math.floor((this.data.volume - 4300) / 250) * 5 + 80;
            }
          } else if (this.data.volume >= 3100) {
            volume = Math.floor((this.data.volume - 3100) / 120) * 2 + 60;
          } else if (this.data.volume >= 2300) {
            volume = Math.floor((this.data.volume - 2300) / 160) * 10 + 10;
          } else volume = 0;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.volume >= 4400) {
            if (this.data.volume >= 5140) volume = 100;else if (this.data.volume >= 4900) volume = Math.floor((this.data.volume - 4900) / 120) * 5 + 90;else {
              volume = Math.floor((this.data.volume - 4400) / 250) * 5 + 80;
            }
          } else if (this.data.volume >= 3200) {
            volume = Math.floor((this.data.volume - 3200) / 120) * 2 + 60;
          } else if (this.data.volume >= 2350) {
            volume = Math.floor((this.data.volume - 2350) / 170) * 10 + 10;
          } else volume = 0;
        }
      }
      if (this.data.sex == false) {
        //女生
        if (this.data.grade == 1 || this.data.grade == 2) {
          if (this.data.volume >= 3000) {
            if (this.data.volume >= 3400) volume = 100;else if (this.data.volume >= 3300) volume = Math.floor((this.data.volume - 3300) / 50) * 5 + 90;else {
              volume = Math.floor((this.data.volume - 3000) / 150) * 5 + 80;
            }
          } else if (this.data.volume >= 2000) {
            volume = Math.floor((this.data.volume - 2000) / 100) * 2 + 60;
          } else if (this.data.volume >= 1800) {
            volume = Math.floor((this.data.volume - 1800) / 40) * 10 + 10;
          } else volume = 0;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          if (this.data.volume >= 3050) {
            if (this.data.volume >= 3450) volume = 100;else if (this.data.volume >= 3350) volume = Math.floor((this.data.volume - 3350) / 50) * 5 + 90;else {
              volume = Math.floor((this.data.volume - 3050) / 150) * 5 + 80;
            }
          } else if (this.data.volume >= 2050) {
            volume = Math.floor((this.data.volume - 2050) / 100) * 2 + 60;
          } else if (this.data.volume >= 1800) {
            volume = Math.floor((this.data.volume - 1850) / 40) * 10 + 10;
          } else volume = 0;
        }
      }
      this.setdata({
        'score.volume': volume
      });
      this.calculate();
    },
    /* 跳远 */
    jump: function jump(e) {
      if (e != undefined) this.setdata({
        jump: Number(e.detail.value)
      });
      var jump;

      if (this.data.sex == true) {
        //男生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.jump >= 248) {
            if (this.data.jump >= 273) jump = 100;else if (this.data.jump >= 268) jump = 95;else if (this.data.jump >= 263) jump = 90;else if (this.data.jump >= 256) jump = 85;else if (this.data.jump >= 248) jump = 80;
          } else if (this.data.jump >= 208) {
            jump = Math.floor((this.data.jump - 208) / 4) * 2 + 60;
          } else if (this.data.jump >= 183) {
            jump = Math.floor((this.data.jump - 183) / 5) * 10 + 10;
          } else jump = 0;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.jump >= 250) {
            if (this.data.jump >= 275) jump = 100;else if (this.data.jump >= 270) jump = 95;else if (this.data.jump >= 265) jump = 90;else if (this.data.jump >= 258) jump = 85;else if (this.data.jump >= 250) jump = 80;
          } else if (this.data.jump >= 210) {
            jump = Math.floor((this.data.jump - 210) / 4) * 2 + 60;
          } else if (this.data.jump >= 185) {
            jump = Math.floor((this.data.jump - 185) / 5) * 10 + 10;
          } else jump = 0;
        }
      }
      if (this.data.sex == false) {
        //女生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.jump >= 181) {
            if (this.data.jump >= 207) jump = 100;else if (this.data.jump >= 201) jump = 95;else if (this.data.jump >= 195) jump = 90;else if (this.data.jump >= 188) jump = 85;else if (this.data.jump >= 181) jump = 80;
          } else if (this.data.jump >= 151) {
            jump = Math.floor((this.data.jump - 151) / 3) * 2 + 60;
          } else if (this.data.jump >= 126) {
            jump = Math.floor((this.data.jump - 126) / 5) * 10 + 10;
          } else jump = 0;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.jump >= 182) {
            if (this.data.jump >= 208) jump = 100;else if (this.data.jump >= 202) jump = 95;else if (this.data.jump >= 196) jump = 90;else if (this.data.jump >= 189) jump = 85;else if (this.data.jump >= 182) jump = 80;
          } else if (this.data.jump >= 152) {
            jump = Math.floor((this.data.jump - 152) / 3) * 2 + 60;
          } else if (this.data.jump >= 127) {
            jump = Math.floor((this.data.jump - 127) / 5) * 10 + 10;
          } else jump = 0;
        }
      }
      this.setdata({
        'score.jump': jump
      });
      this.calculate();
    },
    /* 体前屈 */
    handlong: function handlong(e) {
      if (e != "update") {
        this.setdata({
          ishandlong: true,
          handlong: Number(e.detail.value)
        });
        if (e.detail.value == "") {
          this.setdata({
            ishandlong: false
          });
        }
      }

      var handlong;

      if (this.data.sex == true) {
        //男生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.handlong >= 17.7) {
            if (this.data.handlong >= 24.9) handlong = 100;else if (this.data.handlong >= 17.7) handlong = Math.floor((this.data.handlong - 17.7) / 1.8) * 5 + 80;
          } else if (this.data.handlong >= 3.7) {
            handlong = Math.floor((this.data.handlong - 3.7) / 1.4) * 2 + 60;
          } else if (this.data.handlong >= -1.3) {
            handlong = Math.floor((this.data.handlong + 1.3) / 1) * 10 + 10;
          } else handlong = 0;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.handlong >= 18.2) {
            if (this.data.handlong >= 25.1) handlong = 100;else if (this.data.handlong >= 21.5) handlong = Math.floor((this.data.handlong - 21.5) / 1.8) * 5 + 90;else if (this.data.handlong >= 18.2) handlong = Math.floor((this.data.handlong - 18.2) / 1.7) * 5 + 80;
          } else if (this.data.handlong >= 4.2) {
            handlong = Math.floor((this.data.handlong - 4.2) / 1.4) * 2 + 60;
          } else if (this.data.handlong >= -0.8) {
            handlong = Math.floor((this.data.handlong + 0.8) / 1) * 10 + 10;
          } else handlong = 0;
        }
      }
      if (this.data.sex == false) {
        //女生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.handlong >= 19) {
            if (this.data.handlong >= 25.8) handlong = 100;else if (this.data.handlong >= 22.2) handlong = Math.floor((this.data.handlong - 22.2) / 1.8) * 5 + 90;else if (this.data.handlong >= 19) handlong = Math.floor((this.data.handlong - 19) / 1.6) * 5 + 80;
          } else if (this.data.handlong >= 6) {
            handlong = Math.floor((this.data.handlong - 6) / 1.3) * 2 + 60;
          } else if (this.data.handlong >= 2) {
            handlong = Math.floor((this.data.handlong - 2) / 0.8) * 10 + 10;
          } else handlong = 0;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.handlong >= 19.5) {
            if (this.data.handlong >= 26.3) handlong = 100;else if (this.data.handlong >= 24.4) handlong = 95;else if (this.data.handlong >= 22.4) handlong = 90;else if (this.data.handlong >= 21.0) handlong = 85;else if (this.data.handlong >= 19.5) handlong = 80;
          } else if (this.data.handlong >= 6.5) {
            handlong = Math.floor((this.data.handlong - 6.5) / 1.3) * 2 + 60;
          } else if (this.data.handlong >= 2.5) {
            handlong = Math.floor((this.data.handlong - 2.5) / 0.8) * 10 + 10;
          } else handlong = 0;
        }
      }

      if (!this.data.ishandlong) handlong = 0;

      this.setdata({
        'score.handlong': handlong
      });
      this.calculate();
    },
    /* 仰卧起坐 */
    sit_up: function sit_up(e) {
      if (e != undefined) this.setdata({
        sit_up: Number(e.detail.value)
      });
      var sit_up;

      if (this.data.grade == 1 || this.data.grade == 2) {
        //大一、大二
        if (this.data.sit_up >= 46) {
          if (this.data.sit_up >= 56) sit_up = 100;else if (this.data.sit_up >= 52) sit_up = Math.floor((this.data.sit_up - 52) / 2) * 5 + 90;else if (this.data.sit_up >= 46) sit_up = Math.floor((this.data.sit_up - 46) / 3) * 5 + 80;
        } else if (this.data.sit_up >= 26) {
          sit_up = Math.floor((this.data.sit_up - 26) / 2) * 2 + 60;
        } else if (this.data.sit_up >= 16) {
          sit_up = Math.floor((this.data.sit_up - 16) / 2) * 10 + 10;
        } else sit_up = 0;
      }
      if (this.data.grade == 3 || this.data.grade == 4) {
        //大三、大四
        if (this.data.sit_up >= 47) {
          if (this.data.sit_up >= 57) sit_up = 100;else if (this.data.sit_up >= 53) sit_up = Math.floor((this.data.sit_up - 53) / 2) * 5 + 90;else if (this.data.sit_up >= 47) sit_up = Math.floor((this.data.sit_up - 47) / 3) * 5 + 80;
        } else if (this.data.sit_up >= 27) {
          sit_up = Math.floor((this.data.sit_up - 27) / 2) * 2 + 60;
        } else if (this.data.sit_up >= 17) {
          sit_up = Math.floor((this.data.sit_up - 17) / 2) * 10 + 10;
        } else sit_up = 0;
      }
      this.setdata({
        'score.sit_up': sit_up
      });
      this.setdata({
        total: (this.data.score.fat * 0.15 + this.data.score.volume * 0.15 + this.data.score.jump * 0.1 + this.data.score.handlong * 0.1 + sit_up * 0.1 + this.data.score.shortrun * 0.2 + this.data.score.longrun * 0.2).toFixed(2)
      });
    },
    /* 引体向上 */
    pull_up: function pull_up(e) {
      if (e != undefined) this.setdata({
        pull_up: Number(e.detail.value)
      });
      var pull_up;

      if (this.data.grade == 1 || this.data.grade == 2) {
        //大一、大二
        if (this.data.pull_up >= 19) pull_up = 100;else if (this.data.pull_up >= 15) {
          pull_up = (this.data.pull_up - 15) * 5 + 80;
        } else if (this.data.pull_up >= 10) {
          pull_up = (this.data.pull_up - 10) * 4 + 60;
        } else if (this.data.pull_up >= 5) {
          pull_up = (this.data.pull_up - 5) * 10 + 10;
        } else pull_up = 0;
      }
      if (this.data.grade == 3 || this.data.grade == 4) {
        //大三、大四
        if (this.data.pull_up >= 20) pull_up = 100;else if (this.data.pull_up >= 16) {
          pull_up = (this.data.pull_up - 16) * 5 + 80;
        } else if (this.data.pull_up >= 11) {
          pull_up = (this.data.pull_up - 11) * 4 + 60;
        } else if (this.data.pull_up >= 6) {
          pull_up = (this.data.pull_up - 6) * 10 + 10;
        } else pull_up = 0;
      }
      this.setdata({
        'score.pull_up': pull_up
      });
      this.setdata({
        total: (this.data.score.fat * 0.15 + this.data.score.volume * 0.15 + this.data.score.jump * 0.1 + this.data.score.handlong * 0.1 + pull_up * 0.1 + this.data.score.shortrun * 0.2 + this.data.score.longrun * 0.2).toFixed(2)
      });
    },
    /* 短跑50m */
    shortrun: function shortrun(e) {
      if (e != undefined) this.setdata({
        shortrun: Number(e.detail.value)
      });

      var shortrun;

      if (this.data.sex == true) {
        //男生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.shortrun > 10.1 || this.data.shortrun == 0) shortrun = 0;else if (this.data.shortrun >= 9.1) {
            shortrun = 60 - Math.ceil((this.data.shortrun - 9.1) / 0.2) * 10;
          } else if (this.data.shortrun >= 7.1) {
            shortrun = 80 - Math.ceil((this.data.shortrun - 7.1) / 0.2) * 2;
          } else if (this.data.shortrun >= 6.7) {
            shortrun = 100 - Math.ceil((this.data.shortrun - 6.7) / 0.1) * 5;
          } else shortrun = 100;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.shortrun > 10) shortrun = 0;else if (this.data.shortrun >= 9) {
            shortrun = 60 - Math.ceil((this.data.shortrun - 9) / 0.2) * 10;
          } else if (this.data.shortrun >= 7.0) {
            shortrun = 80 - Math.ceil((this.data.shortrun - 7) / 0.2) * 2;
          } else if (this.data.shortrun >= 6.6) {
            shortrun = 100 - Math.ceil((this.data.shortrun - 6.6) / 0.1) * 5;
          } else shortrun = 100;
        }
      }
      if (this.data.sex == false) {
        //女生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.shortrun > 11.3) shortrun = 0;else if (this.data.shortrun >= 10.3) {
            shortrun = 60 - Math.ceil((this.data.shortrun - 10.3) / 0.2) * 10;
          } else if (this.data.shortrun >= 8.3) {
            shortrun = 80 - Math.ceil((this.data.shortrun - 8.3) / 0.2) * 2;
          } else if (this.data.shortrun >= 7.7) {
            shortrun = 100 - Math.ceil((this.data.shortrun - 7.7) / 0.3) * 5;
          } else if (this.data.shortrun >= 7.5) {
            shortrun = 100 - Math.ceil((this.data.shortrun - 7.5) / 0.1) * 5;
          } else shortrun = 100;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.shortrun > 11.2) shortrun = 0;else if (this.data.shortrun >= 10.2) {
            shortrun = 60 - Math.ceil((this.data.shortrun - 10.2) / 0.2) * 10;
          } else if (this.data.shortrun >= 8.2) {
            shortrun = 80 - Math.ceil((this.data.shortrun - 8.2) / 0.2) * 2;
          } else if (this.data.shortrun >= 7.6) {
            shortrun = 100 - Math.ceil((this.data.shortrun - 7.6) / 0.3) * 5;
          } else if (this.data.shortrun >= 7.4) {
            shortrun = 100 - Math.ceil((this.data.shortrun - 7.4) / 0.1) * 5;
          } else shortrun = 100;
        }
      }

      if (e != undefined && e.detail.value == 0) shortrun = 0;

      this.setdata({
        'score.shortrun': shortrun
      });
      // if (this.data.shortrun != 0)
      this.calculate();
    },
    /* 长跑800、1000 */
    min: function min(e) {
      if (e != undefined) this.setdata({
        min: e.detail.value,
        longrun: Number(e.detail.value) * 60 + Number(this.data.second)
      });
      this.longrun();
    },
    second: function second(e) {
      if (e != undefined) this.setdata({
        second: e.detail.value,
        longrun: Number(this.data.min) * 60 + Number(e.detail.value)
      });
      this.longrun();
    },
    longrun: function longrun(e) {
      var longrun;
      if (this.data.sex == true) {
        //男生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.longrun > 372) longrun = 0;else if (this.data.longrun >= 272) {
            longrun = 60 - Math.ceil((this.data.longrun - 272) / 20) * 10;
          } else if (this.data.longrun >= 222) {
            longrun = 80 - Math.ceil((this.data.longrun - 222) / 5) * 2;
          } else if (this.data.longrun >= 207) {
            longrun = 90 - Math.ceil((this.data.longrun - 207) / 7) * 5;
          } else if (this.data.longrun >= 197) {
            longrun = 100 - Math.ceil((this.data.longrun - 197) / 5) * 5;
          } else longrun = 100;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.longrun > 370) longrun = 0;else if (this.data.longrun >= 270) {
            longrun = 60 - Math.ceil((this.data.longrun - 270) / 20) * 10;
          } else if (this.data.longrun >= 220) {
            longrun = 80 - Math.ceil((this.data.longrun - 220) / 5) * 2;
          } else if (this.data.longrun >= 205) {
            longrun = 90 - Math.ceil((this.data.longrun - 205) / 7) * 5;
          } else if (this.data.longrun >= 195) {
            longrun = 100 - Math.ceil((this.data.longrun - 195) / 5) * 5;
          } else longrun = 100;
        }
      }
      if (this.data.sex == false) {
        //女生
        if (this.data.grade == 1 || this.data.grade == 2) {
          //大一、大二
          if (this.data.longrun > 324) longrun = 0;else if (this.data.longrun >= 274) {
            longrun = 60 - Math.ceil((this.data.longrun - 274) / 10) * 10;
          } else if (this.data.longrun >= 224) {
            longrun = 80 - Math.ceil((this.data.longrun - 224) / 5) * 2;
          } else if (this.data.longrun >= 210) {
            longrun = 90 - Math.ceil((this.data.longrun - 210) / 7) * 5;
          } else if (this.data.longrun >= 198) {
            longrun = 100 - Math.ceil((this.data.longrun - 198) / 6) * 5;
          } else longrun = 100;
        }
        if (this.data.grade == 3 || this.data.grade == 4) {
          //大三、大四
          if (this.data.longrun > 322) longrun = 0;else if (this.data.longrun >= 272) {
            longrun = 60 - Math.ceil((this.data.longrun - 272) / 10) * 10;
          } else if (this.data.longrun >= 222) {
            longrun = 80 - Math.ceil((this.data.longrun - 222) / 5) * 2;
          } else if (this.data.longrun >= 208) {
            longrun = 90 - Math.ceil((this.data.longrun - 208) / 7) * 5;
          } else if (this.data.longrun >= 196) {
            longrun = 100 - Math.ceil((this.data.longrun - 196) / 6) * 5;
          } else longrun = 100;
        }
      }
      if (this.data.longrun == 0) longrun = 0;

      this.setdata({
        'score.longrun': longrun
      });
      // if (this.data.longrun != 0)
      this.calculate();
    },

    /* 计算统计 */
    calculate: function calculate(e) {
      if (this.data.sex == true) this.setdata({
        total: (this.data.score.fat * 0.15 + this.data.score.volume * 0.15 + this.data.score.jump * 0.1 + this.data.score.handlong * 0.1 + this.data.score.pull_up * 0.1 + this.data.score.shortrun * 0.2 + this.data.score.longrun * 0.2).toFixed(2)
      });
      if (this.data.sex == false) this.setdata({
        total: (this.data.score.fat * 0.15 + this.data.score.volume * 0.15 + this.data.score.jump * 0.1 + this.data.score.handlong * 0.1 + this.data.score.sit_up * 0.1 + this.data.score.shortrun * 0.2 + this.data.score.longrun * 0.2).toFixed(2)
      });
    },

    /* 更新数据 */
    update: function update(e) {
      this.tall();
      this.weight();
      this.volume();
      this.jump();
      if (wx.getStorageSync("state") == "") this.handlong("update");
      this.sit_up();
      this.pull_up();
      if (this.data.shortrun != 0) this.shortrun();
      if (this.data.longrun != 0) this.longrun();

      this.calculate();
    }

  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map`)
  console.log(onload())
  Page(onload())
