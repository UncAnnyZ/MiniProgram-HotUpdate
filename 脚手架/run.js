const fs = require('fs')

fs.readFile('dist/index.js', (err, buffer) => {
  let str1= buffer.toString()
  let str = `
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
        var onload = app.jsRun(args, \`
        ${str1}
  \`)
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
    let tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
    if (tagMatch) {
      // 标签名称为正则匹配的第2项
      res.type = tagMatch[1];
      if (tag.charAt(tag.length - 2) === "/") {
        // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
        res.voidElement = true;
      }
    }
    // 匹配所有的标签正则
    let classList = tag.match(/\\s([^'"/\\s><]+?)\\s*?=\\s*?(".*?"|'.*?')/g);

    if (classList && classList.length) {
      for (let i = 0; i < classList.length; i++) {
        // 去空格再以= 分隔字符串  得到['属性名称','属性值']
        let c = classList[i].replace(/\\s*/g, "").split("=");

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
    let tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
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
`
  fs.writeFile('../pages/index/index.js', str, {
    encoding: 'utf8'
  }, err => {})
})