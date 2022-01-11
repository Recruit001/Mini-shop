// 导入获取地址封装工具
import { getChooseAddress,wxShowModel,wxShowToast } from "../../utils/wxtools"
// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressData: [],
        goodsData: [],
        totalNum: 0,
        totalPrice: 0,
        allChecked: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    // 添加收货地址
    async addAddress(){
        try{
            let getAddress = wx.getStorageSync('address')
            if(!getAddress){
                let res = await getChooseAddress()
                // 将地址信息保存到内存中
                res.all = res.provinceName + res.cityName + res.countyName + res.detailInfo
                wx.setStorageSync('address', res)
            }
        }catch(e){
            console.log(e)
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
        let addressData = wx.getStorageSync('address') || []
        let goodsData = wx.getStorageSync('cart') || []
        this.setData({
            addressData,
            goodsData
        })
        this.computedTotal(goodsData)
    },
    // 计算总数跟总价格
    computedTotal(cart){
        let totalNum = 0
        let totalPrice = 0
        let allChecked = true
        //isChecked的才能用于计算
        cart.forEach(v => {
            if(v.isChecked){
                totalNum += v.num
                totalPrice += v.num * v.goods_price
            }
            else{
                allChecked = false
            }
        })
        allChecked = cart.length ? allChecked : false
        this.setData({
            totalNum,
            totalPrice,
            allChecked,
            goodsData: cart
        })
    },
    fatherhiddlechange(e){
        // 获取商品列表数据
        // 找到改变的数据
        // 改变状态
        // 改变总数跟总价格跟全选状态
        // 1、获取商品列表数据
        let { goodsData } = this.data
        let index = goodsData.findIndex(v => v.goods_id == e.detail)
        //2、 改变数据
        goodsData[index].isChecked = !goodsData[index].isChecked
        // 3、改变总数跟总价格还有全选状态
        this.computedTotal(goodsData)
        // 4、保存会内存中
        wx.setStorageSync('cart', goodsData)
    },
    allhiddlechange(){
        let { allChecked,goodsData } = this.data
        allChecked = !allChecked
        goodsData.map(v => v.isChecked = allChecked)
        this.computedTotal(goodsData)
        wx.setStorageSync('cart', goodsData)
    },
    async hiddlecz(e){
        let { id,cz } = e.detail
        let { goodsData } = this.data
        let index = goodsData.findIndex(v => v.goods_id == id)
        if(goodsData[index].num == 1 && cz === -1){
            // 执行询问是否删除操作
            let res = await wxShowModel({content: "是否删除该商品？"})
            if(res.confirm){
                // console.log("点击确定")
                // 删除商品
                goodsData.splice(index,1)
                this.computedTotal(goodsData)
                wx.setStorageSync('cart', goodsData)
            }else if(res.cancel){
            }
        }else{
            goodsData[index].num += cz
            this.computedTotal(goodsData)
        }
        wx.setStorageSync('cart', goodsData)
    },
    async tapjs(){
        let { addressData,goodsData } = this.data
        let checkedGoods = goodsData.filter(v => v.isChecked)
        // 1、填写地址
        // 2、选择商品
        // 3、跳转到支付页面
        // 1、填写地址
        if(!addressData.all){
            await wxShowToast({title: "请添加收货地址 ！"})
            return
        }else if(checkedGoods.length == 0){
            await wxShowToast({title: "请选择商品 !"})
        }
        else{
            // 3、跳转到支付页面
            wx.navigateTo({
              url: '/pages/pay/index',
            })
        }
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