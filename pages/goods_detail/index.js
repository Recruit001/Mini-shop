import { getData } from "../../request/api"
// pages/goods_detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsData: {},
        isCollect: false
    },
    GoodsData: {},
    GoodsPics: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const res = await getData({
            url: "/goods/detail",
            data:{
                goods_id: options.goods_id
            }
        })
        this.setData({
            goodsData: {
                pics: res.pics,
                goods_name: res.goods_name,
                goods_introduce: res.goods_introduce.replace(/\.webp/g,".jpg"),
                goods_price: res.goods_price
            }
        })
        this.GoodsData = res
        let collectData = wx.getStorageSync('collect') || []
        let index = collectData.findIndex(v => v.goods_id == this.GoodsData.goods_id)
        let isCollect = index === -1 ? false : true
        this.setData({
            isCollect
        })
        this.GoodsPics = res.pics.map(v => {
            return v.pics_big_url
        })
    },
    // 图片点击预览
    imageTag(e){
        wx.previewImage({
            urls: this.GoodsPics,
            current: this.GoodsPics[e.currentTarget.dataset.index]
        })
    },
    // 添加购物车
    addCartHiddle(){
        /*
            1、获取内存 是否存在该商品
            2、不存在就添加商品
            3、存在就num++
            4、保存回缓存中
         */
        let cart = wx.getStorageSync('cart') || []
        let index = cart.findIndex(v => {
            return v.goods_id == this.GoodsData.goods_id
        })
        if(index == -1){
            this.GoodsData.num = 1
            this.GoodsData.isChecked = true
            cart.push(this.GoodsData)
        }
        else{
            cart[index].num ++
        }
        wx.setStorageSync('cart', cart)
        wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
    },
    // 收藏按钮的点击
    collecttap(){
        // 获取内存collect数据
        // 是否包含该商品
            // 包含 删除该商品
            // 没有则添加上去
        //存储回内存 
        let isCollect = false
        let collectData = wx.getStorageSync('collect') || []
        let index = collectData.findIndex(v => v.goods_id == this.GoodsData.goods_id)
        if(index === -1){
            collectData.push(this.GoodsData)
            isCollect = true
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              mask: true
            })
        }
        else{
            collectData.splice(index,1)
            isCollect = false
            wx.showToast({
                title: '取消成功',
                icon: 'success',
                mask: true
              })
        }
        wx.setStorageSync('collect', collectData)
        this.setData({
            isCollect
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