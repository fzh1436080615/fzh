//引入
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
  ],
  goodsList:[]
  },
  
  //接口参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,

  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },

  //获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    //获取total
    const total=res.data.message.total;
    //计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      //数组拼接
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
    //关闭下拉刷新窗口
    wx.stopPullDownRefresh();
  },

  //标题点击事件
  bandletabsItemChange(e){
    //获取标题索引
    const {index}=e.detail;
    //修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //赋值
    this.setData({
      tabs
    })
  },
  //滚动条触底事件
  onReachBottom(){
    //判断是否存在下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({title: '没有商品了', icon: 'loading', duration: 1000})
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  //下拉刷新事件
  onPullDownRefresh(){
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1;
    //重新发送请求
    this.getGoodsList();
  }
})