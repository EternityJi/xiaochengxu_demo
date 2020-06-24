// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
     { id:1,name:'吃饭'},
     {id:2,name:'睡觉'},
     {id:3,name:"打豆豆"}
    ]
  },
  add(){
     this.data.list.push({
       id:+new Date(),
       name:'敲代码'
     })
     this.setData(this.data)
  },
del(e){
  let id = e.currentTarget.dataset.id;
  let idx = this.data.list.findIndex(item=>item.id==id)
  console.log(id)
   this.data.list.splice(idx,1)
   this.setData(this.data)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111)
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
    console.log(222)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide')
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