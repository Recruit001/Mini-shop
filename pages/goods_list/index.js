// pages/goods_list/index.js
// 请求接口函数
import { getData } from "../../request/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabsData: [
            {
                id: 0,
                name: "综合",
                isActive: true
            },
            {
                id: 1,
                name: "销量",
                isActive: false
            },
            {
                id: 2,
                name: "价格",
                isActive: false
            }
        ],
        currentIndex: 0,
        goodsQueryData: {
            query: "",
            cid: "",
            pagenum: 1,
            pagesize: 10
        },
        goodsTotal: null,
        goodsData: []
    },
    GoodsList: [],
    sonTabsClick(e){
        let index = e.detail
        let { tabsData } = this.data
        tabsData.forEach((v,i) => i == index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabsData,
            currentIndex: index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let { goodsQueryData } = this.data
        goodsQueryData.cid = options.cid || "",
        goodsQueryData.query = options.query || ""
        this.setData({
            goodsQueryData
        })
        await this.getGoodsList()
        console.log(this.GoodsList)
    },
    async getGoodsList(){
        const res = await getData({
            url: "/goods/search",
            data: this.data.goodsQueryData
        })
        this.GoodsList = res
        let goodsData = [...this.data.goodsData,...this.GoodsList.goods]
        this.setData({
            goodsTotal: Math.ceil(this.GoodsList.total / this.data.goodsQueryData.pagesize),
            goodsData
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
/*
        下拉刷新
        重置数据
        重新发送请求
     */
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        let { goodsQueryData } = this.data
        goodsQueryData.pagenum = 1
        this.setData({
            goodsData: [],
            goodsQueryData
        })
        await this.getGoodsList()
        wx.stopPullDownRefresh()
    },
/*
            触底时候触发的函数
            修改请求数据的页码
            进行页码判断
            请求数据 数据拼接
         */
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let { goodsQueryData } = this.data
        goodsQueryData.pagenum ++
        if(this.data.goodsQueryData.pagenum > this.data.goodsTotal){
            wx.showToast({
                title: "没有下一页"
            })
            return
        }
        else{
            this.setData({
                goodsQueryData
            })
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})