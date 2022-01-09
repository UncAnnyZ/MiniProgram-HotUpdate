'use strict';

// import parseTag from '../ast.js'


function runCode(that, e) {

  wx.setNavigationBarTitle({ title: 'We校园-倒数日' });

  wx.setNavigationBarColor({
    backgroundColor: '#eeeeee',
    frontColor: '#000000'
  });

  that.data = {
    index: 0,
    gapDays: e.gapDays,
    Name: e.Name,
    Date: e.Date
    //每一次刷新建议重新调用
  };that.reSetPage = function () {
    that.data.html = '        <view style="    background-color: #eeeeee;    font-size: 16px;    font-family: unset;    height: 100vh;     ">        <view style="    display: flex;    flex-direction: column;    align-items: center;  ">        <view style="    width:85%;    height:480rpx;    background-color:rgba(255, 255, 255, 0.644);    border-radius: 13rpx;    box-shadow: 7rpx 7rpx 7rpx #969696b4;    margin-top: 230rpx;    overflow: hidden;  "  data-index="' + that.data.index + '">              <view style="    background-color:rgba(76, 126, 202, 0.842)!important;    height:105rpx;    display: flex;    justify-content:center ;    align-items: center;    font-size: 38rpx;    font-weight: 550;    color:rgb(255, 255, 255);  ">            ' + (that.data.gapDays > 0 ? ' <text >' + that.data.Name + ' \u8FD8\u6709</text>' : '    <text>' + that.data.Name + ' \u5DF2\u7ECF</text>') + '                    </view>            <view style="    height:270rpx;    padding-top: 8rpx;        display: flex;    justify-content:center ;    align-items: center;    font-size: 140rpx;  ">            ' + (that.data.gapDays > 0 ? ' <text >' + that.data.gapDays + '</text>' : '  <text >' + (0 - that.data.gapDays) + '</text>') + '            </view>            <view style="    height:90rpx;    font-size: 33rpx;    border-top: 1px dashed #00000031;    display: flex;    justify-content:center ;    align-items: center;    color:rgba(0, 0, 0, 0.61);  ">            <text>\u76EE\u6807\u65E5\uFF1A' + that.data.Date + '</text>            </view>        </view>        </view>        </view>      ';
    that.setData({
      html: that.parse(that.data.html)
    });
  };

  that.reSetPage();

  // that.onload()
}

module.exports = runCode;
