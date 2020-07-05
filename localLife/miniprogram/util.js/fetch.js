const BASE_URL = 'https://locally.uieee.com/'
export default function fetch(options){
  return new Promise (function(resolve,reject){
      wx.request({
        url:BASE_URL+options.url,
        method:options.method|| 'GET',
        data:options.data || {},
        success:function(res){
          resolve(res) 
        },
        fail:function(err){
          reject(err)
        }
      })
  })
}