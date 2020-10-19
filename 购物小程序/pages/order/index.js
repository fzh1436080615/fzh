// pages/order/index.js
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
      tabs: [
          {id: 0, value: '全部', isActive: true},
          {id: 1, value: '待付款', isActive: false},
          {id: 2, value: '待发货', isActive: false},
          {id: 3, value: '退款/退货', isActive: false}
      ],
  },
  // 标题点击事件, 从子组件转递过来
  handleTabsItemChange(e) {
      const {index} = e.detail;
      let {tabs} = this.data;
      tabs.forEach((v, i) => index == i ? v.isActive = true : v.isActive = false)
      this.setData({tabs})
  },
  onLoad: function (options) {
      const {type}=options;
      let {tabs} = this.data;
      tabs.forEach((v, i) => type == i ? v.isActive = true : v.isActive = false)
      this.setData({tabs})
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
  
  }
})