//index.js
const app = getApp()
import fetch from '../../util.js/fetch.js';
Page({
  data: {
    imageList:[],
    navList:[
      { image: '../../images/grid-01.png', name: '美食',id:1},
      { image: '../../images/grid-02.png', name: '洗浴足疗', id: 2 },
      { image: '../../images/grid-03.png', name: '结婚啦',id: 3 },
      { image: '../../images/grid-04.png', name: 'KTV', id: 4 },
      { image: '../../images/grid-05.png', name: '找工作', id: 5 },
      { image: '../../images/grid-06.png', name: '辅导班', id: 6},
      { image: '../../images/grid-07.png', name: '汽车保养', id: 7 },
      { image: '../../images/grid-08.png', name: '租房', id: 8 },
      { image: '../../images/grid-09.png', name: '装修', id: 9 }
    ],
  },

  onLoad(){
    // this.getSwiper();
    // this.getNavList()
  },
  getSwiper(){
    wx.request({
      url: 'https://locally.uieee.com/slides',
      method: 'GET',
      data: {

      },
      success: (res) => {
        console.log(res)
        this.data.imageList = res.data;
        this.setData(this.data)
      }
    })
  },
  getNavList(){
    // wx.request({
    //   url: 'https://locally.uieee.com/categories',
    //   method: 'GET',
    //   data: {

    //   },
    //   success: (res) => {
    //     console.log(res)
    //     this.data.navList = res.data;
    //     this.setData(this.data)
    //   }
    // })
    fetch({
      url:'slides'
    }).then(res=>{
      this.data.navList = res.data;
        this.setData(this.data)
    })
  },
   

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
