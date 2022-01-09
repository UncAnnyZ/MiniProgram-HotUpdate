// app.js
import {
  runInContext
} from './utils/evil-eval.min.js';

App({
  // js本地运行
  // args是storage的信息
  jsRun(args, code) {
    const sandbox = {
      wx,
      args,
      app: getApp()
    };
    const runCode = runInContext(code, sandbox);
    return runCode
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})