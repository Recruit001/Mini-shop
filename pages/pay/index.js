// pages/pay/index.js
import { getData } from "../../request/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressData: {},
        checkedGoodsData: [],
        totalNum: 0,
        totalPrice: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let goodsData = wx.getStorageSync('cart')
        let { addressData,checkedGoodsData,totalNum,totalPrice } = this.data
        addressData = wx.getStorageSync('address')
        checkedGoodsData = goodsData.filter(v => v.isChecked)
        checkedGoodsData.forEach(v => {
            totalNum += v.num
            totalPrice += v.num * v.goods_price
        })
        this.setData({
            addressData,
            checkedGoodsData,
            totalNum,
            totalPrice
        })
    },
    async hiddlepay(){
        // 判断是否有token
        let token = wx.getStorageSync('token')
        // 没有跳转到授权页面
        if(!token){
            wx.navigateTo({
              url: '/pages/auth/index',
            })
        }
        else{
            // 有的话执行预支付操作
            // 创建订单
            let goods = this.data.checkedGoodsData.map(v => {
                let obj = {
                    goods_id: v.goods_id,
                    goods_number: v.num,
                    goods_price: v.goods_price
                }
                return obj
            })
            let data = {
                order_price: this.data.totalPrice,
                consignee_addr: this.data.addressData.all,
                goods
            }
            let res = await getData({url: "/my/orders/create",method: "POST",data})
            // 生成预付订单
            let preData = {
                order_number: res.order_number
            }
            let preRes = await getData({url: "/my/orders/req_unifiedorder",method: "POST",data:preData})
            let pay = preRes.pay
            // 发动微信支付
            wx.requestPayment({
                ...pay,
                success (res) {
                    console.log(res)
                    // 成功时候
                    // 对支付的商品进行删除
                    // 跳转到订单页面
                 },
                fail (res) {
                    console.log(res)
                }
              })
        }
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