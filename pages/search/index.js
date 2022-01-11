// pages/search/index.js
import { getData } from "../../request/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: "",
        goods: []
    },
    TimeId: -1,
    hiddleinput(e){
        let inputValue = e.detail.value
        this.setData({
            inputValue
        })
        if(!inputValue.trim()){
            this.setData({
                goods: []
            })
            return
        }
        else{
            // 防抖
            clearTimeout(this.TimeId)
            this.TimeId = setTimeout(() => {
                this.searchGetData(inputValue)
            },1000)
        }
    },
    async searchGetData(query){
        let goods = await getData({url: "/goods/qsearch",data:{query}})
        this.setData({
            goods
        })
    },
    hiddlereset(){
        this.setData({
            goods: [],
            inputValue: ""
        })
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