// pages/auth/index.js
import { wxLogin } from "../../utils/wxtools"
import { getData } from "../../request/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    async getUserInfo(e){
        let obj = {
            encryptedData: e.detail.encryptedData,
            rawData: e.detail.rawData,
            iv: e.detail.iv,
            signature: e.detail.signature
        }
        let res = await wxLogin()
        if(res.code){
            obj.code = res.code
            // 发送请求获取token
            // 由于接口原因这里获取不到token的
            // 所以这里测试使用的是假的token
            let tokenres = await getData({url: "/users/wxlogin",method: "POST",data: obj})
            let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
            if(token){
                // 存储在内存中
                wx.setStorageSync('token', token)
                // 跳转回上一层
                wx.navigateBack({
                  delta: 1,
                })
            }
            else{
                console.log("设置token失败")
            }
        }else{
            console.log("登录失败")
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