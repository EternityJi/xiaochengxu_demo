//index.js
const app = getApp()

Page({
  data: {
     list:[],
     temp:"111",
     unfinish:2,
    showclear:''
  },
  onShow(){
    this.data.list = wx.getStorageSync('list')||[]
    this.setData(this.data)
  },
// 删除
  del(e){
    let id = e.currentTarget.dataset.id;
    console.log(id)
    let idx = this.data.list.findIndex(item=>item.id==id)
    this.data.list.splice(idx,1)
    this.setData(this.data)
    // this.getunfinish()
   this.common()
  },
  change(e){
   let id = e.currentTarget.dataset.id;
   console.log(id)
   let name = this.data.list.find(item=>item.id==id);
   name.completed=!name.completed
   this.setData(this.data)
    // this.getunfinish()
    // this.getshowclear();
    this.common()
  },
  get(e){
    // temp = e.detail.value;
    // console.log(e)
     this.setData({
       temp: e.detail.value
     })
    // this.getunfinish()
    this.common()
  },
  finish(){
    this.data.list.push({
      id: +new Date(),
      name: this.data.temp,
      completed: false
    })
    this.data.temp=""
    this.setData(this.data)
    // this.getunfinish()
    this.common()
  },
  click(){
    console.log(111)
   let flag = this.data.list.some(item=>!item.completed)
     if(flag){
        this.data.list.forEach(item=>item.completed=true)
     }else{
       this.data.list.forEach(item => item.completed = false)
     }
     this.setData(this.data)
    // this.getunfinish()
    this.common()
  },
  clearall(){
     this.data.list=this.data.list.filter(item=>!item.completed);
     this.setData(this.data)
    this.common()
  },
  getunfinish(){
    this.data.unfinish=this.data.list.filter(item=>{
      item.completed = false
    }).length
    this.setData(this.data)
    this.common()
  },
  getshowclear(){
   this.data.showclear = this.data.list.some(item=>item.completed)
    this.common()
  },
  common(){
    wx.setStorageSync('list',this.data.list)
  }
})
