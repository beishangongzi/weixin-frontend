// pages/auth/auth.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    code:"",
    time:"获取验证码"
  },
  bindPhoneInput(e){
    this.setData({phone: e.detail.value})
  },

  bindCodeInput(e){
    this.setData({code: e.detail.value})
  },
  onClickCheckCode(e){
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none'
      })
      return
    }
    var reg = /^(1[3|4|5|6|7|8|9])\d{9}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机格式错误',
        icon: 'none'
      })
      return
    }
    var that = this
    // 发送短信验证码，登录成功之后获取jwt和微信用户信息，保存到globalData和本地存储中。
    wx.request({
      url: app.globalData.baseUrl + "users/message/",
      data: { phone: this.data.phone },
      method: 'POST',
      dataType: 'json',
      headers: {'content-type': 'application/json'},
      success: function (res) {
        if(res.data.status){
          // 倒计时计数器
          wx.showToast({ title: res.data.message, icon: 'none' });
          that.setData({time: 100})
          var ttl = 99
          var timer = setInterval(function () {
            if (ttl == 0) {
                // 清除定时器和复原按钮
                clearInterval(timer);
                that.setData({time: "发送验证码"})
            } else {
                that.setData({time: ttl + "s"})
                ttl--;
            }
        }, 1000);
        }else{
          // 短信发送失败
          wx.showToast({ title: res.data.message, icon: 'none' });
        }
      },
      fail(){
        showToast({title: "server error"})
      }
    })
  },

  onClickSubmit(e){
    wx.request({
      url: app.globalData.baseUrl + "users/login/",
      data: {phone: this.data.phone, code: this.data.code},
      method: "POST",
      dataType: "json",
      success: (result) => {
        // getApp().globalData.phone = result.data.data.phone
        // 在本地存储
        // wx.setStorageSync('phone', result.data.data.phone)

        // 封装函数
        // wx.getUserInfo({
        //   success: (res) => {
        //     getApp().initUserInfo(result.data.data, res.userInfo)
        //   },
        //   fail: (res) => {},
        //   complete: (res) => {},
        // })
        console.log(result)
        if (result.data.status){
          getApp().initUserInfo(result.data, e.detail.userInfo)
          wx.navigateBack({})
        }else{
          wx.showToast({
            title: '"登录失败"'
          })
        }
        
        
      },
      fail: (res) => {
        
      },
      complete: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})