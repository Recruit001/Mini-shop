export const getChooseAddress = () => {
    return new Promise((resolve,reject) => {
        wx.chooseAddress({
          success: (result) => {
              resolve(result)
          },
          fail: (error) => {
              reject(error)
          }
        })
    })
}

// 展示拟态框
export const wxShowModel = ({content}) => {
    return new Promise((resolve,reject) => {
        wx.showModal({
            title: '提示',
            content,
            success (res) {
              resolve(res)
            },
            fail: (e) => {
                reject(e)
            }
          })
    })
}
// 提示
export const wxShowToast = ({title}) => {
    return new Promise((resolve,reject) => {
        wx.showToast({
          title,
          icon: "none"
        })
    })
}

export const wxLogin = () => {
    return new Promise((resolve,reject) => {
        wx.login({
            success (res) {
                resolve(res)
            },
            fail: (error) => {
                reject(error)
            }
          })
    })
}
// 获取用户信息
export const wxGetUserProfile = ({desc}) => {
    return new Promise((resolve,reject) => {
        wx.getUserProfile({
            desc,
            success: res => {
                resolve(res)
            },
            fail: res => {
            }
          })
    })
}