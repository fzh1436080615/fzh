//引入
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    //商品对象
    GoodsInfo:{}, 
    // 商品是否被收藏
    isCollect:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPages = pages[pages.length - 1];
    let options = currentPages.options;
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    this.data.GoodsInfo=goodsObj;
    //获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    let isCollect=collect.some(v=>v.goods_id===this.data.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:goodsObj.data.message.goods_name,
        goods_price:goodsObj.data.message.goods_price,
        //图片识别问题解决.replace(/\.webp/g,'.jpg')
        goods_introduce:goodsObj.data.message.goods_introduce,
        pics:goodsObj.data.message.pics
      },
      isCollect
    });
    
  },
  //浏览大图
  handlePrevewImage(e){
    //构造图片数组
    const urls= this.data.GoodsInfo.data.message.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  //加入购物车
  handleCartAdd(){
    //获取缓存中的购物车数组
    let cart=wx.getStorageSync("cart")||[];
    //判断商品是否存在于购物车中
    let index=cart.findIndex(v=>v.data.message.goods_id===this.data.GoodsInfo.data.message.goods_id);
    console.log(index);
    if(index===-1){
      this.data.GoodsInfo.num=1;
      this.data.GoodsInfo.checked=true;
      cart.push(this.data.GoodsInfo);
    }else{
      cart[index].num++;
    }
    //将购物车重新添加会缓存
    wx.setStorageSync("cart", cart);
    //弹窗
    wx.showToast({
      title: '成功加入购物车',
      icon: 'success',
      mask: true
    });
  },
  // 点击 商品收藏图标
  handleCollect(){
    let isCollect=false;
    // 1 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    // 2 判断该商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.data.GoodsInfo.goods_id);
    // 3 当index！=-1表示 已经收藏过 
    if(index!==-1){
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
        
    }else{
      // 没有收藏过
      collect.push(this.data.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })
      
      
  }
})