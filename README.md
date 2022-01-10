# MiniProgram-HotUpdate
小程序热更新方案，可以随时修改js代码进行热更新

这个是一个小程序热更新一个方案，绕过小程序审核，比h5的优势是可以调用微信小程序的接口，比如wx.xxxx，可以加载一次，多次使用

## 使用文档
打开脚手架，在src/index.js敲完代码
```cmd
 npm run build
```
生成的代码在dist/index.js，然后打开小程序的pages/index/index.js的目录下，把对应的代码替换掉
## 注意
- 使用不了wx:for,  wx:if
- 渲染不使用setData而是
```javascript

   that.reSetPage = function () {
        that.data.html =
         `
         <view>hello world</view>
         `
        that.setData({
            html: that.parse(that.data.html)
        });
    };

    // 每一次都需要调用

     that.reSetPage()
```
- 可以使用wx.xxxx的接口，例如wx.getStorageSync,云函数等等

---
# Demo
![Demo](https://raw.githubusercontent.com/UncAnnyZ/MiniProgram-HotUpdate/main/images/demo.png)
