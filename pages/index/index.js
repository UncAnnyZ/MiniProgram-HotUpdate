// pages/dynamic/dynamic.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    html: [{
      type: 'view',
      text: '模版错误啦'
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var args = wx.getStorageSync('args')

    // mock args，不一定需要这个
    args = {

    }

    if (args) {
      try {
        var onload = app.jsRun(args, `
        /******/ (function() { // webpackBootstrap
          /******/ 	"use strict";
          /******/ 	var __webpack_modules__ = ({
          
          /***/ "./src/utils/chart.js":
          /*!****************************!*\
            !*** ./src/utils/chart.js ***!
            \****************************/
          /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
          
          
          
          module.exports = {
            draw: init,
            saveCanvans: saveCanvans
          };
          
          var util = __webpack_require__(/*! ./chartUtils */ "./src/utils/chartUtils.js");
          var canvasId = '';
          var pageObj = null;
          var chartOpt = {
            chartPieCount: 0,
            hideXYaxis: false,
            axisMark: [],
            barLength: 0,
            barNum: 0,
            // bgColor: "transparent",
            lineColor: "#c2c2c2",
            bgColor: "#ffffff",
            chartWidth: 0,
            chartHeight: 0,
            legendWidth: 0,
            legendHeight: 0,
            chartSpace: 10,
            textSpace: 5,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            axisLeft: 0,
            axisBottom: 0,
            axisTop: 0
          };
          var dataSet = {
            hideYaxis: false,
            title: {
              color: "#394655",
              size: 16,
              text: ""
            },
            legend: {
              color: "",
              size: 12
            },
            color: ['#74DAE5', '#394655', '#FEE746', '#B9A39B', '#C18734', '#9EC3AD', '#6D9BA3', '#7E9C82', '#DAEE59', '#CFDCED'],
            xAxis: {
              color: "#666A73",
              size: 10,
              data: []
            },
            series: [{
              name: "",
              category: "bar",
              data: []
            }, {
              name: "",
              category: "line",
              data: []
            }]
          };
          
          function init(page, canvas, data) {
            canvasId = canvas;
            pageObj = page;
            checkData(data);
          
            var ctx = initCanvas(page, canvasId);
            drawChart(ctx);
          }
          /**
           * 初始化Canvas
           */
          function initCanvas(page, canvasId) {
            var ctx = wx.createCanvasContext(canvasId);
            var Sys = wx.getSystemInfoSync();
          
            chartOpt.chartWidth = Sys.windowWidth;
            chartOpt.chartHeight = Sys.windowWidth * 0.8; //Canvas组件的宽高比
          
            chartOpt.legendWidth = dataSet.legend.size * 1.3;
            chartOpt.legendHeight = dataSet.legend.size * 0.8;
          
            chartOpt.top = chartOpt.left = chartOpt.chartSpace;
            chartOpt.right = chartOpt.chartWidth - chartOpt.chartSpace;
            chartOpt.bottom = chartOpt.chartHeight - chartOpt.chartSpace;
          
            //3个数字的文字长度
            var textWidth = util.mesureText('100', dataSet.xAxis.size);
            var legendHeight = dataSet.series.length > 1 ? chartOpt.legendHeight + chartOpt.chartSpace * 2 : 0;
          
            chartOpt.axisLeft = chartOpt.left + (dataSet.hideYaxis ? 0 : textWidth + chartOpt.textSpace);
            chartOpt.axisBottom = chartOpt.bottom - dataSet.xAxis.size - chartOpt.textSpace - legendHeight;
            chartOpt.axisTop = chartOpt.top + dataSet.title.size + chartOpt.textSpace + dataSet.xAxis.size * 2;
          
            //更新页面Canvas的宽度、高度
          
            page.data.chartWidth = chartOpt.chartWidth;
            page.data.chartHeight = chartOpt.chartHeight;
            page.reSetPage()
            return ctx;
          }
          /**
           * 检查并更新图表数据
           */
          function checkData(data) {
          
            if (data.title != undefined) {
              if (data.title.color != undefined && data.title.color != '') {
                dataSet.title.color = data.title.color;
              }
              dataSet.title.text = data.title.text;
            }
            if (!data.color) {
              data.color = [];
            }
            if (data.color != undefined && data.color != [] && data.color.length > 0) {
              dataSet.color = data.color;
            }
            dataSet.xAxis.data = data.xAxis.data;
          
            dataSet.series = data.series;
          
            var value = new Array();
            for (var i = 0; i < dataSet.series.length; i++) {
              var item = dataSet.series[i];
              var itemLenght = item.data.length;
              if (itemLenght > chartOpt.barLength) {
                chartOpt.barLength = itemLenght;
              }
              for (var k = 0; k < itemLenght; k++) {
                value.push(item.data[k]);
              }
              if (item.category == 'bar') {
                chartOpt.barNum += 1;
              }
              if (item.category == 'pie') {
                chartOpt.hideXYaxis = true;
                for (var k = 0; k < itemLenght; k++) {
                  chartOpt.chartPieCount += item.data[k];
                }
              }
            }
          
            var minNum = Math.min.apply(null, value);
            var maxNum = Math.max.apply(null, value);
            //计算Y轴刻度尺数据
            chartOpt.axisMark = util.calculateY(minNum, maxNum, 5);
          }
          /**
           * 绘制图表
           */
          function drawChart(ctx) {
            drawBackground(ctx);
            drawTitle(ctx);
            drawLegend(ctx);
            if (!chartOpt.hideXYaxis) {
              drawXaxis(ctx);
              drawYaxis(ctx);
            }
          
            // drawBarChart(ctx);
            drawCharts(ctx);
            ctx.draw();
          }
          /**
           * 绘制图表背景
           */
          function drawBackground(ctx) {
            if (chartOpt.bgColor != "" && chartOpt.bgColor != "transparent") {
              ctx.setFillStyle(chartOpt.bgColor);
              ctx.fillRect(0, 0, chartOpt.chartWidth, chartOpt.chartHeight);
            }
          }
          /**
           * 绘制标题
           */
          function drawTitle(ctx) {
            var title = dataSet.title;
            if (title.text != '') {
          
              var textWidth = util.mesureText(title.text, title.size);
              ctx.setFillStyle(title.color);
              ctx.setFontSize(title.size);
              ctx.setTextAlign('left');
              ctx.fillText(title.text, (chartOpt.chartWidth - textWidth) / 2, chartOpt.top + title.size);
            }
          }
          /**
           * 绘制X轴刻度尺
           */
          function drawXaxis(ctx) {
            //绘制X轴横线
            ctx.setLineWidth(0.5);
            ctx.setLineCap('round');
            ctx.moveTo(chartOpt.axisLeft, chartOpt.axisBottom);
            ctx.lineTo(chartOpt.right, chartOpt.axisBottom);
            ctx.stroke();
          
            var width = (chartOpt.right - chartOpt.axisLeft) / chartOpt.barLength;
            var data = dataSet.xAxis.data;
            //绘制X轴显示文字
            for (var i = 0; i < data.length; i++) {
              var textX = width * (i + 1) - width / 2 + chartOpt.axisLeft;
              ctx.setFillStyle(dataSet.xAxis.color);
              ctx.setFontSize(dataSet.xAxis.size);
              ctx.setTextAlign('center');
              ctx.fillText(data[i], textX, chartOpt.axisBottom + dataSet.xAxis.size + chartOpt.textSpace);
            }
          }
          /**
           * 绘制Y轴刻度尺
           */
          function drawYaxis(ctx) {
          
            //绘制Y轴横线
            ctx.setLineWidth(0.5);
            ctx.setLineCap('round');
          
            var height = (chartOpt.axisBottom - chartOpt.axisTop) / (chartOpt.axisMark.length - 1);
            //绘制Y轴显示数字
            for (var i = 0; i < chartOpt.axisMark.length; i++) {
              var y = chartOpt.axisBottom - height * i;
              if (i > 0) {
                ctx.setStrokeStyle(chartOpt.lineColor);
                util.drawDashLine(ctx, chartOpt.axisLeft, y, chartOpt.right, y);
              }
          
              if (!dataSet.hideYaxis) {
                ctx.setFillStyle(dataSet.xAxis.color);
                ctx.setFontSize(dataSet.xAxis.size);
                ctx.setTextAlign('right');
                ctx.fillText(chartOpt.axisMark[i], chartOpt.axisLeft - chartOpt.textSpace, y + chartOpt.textSpace);
              }
            }
          }
          
          /**
           * 绘制图例
           */
          function drawLegend(ctx) {
            var series = dataSet.series;
          
            for (var i = 0; i < series.length; i++) {
              var names = series[i].name;
              var isPie = series[i].category == 'pie';
              var textWidth = util.mesureText(isPie ? names[0] : names, dataSet.xAxis.size);
              var legendWidth = chartOpt.legendWidth + textWidth + chartOpt.chartSpace * 2;
              var startX = chartOpt.chartWidth / 2 - legendWidth * (isPie ? names.length : series.length) / 2;
          
              if (series[i].category == 'pie') {
                for (var k = 0; k < names.length; k++) {
                  var x = startX + legendWidth * k;
                  var y = chartOpt.bottom - chartOpt.legendHeight;
          
                  ctx.setFillStyle(dataSet.xAxis.color);
                  ctx.setFontSize(dataSet.legend.size);
                  ctx.setTextAlign('left');
                  ctx.fillText(names[k], x + chartOpt.textSpace + chartOpt.legendWidth, chartOpt.bottom);
          
                  var color = getColor(k);
                  ctx.setFillStyle(color);
                  ctx.fillRect(x, y + 1, chartOpt.legendWidth, chartOpt.legendHeight);
                }
              } else {
          
                var x = startX + legendWidth * i + chartOpt.legendWidth * i;
                var y = chartOpt.bottom - chartOpt.legendHeight;
          
                ctx.setFillStyle(dataSet.xAxis.color);
                ctx.setFontSize(dataSet.legend.size);
                ctx.setTextAlign('left');
                ctx.fillText(series[i].name, x + chartOpt.chartSpace + chartOpt.legendWidth, chartOpt.bottom);
          
                var color = getColor(i);
                ctx.setFillStyle(color);
                ctx.setLineWidth(2);
                ctx.setStrokeStyle(color);
                if (series[i].category == 'bar') {
                  ctx.fillRect(x, y + 1, chartOpt.legendWidth, chartOpt.legendHeight);
                } else if (series[i].category == 'line') {
                  var lx = x + chartOpt.legendWidth / 2;
                  var ly = y + chartOpt.legendHeight / 2 + 1;
                  ctx.beginPath();
                  ctx.moveTo(x, ly);
                  ctx.lineTo(x + chartOpt.legendWidth, ly);
                  ctx.stroke();
                  ctx.closePath();
                  drawPoint(ctx, lx, ly, chartOpt.legendHeight / 2, color);
                  drawPoint(ctx, lx, ly, chartOpt.legendHeight / 4, chartOpt.bgColor);
                }
              }
            }
          }
          /**
           * 绘制数据标签
           */
          function drawToolTips(ctx, text, x, y, color) {
            ctx.setFillStyle(color);
            ctx.setFontSize(dataSet.xAxis.size);
            ctx.setTextAlign('center');
            ctx.fillText(text, x, y);
          }
          /**
           * 画图
           */
          function drawCharts(ctx) {
            var series = dataSet.series;
            for (var i = 0; i < series.length; i++) {
              var category = series[i].category;
              var barWidth = (chartOpt.right - chartOpt.axisLeft) / chartOpt.barLength;
              var barHeight = chartOpt.axisBottom - chartOpt.axisTop;
              var maxMark = chartOpt.axisMark[chartOpt.axisMark.length - 1];
          
              if (category == "bar") {
                barWidth = barWidth - chartOpt.chartSpace;
                drawBarChart(ctx, i, series, barWidth, barHeight, maxMark);
              } else if (category == "line") {
                drawLineChart(ctx, i, series, barWidth, barHeight, maxMark);
              } else if (category == 'pie') {
                drawPieChart(ctx, i, series);
              }
            }
          }
          /**
           * 绘制柱状图
           */
          function drawBarChart(ctx, i, series, barWidth, barHeight, maxMark) {
            var item = series[i];
            var itemWidth = barWidth / chartOpt.barNum;
          
            for (var k = 0; k < item.data.length; k++) {
              var itemHeight = barHeight * (item.data[k] / maxMark);
              var x = barWidth * k + chartOpt.axisLeft + k * chartOpt.chartSpace + chartOpt.chartSpace / 2 + i * itemWidth;
              var y = chartOpt.axisBottom - itemHeight;
              var color = getColor(series.length <= 1 ? k : i);
              ctx.setFillStyle(color);
              ctx.fillRect(x, y, itemWidth, itemHeight);
          
              drawToolTips(ctx, item.data[k], x + itemWidth / 2, y - chartOpt.textSpace, color);
            }
          }
          /**
           * 绘制折线图
           */
          function drawLineChart(ctx, i, series, barWidth, barHeight, maxMark) {
            var item = series[i];
            var color = getColor(i);
            ctx.setLineWidth(2);
            ctx.setStrokeStyle(color);
            ctx.beginPath();
            for (var k = 0; k < item.data.length; k++) {
              var point = getLinePoint(k, item, barWidth, barHeight, maxMark);
              if (k == 0) {
                ctx.moveTo(point.x, point.y);
              } else {
                ctx.lineTo(point.x, point.y);
              }
            }
            ctx.stroke();
            ctx.closePath();
            for (var k = 0; k < item.data.length; k++) {
              var point = getLinePoint(k, item, barWidth, barHeight, maxMark);
              drawPoint(ctx, point.x, point.y, 3, color);
              drawPoint(ctx, point.x, point.y, 1, chartOpt.bgColor);
              drawToolTips(ctx, item.data[k], point.x, point.y - chartOpt.chartSpace, color);
            }
          }
          function getLinePoint(k, item, barWidth, barHeight, maxMark) {
            var x = barWidth * k + chartOpt.axisLeft + barWidth / 2;
            var y = chartOpt.axisBottom - barHeight * (item.data[k] / maxMark);
            return { x: x, y: y };
          }
          function drawPoint(ctx, x, y, radius, color) {
            ctx.setFillStyle(color);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
          }
          /**
           * 绘制饼图
           */
          function drawPieChart(ctx, i, series) {
            var item = series[i];
          
            var x = (chartOpt.right - chartOpt.left) / 2 + chartOpt.left;
            var radius = (chartOpt.axisBottom - chartOpt.axisTop) / 3;
            var y = (chartOpt.axisBottom - chartOpt.axisTop) / 2 + chartOpt.axisTop;
          
            var lastAngel = 0;
            for (var k = 0; k < item.data.length; k++) {
              var color = getColor(k);
              var curAngel = 2 / chartOpt.chartPieCount * item.data[k];
              var precent = 100 / chartOpt.chartPieCount * item.data[k];
          
              drawPieToolTips(ctx, item.data[k] + "(" + Math.round(precent) + "%)", color, x, y, radius, lastAngel, curAngel);
          
              ctx.setFillStyle(color);
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.arc(x, y, radius, (lastAngel - 0.5) * Math.PI, (lastAngel + curAngel - 0.5) * Math.PI);
              ctx.fill();
              ctx.closePath();
              lastAngel += curAngel;
            }
          }
          /**
           * 绘制饼图数据标签
           */
          function drawPieToolTips(ctx, value, color, x, y, radius, lastAngel, curAngel) {
            var textWidth = util.mesureText(value, dataSet.xAxis.size);
            var cosc = Math.cos((lastAngel - 0.5 + curAngel / 2) * Math.PI);
            var sinc = Math.sin((lastAngel - 0.5 + curAngel / 2) * Math.PI);
            var x1 = radius * cosc + x;
            var y1 = radius * sinc + y;
          
            var x2 = (radius + 20) * cosc + x;
            var y2 = (radius + 20) * sinc + y;
          
            ctx.setFillStyle(color);
            ctx.setTextAlign(x2 < x1 ? 'right' : 'left');
            ctx.setFontSize(dataSet.xAxis.size);
            ctx.setStrokeStyle(color);
            ctx.setLineWidth(1);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            if (x1 >= x && y1 < y) {
              ctx.quadraticCurveTo(x2, y2, x2 + 15, y2);
              ctx.fillText(value, x2 + 15 + chartOpt.textSpace, y2 + dataSet.xAxis.size / 2);
            } else if (x1 >= x && y1 >= y) {
              ctx.quadraticCurveTo(x2, y2, x2 + 15, y2);
              ctx.fillText(value, x2 + 15 + chartOpt.textSpace, y2 + dataSet.xAxis.size / 2);
            } else if (x1 < x && y1 >= y) {
              ctx.quadraticCurveTo(x2, y2, x2 - 15, y2);
              ctx.fillText(value, x2 - 15 - chartOpt.textSpace, y2 + dataSet.xAxis.size / 2);
            } else if (x1 < x && y1 < y) {
              ctx.quadraticCurveTo(x2, y2, x2 - 15, y2);
              ctx.fillText(value, x2 - 15 - chartOpt.textSpace, y2 + dataSet.xAxis.size / 2);
            }
            ctx.stroke();
            ctx.closePath();
          }
          /**
           * 获取柱状图颜色值，循环渲染
           */
          function getColor(index) {
            var cLength = dataSet.color.length;
            if (index >= cLength) {
              return dataSet.color[index % cLength];
            } else {
              return dataSet.color[index];
            }
          }
          /**
           * 保存图表为图片
           */
          function saveCanvans(func) {
            wx.canvasToTempFilePath({
              canvasId: canvasId,
              success: function success(res) {
                console.log(res.tempFilePath);
                // wx.previewImage({
                //   urls: [res.tempFilePath],
                // })
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function success(ress) {
                    console.log(ress);
                  }
                });
              }
            });
          }
          
          /***/ }),
          
          /***/ "./src/utils/chartUtils.js":
          /*!*********************************!*\
            !*** ./src/utils/chartUtils.js ***!
            \*********************************/
          /***/ (function(module) {
          
          
          
          module.exports = {
            mesureText: mesureText,
            calculateY: calculateY,
            drawDashLine: drawDashLine,
            drawRoundBar: drawRoundBar
            /**
             * 测量文字宽度，
             * Canvas宽度太大，微信提供的setTextAlign(center)
             * 方法并不能准确居中显示
             */
          };function mesureText() {
            var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '100';
            var textSize = arguments[1];
          
            var ratio = textSize / 20;
            console.log(text, 'text');
            var text = text.split('');
          
            var width = 0;
            text.forEach(function (item) {
              if (/[a-zA-Z]/.test(item)) {
                width += 14 * ratio;
              } else if (/[0-9]/.test(item)) {
                width += 11 * ratio;
              } else if (/\./.test(item)) {
                width += 5.4 * ratio;
              } else if (/-/.test(item)) {
                width += 6.5 * ratio;
              } else if (/[\u4e00-\u9fa5]/.test(item)) {
                width += 20 * ratio;
              }
            });
            return width;
          }
          /**
           * 计算Y轴显示刻度
           */
          function calculateY(dMin, dMax, iMaxAxisNum) {
            if (iMaxAxisNum < 1 || dMax < dMin) return;
          
            var dDelta = dMax - dMin;
            if (dDelta < 1.0) {
              dMax += (1.0 - dDelta) / 2.0;
              dMin -= (1.0 - dDelta) / 2.0;
            }
            dDelta = dMax - dMin;
          
            var iExp = parseInt(Math.log(dDelta) / Math.log(10.0)) - 2;
            var dMultiplier = Math.pow(10, iExp);
            var dSolutions = [1, 2, 2.5, 5, 10, 20, 25, 50, 100, 200, 250, 500];
            var i;
            for (i = 0; i < dSolutions.length; i++) {
              var dMultiCal = dMultiplier * dSolutions[i];
              if (parseInt(dDelta / dMultiCal) + 1 <= iMaxAxisNum) {
                break;
              }
            }
          
            var dInterval = dMultiplier * dSolutions[i];
          
            var dStartPoint = (parseInt(dMin / dInterval) - 1) * dInterval;
            var yIndex = [];
            var iAxisIndex;
            for (iAxisIndex = 1; true; iAxisIndex++) {
              var y = dStartPoint + dInterval * iAxisIndex;
              console.log(y);
              yIndex.push(y);
              if (y > dMax) break;
            }
            return yIndex;
          }
          /**
           * 绘制虚线
           */
          function drawDashLine(ctx, x1, y1, x2, y2, dashLen) {
            dashLen = dashLen === undefined ? 4 : dashLen;
            var beveling = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            var num = Math.floor(beveling / dashLen);
          
            ctx.beginPath();
            for (var i = 0; i < num; i++) {
              var x = x1 + (x2 - x1) / num * i;
              var y = y1 + (y2 - y1) / num * i;
              if (i % 2 == 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();
            ctx.closePath();
          }
          /**
           * 绘制圆角矩形
           */
          function drawRoundBar(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
            ctx.lineTo(width - radius + x, y);
            ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
            ctx.lineTo(width + x, height + y - radius);
            ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
            ctx.lineTo(radius + x, height + y);
            ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
            ctx.closePath();
            ctx.fill();
          }
          
          function requestAnimation(callback) {
            var that = this;
            // 保证如果重复执行callback的话，callback的执行起始时间相隔16ms 
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = setTimeout(function () {
              callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          }
          
          function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
          }
          
          /***/ })
          
          /******/ 	});
          /************************************************************************/
          /******/ 	// The module cache
          /******/ 	var __webpack_module_cache__ = {};
          /******/ 	
          /******/ 	// The require function
          /******/ 	function __webpack_require__(moduleId) {
          /******/ 		// Check if module is in cache
          /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
          /******/ 		if (cachedModule !== undefined) {
          /******/ 			return cachedModule.exports;
          /******/ 		}
          /******/ 		// Create a new module (and put it into the cache)
          /******/ 		var module = __webpack_module_cache__[moduleId] = {
          /******/ 			// no module.id needed
          /******/ 			// no module.loaded needed
          /******/ 			exports: {}
          /******/ 		};
          /******/ 	
          /******/ 		// Execute the module function
          /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
          /******/ 	
          /******/ 		// Return the exports of the module
          /******/ 		return module.exports;
          /******/ 	}
          /******/ 	
          /************************************************************************/
          var __webpack_exports__ = {};
          // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
          !function() {
          /*!**********************!*\
            !*** ./src/index.js ***!
            \**********************/
          
          
          var chart = __webpack_require__(/*! ./utils/chart */ "./src/utils/chart.js");
          
          console.log(chart);
          
          function runCode(that, e) {
          
              wx.setNavigationBarTitle({ title: '热更新' });
          
              that.data = {
                  index: 0,
                  chartWidth: 0,
                  chartHeight: 0
              };
          
              that.onload = function () {
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
                      }]
                  });
                  that.reSetPage();
              };
          
              that.onSaveClick = function () {
                  chart.saveCanvans(function () {});
              };
              //每一次刷新建议重新调用
              that.reSetPage = function () {
                  that.data.html = '                      <canvas canvas_id="canvas1"  style="background-color: #f4f4f4;width:' + that.data.chartWidth + 'px;height:' + that.data.chartHeight + 'px;"/>        <button style="    font-size: 16px;    background: #699fed;    border-radius: 6px;    color: white;    width: 70%;    margin-top: 32px;  " bindtap="onSaveClick">\u4FDD\u5B58\u56FE\u7247</button>      ';
                  that.setData({
                      html: that.parse(that.data.html)
                  });
              };
          
              that.reSetPage();
          
              that.onload();
          }
          
          module.exports = runCode;
          }();
          /******/ })()
          ;
          //# sourceMappingURL=index.js.map

        `)
        onload(that, options)
      } catch (e) {
        console.log(e)
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  parseTag(tag) {
    let res = {
      type: "tag",
      name: "",
      voidElement: false,
      // attrs: {},
      children: [],
    };
    let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
    if (tagMatch) {
      // 标签名称为正则匹配的第2项
      res.type = tagMatch[1];
      if (tag.charAt(tag.length - 2) === "/") {
        // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
        res.voidElement = true;
      }
    }
    // 匹配所有的标签正则
    let classList = tag.match(/\s([^'"/\s><]+?)\s*?=\s*?(".*?"|'.*?')/g);

    if (classList && classList.length) {
      for (let i = 0; i < classList.length; i++) {
        // 去空格再以= 分隔字符串  得到['属性名称','属性值']
        let c = classList[i].replace(/\s*/g, "").split("=");

        // 循环设置属性
        let p = c[1].substring(1, c[1].length - 1)
        if (p.indexOf("padding") || p.indexOf("margin")) {

          p = p.replace(/px/g, "px ").replace(/px 0/g, "px 0 ").replace(/all/g, "all ")

          // console.log(p)
        }
        try {
          p = JSON.parse(c[1].substring(1, c[1].length - 1))
        } catch {

        }

        if (c[1]) res[c[0]] = p;

      }
    }
    return res;
  },

  parse(html) {
    var that = this;
    let result = [];
    let current;
    let level = -1;
    let arr = [];
    let tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
    html.replace(tagRE, function (tag, index) {
      // 判断第二个字符是不是'/'来判断是否open
      let isOpen = tag.charAt(1) !== "/";
      // 获取标签末尾的索引
      let start = index + tag.length;
      // 标签之前的文本信息
      let text = html.slice(start, html.indexOf("<", start));

      let parent;
      if (isOpen) {
        level++;
        // 设置标签属性
        current = that.parseTag(tag);
        // 判断是否为文本信息，是就push一个text children  不等于'  '
        if (!current.voidElement && text.trim()) {
          current["text"] = text
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

  }




})