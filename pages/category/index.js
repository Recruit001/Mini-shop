// 导入请求函数
import { getData } from '../../request/api'
// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightMenuList: [],
        currentIndex: 0,
        scrollTopNum: null
    },
    CateData: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let check = wx.getStorageSync('cates')
        if(!check){
            const res = await getData({
                url: '/categories'
            })
            wx.setStorageSync('cates', {time: Date.now(),data: res})
            this.CateData = res
        }
        else if(Date.now() - check.time >= 1000 * 10){
            const res = await getData({
                url: '/categories'
            })
            wx.setStorageSync('cates', {time: Date.now(),data: res})
            this.CateData = res
        }
        else{
            this.CateData = check.data
        }
        let leftMenuList = this.CateData.map(item => {
            return item.cat_name
        })
        let rightMenuList = this.CateData[this.data.currentIndex].children
        this.setData({
            leftMenuList,
            rightMenuList
        })
    },
    leftMenuClick(e){
        let rightMenuList = this.CateData[e.currentTarget.dataset.index].children
        this.setData({
            currentIndex: e.currentTarget.dataset.index,
            rightMenuList,
            scrollTopNum: 0
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