// import parseTag from '../ast.js'



function runCode(that, e) {

  wx.setNavigationBarTitle({ title: 'We校园-倒数日' });

  //that.data
  function formatDay(day) {
    switch (day) {
      case 1: day = "一"; break;
      case 2: day = "二"; break;
      case 3: day = "三"; break;
      case 4: day = "四"; break;
      case 5: day = "五"; break;
      case 6: day = "六"; break;
      case 7: day = "日"; break;
      case 0: day = "日"; break;

      case "一": day = 1; break;
      case "二": day = 2; break;
      case "三": day = 3; break;
      case "四": day = 4; break;
      case "五": day = 5; break;
      case "六": day = 6; break;
      case "七": day = 7; break;
      case "日": day = 7; break;
    }

    return day
  }

  that.touchstart = function (e) { //开始触摸时 重置所有删除
    that.data.list.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    that.data.startX = e.changedTouches[0].clientX
    that.data.startY = e.changedTouches[0].clientY
    that.data.list = that.data.list;
    that.reSetPage();
  }

  that.angle = function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }

  that.touchmove = function (e) {
    index = e.currentTarget.id, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.data.list = that.data.list;
    that.reSetPage();
  }

  that.data = {
    html: "",
    jsonContent: {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      dayOfWeek: "星期" + formatDay(new Date().getDay()),
    },
    startX: 0, //开始坐标
    startY: 0,
    showModel: false,
    dates: "",
    list: [],
    dayName: "",
    changeDay: ""
  }

  that.showdates = function(e) {    //跳转到倒数日的详情页面
    var index1 = e.currentTarget.id
    var dates = that.data.list[index1]
    var holidayName = dates.holidayName
    var gapDays = dates.gapDays
    var holidayDate = dates.holidayDate
    wx.navigateTo({
      url: "../dynamic/dynamic?content=倒数日二跳页&Name=" + holidayName + "&gapDays=" + gapDays + "&Date=" + holidayDate,
    })
  },

  that.num_data = function (start_date1, end_date1) { //计算倒数日
    var start_date = new Date(start_date1.replace(/-/g, "/"));
    var end_date = new Date(end_date1.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day * -1;
  },

  that.terms = function () { //学年显示
    var year = '';
    if (new Date().getMonth() > 4) {
      year = new Date().getFullYear() + '-' + (new Date().getFullYear() + 1) + '学年' + ' ' + '第' + 1 + '学期'
    } else {
      year = new Date().getFullYear() - 1 + '-' + new Date().getFullYear() + '学年' + ' ' + '第' + 2 + '学期'
    }
    that.data.term = year;
    that.reSetPage();
  },
    /**
     * 生命周期函数--监听页面加载
     */
    that.onShow = function () {
      // that.setDataCalendar();
    };

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  that.onReady = function () {

  };

  that.compare = function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },

  that.del =  function (e) { //删除倒数日  
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    that.data.list.splice(e.currentTarget.id, 1)
    app.globalData._adday = that.data.list
    wx.cloud.callFunction({
      name: 'readday',
      data: {
        _adday: JSON.stringify(that.data.list),
        username: wx.getStorageSync('args').username,
        type: 'write'
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
        })
        that.setDataCalendar()
      },
      fail: err => {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
        })
      }
    })
  },


  that.addSubmit =  function (e) {
    //判断是否修改状态

    wx.showLoading({
      title: '处理中',
      mask: true
    })

    if (that.data.dayName == null || that.data.dayName == "" || that.data.dayName == undefined) { //判断填写是否为空
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (that.data.dates == null || that.data.dates == "" || that.data.dates == undefined) {
      wx.showToast({
        title: '日期不能为空',
        icon: 'none',
        duration: 1000
      })
    } else {
      var add = {
        'holidayName': that.data.dayName,
        'holidayDate': that.data.dates,
      }
      if (that.data.changeDay !== "") {
        app.globalData._adday[that.data.changeDay].holidayName = that.data.dayName
        app.globalData._adday[that.data.changeDay].holidayDate = that.data.dates
      } else {

        app.globalData._adday.push(add)
      }

      wx.cloud.callFunction({ //访问云函数
        name: 'readday',
        data: {
          _adday: JSON.stringify(app.globalData._adday),
          username: wx.getStorageSync('args').username,
          type: 'write'
        },
        success: res => {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
          })
          that.setDataCalendar()
        },
        fail: err => {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          })
        },
        complete() {
          that.data.changeDay = ""
          that.data.dayName = ""
          that.data.dates = ""
          that.data.showModel = !that.data.showModel
          that.reSetPage()
        }
      })
    }
  }

  that.edit =  function (e) {
    //保存到changeDay来调用状态
    that.data.changeDay = e.currentTarget.id
    that.data.dayName = app.globalData._adday[that.data.changeDay].holidayName
    that.data.dates = app.globalData._adday[that.data.changeDay].holidayDate
    that.reSetPage()
    that.feedbackHandler()
  }



  /**
   * 生命周期函数--监听页面加载
   */
  that.onload = function () {
    app.loginState();
    that.terms();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'readday',
      data: {
        username: wx.getStorageSync('args').username,
        type: 'read'
      },
      success: res => {
        res.result ? res.result : []
        app.globalData._adday = JSON.parse(res.result)
        that.setDataCalendar();
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  };


  that.setDataCalendar = function () { //页面渲染全部倒数日
    var addday = app.globalData._adday;
    var xlist = [];
    var xlist1 = [];
    var nowdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    for (let i = 0; i < addday.length; i++) {
      var gapDays2 = that.num_data(addday[i].holidayDate, nowdate);
      if (gapDays2 > 0) {
        xlist.push({
          holidayName: addday[i].holidayName,
          holidayDate: addday[i].holidayDate,
          gapDays: gapDays2,
          holidayRestInfo: addday[i].holidayDate,
          isTouchMove: false
        })
      } else {
        xlist1.push({
          holidayName: addday[i].holidayName,
          holidayDate: addday[i].holidayDate,
          gapDays: gapDays2,
          holidayRestInfo: addday[i].holidayDate,
          isTouchMove: false
        })
      }
    }

    var list = xlist.sort(that.compare("gapDays")).concat(xlist1.sort(that.compare("gapDays")).reverse())
    app.globalData._adday = list
    that.data.show = ""
    that.data.list = list
    that.reSetPage()
  },

  that.bindDateChange = function (e) { //获取倒数日日期
      that.data.dates = e.detail.value
      that.reSetPage()
  },

  that.bindInputChange = function (e) { //获取倒数日日期
    that.data.dayName = e.detail.value
    that.reSetPage()
},

  // that.data.list = [{
  //   isTouchMove: false,
  //   gapDays: 2,
  //   holidayName: "2323"
  // },
  // {
  //   isTouchMove: false,
  //   gapDays: 2,
  //   holidayName: "ddd"
  // }
  // ]

  that.feedbackHandler =  function () { //跳转到子页
    var showModel = that.data.showModel
    that.data.animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease'
    });
    if (showModel) {
      that.data.changeDay = ""
      that.data.dayName = ""
      that.data.dates = ""
      that.data.add_style = "add_hide"
      that.data.animation.opacity(0).translateY('100%').step();
      that.reSetPage();
      setTimeout(function () {
        that.data.showModel = !showModel;
        that.reSetPage();
      }, 700);
    } else {
      that.data.showModel = !showModel;
      that.data.animation.opacity(0).translateY('100%').step();
      that.reSetPage();
      that.data.animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease'
      });
      that.data.animation.opacity(1).translateY(0).step();
      that.reSetPage()
    }


    /*wx.navigateTo({
      url: 'addition/addition'
    })*/
  }
  that.data.animation = wx.createAnimation({
    duration: 800,
    timingFunction: 'ease'
  });
  that.data.animation.opacity(0).translateY('100%').step();

  //每一次刷新建议重新调用
  that.reSetPage = function () {
    that.data.html =
      `
      <view style="background-color: #eeeeee; height: 100%; width:100%; position: absolute;">
    <view class="page page__hd">
      <view class="page__title">倒数日</view>
      <view class="page__desc">
        <view>${that.data.term}</view>
        <text>${that.data.jsonContent.month + 1} 月${that.data.jsonContent.day} 日 ${that.data.jsonContent.dayOfWeek} （滑动可删除)</text>
      </view>
      

      <view class="touch">
      ${that.data.list.map((item, index) => `      
      <view class="touch-container"  bindtap="showdates"
      bindtouchstart="touchstart" bindtouchmove="touchmove" id="${index}">
      <view class="touch-item  ${item.isTouchMove ? "touch-move-active" : ""}" >
      
        <view class="weui-flex__item" >

          <view class="weui-item__title" >
            ${item.gapDays > 0 ? `  ${item.holidayName} 还有` : `${item.holidayName} 已经`}
      
          </view>
        </view>
          <view class="weui-flex__item">
            <view class="gapDays ${item.gapDays > 0 ? "gapDays_bg1" : "gapDays_bg2"}  ">
            ${item.gapDays > 0 ? ` <text class="gapDays_text" >${item.gapDays}</text>` : `<text class="gapDays_text">${0 - item.gapDays}</text>`}
              <view class="Days ${item.gapDays > 0 ? "background-color_1" : "background-color_3"} ">
                <text class="gapDays_text Days_text">天</text>
              </view>
            </view>
          </view>
      </view>
      
      <view class="edit ${item.isTouchMove ? "touch-move-active" : ""} " bindtap="edit" id="${index}">
        <image  class="edit-image" src="../../images/edit.png"></image>
      </view>

      <view class="del ${item.isTouchMove ? "touch-move-active" : ""} " bindtap="del" id="${index}">
        <image  class="del-image" src="../../images/del.png"></image>
      </view>
    </view>`
      )}

    </view>


    <view class="nav-head">
        <view class="" bindtap="feedbackHandler">
          <image  class="img-button feedback-btn" src="/images/btn_feed@2x.png"></image>
        </view>
      </view>

      <view class="round-click" bindtap='showPic'>
        <text class="round-click-text">查看校历</text>
      </view>
    </view>

  ${that.data.showModel ? `
    <view class="add" >
    <view class="add_background" bindtap="feedbackHandler"></view>
    <view class="add_contain ${that.data.add_style}"  animation="${JSON.stringify(that.data.animation)}">
      <view class="add_title">
        <text>添加倒数日</text>
      </view>
      <view class="course">  
        名称:
        <input value="${that.data.dayName} " style="padding-top:2rpx;padding-left: 10rpx;" placeholder="名称"  bindinput="bindInputChange"></input>
      </view>
      <view class="section" dates='1'>  
        <picker mode="date" start="1978-01-01" end="2050-1-23" bindchange="bindDateChange">  
          <view class="picker">  
            日期:   ${that.data.dates}  
          </view>  
        </picker>  
      </view>
      <view class="add_btn">
        <button class="add_btn-button" bindtap="feedbackHandler">取 消</button>
        <button class="add_btn-button" bindtap="addSubmit" >保 存</button>
      </view>
    </view>
</view>
  ` : null}
    </view>
    `
    that.setData({
      html: that.parse(that.data.html)
    });
  };

  that.reSetPage()

  that.onload()

}

module.exports = runCode;
