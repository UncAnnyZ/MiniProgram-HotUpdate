Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入的数据
    experimentData:"",
    //
   
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //输入
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  Check(){
    wx.navigateTo({
      url: '/pages/test1/test1',
    })
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
  
  onReachBottom: function () {
  },
   
  onShareAppMessage: function () {
    
  }
})