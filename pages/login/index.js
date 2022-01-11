// pages/login/index.js
import { wxGetUserProfile } from "../../utils/wxtools"
import { wxLogin } from "../../utils/wxtools" 
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async hiddlelogin(){
        // 进行登录
        // 将登录后的信息保存到userInfo 的内存中
        let res = await wxGetUserProfile({desc: "用户个人信息"})
        if(res){
            // 将个人信息存在内存中 然后跳回上一步
            wx.setStorageSync('userInfo', res.userInfo)
            wx.navigateBack({
              delta: 1,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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