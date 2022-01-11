// pages/order/index.js
import { getData } from "../../request/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabsData: [
            {
                id: 0,
                name: "全部",
                isActive: true
            },
            {
                id: 1,
                name: "代付款",
                isActive: false
            },
            {
                id: 2,
                name: "代发货",
                isActive: false
            },
            {
                id: 3,
                name: "退款/退货",
                isActive: false
            }
        ],
        currentIndex: 0,
        orderData: []
    },
    sonTabsClick(e){
        let index = e.detail
        this.changeIndex(index)
        let type = index + 1
        this.getOrderData(type)
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
        // 判断是否有token
        // 没有跳转到授权页面
        // 因为要经常调用所以获取数据放在onshow中
        // 获取type值
        // 判断是否有type值
        // 发动请求获取数据
        let token = wx.getStorageSync('token')
        if(!token){
            wx.navigateTo({
              url: '/pages/auth/index',
            })
        }
        let pages = getCurrentPages()
        let { type } = pages[pages.length - 1].options
        // 设置进入时候的index
        this.changeIndex(type - 1)
        if(type){
            this.getOrderData(type,token)
        }
    },
    async getOrderData(type){
        let res = await getData({url: "/my/orders/all",data:{type}})
        let orders = res.orders.map(v => {
            let newData = new Date()
            // 这里的update_time的单位是s
            newData.setTime(v.update_time * 1000)
            v.update_time = newData.toISOString()
            return v
        })
        this.setData({
            orderData: orders
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