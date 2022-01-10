var chart = require("./utils/chart");

console.log(chart)

function runCode(that, e) {

    wx.setNavigationBarTitle({ title: '热更新' });


    that.data = {
        index: 0,
        chartWidth: 0,
        chartHeight: 0
    }
    
    that.onload = function() {
        chart.draw(that, 'canvas1', {
            title: {
              text: "2017城市人均收入(万)",
              color: "#333333"
            },
            xAxis: {
              data: ['北京', '上海', '杭州', '深圳', '广州', '成都', '南京', '西安']
            },
            series: [
              // {
              //   name: "第一季度",
              //   category: "bar",
              //   data: [37, 63, 60, 78, 92, 63, 57, 48]
              // },
              // {
              //   name: "第二季度",
              //   category: "line",
              //   data: [20, 35, 38, 59, 48, 27, 43, 35]
              // },
              {
                name: ['北京', '上海', '杭州', '深圳', '广州', '成都'],
                category: "pie",
                data: [40, 38, 39, 28, 27, 33]
              }
            ]
          });
          that.reSetPage()
    }

    that.onSaveClick = function () {
        chart.saveCanvans(function () {
    
        });
    }
    //每一次刷新建议重新调用
    that.reSetPage = function () {
        that.data.html =
            `
      
        
        <canvas canvas_id="canvas1"  style="background-color: #f4f4f4;width:${that.data.chartWidth}px;height:${that.data.chartHeight}px;"/>
        <button class="downloadChart" bindtap="onSaveClick">保存图片</button>
      `
        that.setData({
            html: that.parse(that.data.html)
        });
    };

    that.reSetPage()

    that.onload()

}

window.exports = runCode;
