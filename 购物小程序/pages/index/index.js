//引入
import { request } from "../../request/index.js"
//Page Object
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    //楼层数据
    floorList:[]
  },
  onLoad: function(options){
    //发送异步请求,获取轮播图数据
    //  wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  //获取轮播图的数据
  getSwiperList(){
    request({ url: "/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  //获取导航数据
  getCatesList(){
    request({ url: "/home/catitems"})
    .then(result=>{
      this.setData({
        catesList:result.data.message
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({ url: "/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
  }
});