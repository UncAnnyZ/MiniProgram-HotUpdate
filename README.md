# MiniProgram-HotUpdate
小程序热更新方案，可以随时修改html,css,js代码进行热更新

这个是一个小程序热更新一个方案，绕过小程序审核，比h5的优势是可以调用微信小程序的接口，比如wx.xxxx，可以加载一次，多次使用

比web-view更方便
</br>
</br>
## 提示


控制台有这个问题，可以忽略，因为在字符串中\\\\代表\，但是小程序认为这个是工程文件，所以报错,可以忽略
```js
  var tagMatch = tag.match(/<\\/?([^\\s]+?)[/\\s>]/);
```
</br>


## 原理
- 框架实现
  - 在脚手架中将 html 与 js 代码进行转译后利用递归放入 pages/index/index
  - src/index.js → dist/index.js → build.js → run.js → pages/index/index.js → js解析（eval） → pages/index/index
- 实现热更新需要你自己写wx.request 
  - src/index.js → dist/index.js → build.js → 把 build.js的字符串给后端数据库 → 前端读到数据库 → pages/index/index.js → js解析（eval） → pages/index/index
- 


## 使用文档
---
</br>

### 方法一
打开小程序进入终端
```cmd
 cd 脚手架
 npm run start
```
会自动生成代码，马上呈现到小程序上

</br>

---

</br>

### 方法二
打开脚手架，在src/index.js敲完代码
```cmd
 npm run build
```
生成的代码在dist/index.js，然后打开小程序的pages/index/index.js的目录下，把对应的代码替换掉

</br>

--- 

</br>

## 注意事项

- 不支持 `wx:if` ，使用请查看下面推荐写法
```javascript
  // 原生 
  <view wx:if="{{boxShow}}" class="box">
  </view>
  
  // 推荐写法
  {{ boxShow === 'true' ? '<view class="box"></view>' : '' }}
```
- 不支持 `<block>` 标签，请用 `<view>` 标签替代
- 不支持CSS子类继承、伪类选择器等写法
</br>

---
</br>

## 补丁修复
---
- `setData({})` 重渲染
- 单引号与双引号同译修复
- 允许 `html` 高亮和语法提示
- 生命周期与小程序一致
- 可以使用wx.xxxx的接口，例如wx.getStorageSync,云函数等等
# Demo

![Demo](https://raw.githubusercontent.com/UncAnnyZ/MiniProgram-HotUpdate/main/images/demo.png)
