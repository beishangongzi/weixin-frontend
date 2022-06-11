// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: "http://139.159.252.137:8000/v1/api/"
  },
  initUserInfo(res, localInfo){
    // 初始化用户信息
    var info = {
      token:res.token,
      phone: res.phone,
      nickName: localInfo.nickName,
      avatarUrl: localInfo.avatarUrl,
      username: res.username
    }
    this.globalData.userInfo = info
    wx.setStorageSync('userInfo', info)
  },
  deleteUserInfo(){
    this.globalData.userInfo = null
    wx.removeStorageSync('userInfo')
  }

})
