// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     Listdata:[],
     id:'',
     page:1,
     pagesize:10,
     hasMore:'',
     total:"80",
     name:''
  },
   getListdata(){
     let {id,page,pagesize} = this.data;
     wx.request({
       url:'https://locally.uieee.com/categories/${id}/shops?page=${page}&pagesize=${pagesize}',
        method:'GET',
        success:(res)=>{
          console.log(res)
          this.data.Listdata = res.data;
          this.setData(this.data)
        }
     });
     if (page < Math.ceil(this.data.total / this.data.pagesize)) {
       this.data.hasMore = true
     } else {
       this.data.hasMore = false
     }
   },
  onReachBottom(){
     this.data.current=page++;
     this.setData(this.data);
     this.getListdata();
  },
  onPullDownRefresh(){
    this.data.page=1;
    this.data.Listdata=[];
    this.setData(this.data);
    this.getListdata();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query){
    console.log(query)
    console.log(query.id)
    console.log(query.name)
    this.data.id = query.id;
    this.data.name=query.name
    this.setData(this.data)
    this.getListdata();
  },
  onReady(){
    wx.setNavigationBarTitle({
      title: this.data.name
    })
  },
  // onLoad: function (options) {
  // // this.getListdata();
  //   console.log(options.id)
  //  this.id = options.id;
  //  this.setData(this.data)
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {

  // },

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