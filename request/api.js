const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
let requestCount = 0
export const getData = obj => {
    requestCount ++
    wx.showLoading({
        title: '加载中',
      })
    if(obj.url.indexOf("/my/") != -1){
      let token = wx.getStorageSync('token')
      obj.header = {
        Authorization: token
      }
    }
    return new Promise((resolve,reject) => {
        wx.request({
          ...obj,
          url: baseURL + obj.url,
          success: res => {
              resolve(res.data.message)
          },
          fail: error => {
              reject(error)
          },
          complete: () => {
            requestCount --
            if(requestCount == 0){
                wx.hideLoading()
            }
          }
        })
    })
}