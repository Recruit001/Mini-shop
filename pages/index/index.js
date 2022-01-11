// 导入请求函数
import { getData } from "../../request/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navigatorList: [],
    floorData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavigatorData()
    this.getFloorData()
  },
  getSwiperList(){
    getData({
      url: "/home/swiperdata"
    }).then(res => {
      res.forEach(item => {
        item.navigator_url = item.navigator_url.replace(/main/g,"index")
      })
      this.setData({
        swiperList: res
      })
    })
  },
  getNavigatorData(){
    getData({
      url: "/home/catitems"
    }).then(res => {
      this.setData({
        navigatorList: res
      })
    })
  },
  getFloorData(){
    getData({
      url: "/home/floordata"
    }).then(res => {
      res.forEach(item => {
        item.product_list.forEach(item2 => {
          let arr1 = item2.navigator_url.split("?")
          item2.navigator_url = arr1[0] + "/index?" + arr1[1]
        })
      })
      this.setData({
        floorData: res
      })
      console.log(this.data.floorData)
    })
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
    
  }
})