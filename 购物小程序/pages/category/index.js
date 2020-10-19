//引入
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    //菜单数据
    leftMenuList:[],
    //商品数据
    rightContent:[],
    //点击菜单
    currentIndex:0,
    //商品列表滚动条顶部距离
    scrollTop:0
  },
  //接口的返回数据
  Cates:[],

  onLoad: function (options) {
    //缓存 获取本地存储数据
    const Cates = wx.getStorageSync("cates");
    //判断
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>100000){//定义过期时间
        this.getCates();//重新发送请求
      }else{
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    // this.getCates();
  },
  //1获取分类数据
  async getCates(){
    // request({
    //   url: "/categories"
    // })
    // .then(res => {
    //   this.Cates=res.data.message;

    //   //将接口数据存入本地存储中
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

    //   //构造菜单数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   //构造商品数据
    //   let rightContent=this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    //使用es7的async
    const res=await request({url:"/categories"});
    this.Cates=res.data.message;
      //将接口数据存入本地存储中
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      //构造菜单数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      //构造商品数据
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //菜单点击事件
  handleItemTap(e){
    // 获取标题索引
    const {index}=e.currentTarget.dataset;
    
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //重新设置商品列表滚动条与顶部距离
      scrollTop:0
    })
  }

})