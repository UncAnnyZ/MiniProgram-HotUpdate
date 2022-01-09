// import parseTag from '../ast.js'



function runCode(that, e) {

    wx.setNavigationBarTitle({ title: 'We校园-倒数日' });
  
    wx.setNavigationBarColor({
      backgroundColor: '#eeeeee',
      frontColor: '#000000',
    })

    that.data = {
      index : 0,
      gapDays: e.gapDays,
      Name: e.Name,
      Date: e.Date
    }
    //每一次刷新建议重新调用
    that.reSetPage = function () {
      that.data.html =
        `
        <view class="page">
        <view class="all">
        <view class="flex-item"  data-index="${that.data.index}">  
            <view class="flex-item_title">
            ${that.data.gapDays > 0 ? ` <text >${that.data.Name} 还有</text>` : `    <text>${that.data.Name} 已经</text>`}

        
            </view>
            <view class="flex-item_gapDays">
            ${that.data.gapDays > 0 ? ` <text >${that.data.gapDays}</text>` : `  <text >${0-that.data.gapDays}</text>`}
            </view>
            <view class="flex-item_desc">
            <text>目标日：${that.data.Date}</text>
            </view>
        </view>
        </view>
        </view>
      `
      that.setData({
        html: that.parse(that.data.html)
      });
    };
  
    that.reSetPage()
  
    // that.onload()
  
  }
  
  module.exports = runCode;
  