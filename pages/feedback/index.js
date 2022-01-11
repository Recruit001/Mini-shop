// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabsData: [
            {
                id: 0,
                name: "体验问题",
                isActive: true
            },
            {
                id: 1,
                name: "商品、商家投诉",
                isActive: false
            }
        ],
        textareaValue: "",
        currentIndex: 0,
        goodsImg: []
    },
    sonTabsClick(e){
        let index = e.detail
        let { tabsData } = this.data
        tabsData.forEach((v,i) => i == index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabsData,
            currentIndex: index
        })
    },
    hiddleupimg(){
        let { goodsImg } = this.data
        // 调用上传图片连接
        wx.chooseImage({
          count: 9,
          success: res => {
              goodsImg = [...res.tempFilePaths,...goodsImg]
              this.setData({
                  goodsImg
              })
          }
        })
    },
    hiddlecancel(e){
        let { goodsImg } = this.data
        goodsImg.splice(e.currentTarget.dataset.index,1)
        this.setData({
            goodsImg
        })
    },
    hiddleinput(e){
        this.setData({
            textareaValue: e.detail.value
        })
    },
    hiddlebtn(){
        let { textareaValue } = this.data
        if(!textareaValue){
            wx.showToast({
              title: '意见不能为空',
              icon: "none"
            })
            return
        }
        else{
            console.log("上传成功")
            this.setData({
                textareaValue: "",
                goodsImg: []
            })
            wx.navigateBack({
              delta: 1,
            })
        }
        // console.log("提交成功")
        // 清楚所有数据
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