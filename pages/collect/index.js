// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabsData: [
            {
                id: 0,
                name: "商品收藏",
                isActive: true
            },
            {
                id: 1,
                name: "品牌收藏",
                isActive: false
            },
            {
                id: 2,
                name: "店铺收藏",
                isActive: false
            },
            {
                id: 3,
                name: "浏览足迹",
                isActive: false
            }
        ],
        currentIndex: 0,
        collectData: []
    },
    sonTabsClick(e){
        let index = e.detail
        this.changeIndex(index)
    },
    changeIndex(index){
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
        let pages = getCurrentPages()
        let { options } = pages[pages.length - 1]
        let index = options.collect
        this.changeIndex(index)
        let collectData = wx.getStorageSync('collect') || []
        this.setData({
            collectData
        })
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