//引入
import { getSetting,chooseAddress,openSetting,showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    //获取缓存中的收货地址
    const address=wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let cart=wx.getStorageSync("cart")||[];
    //被选中商品的购物车数组
    cart=cart.filter(v=>v.checked);
    this.setData({address});
     //总价格,总数量计算
     let totalPrice=0;
     let totalNum=0;
     cart.forEach(v=>{
      totalPrice+=v.num*v.data.message.goods_price;
      totalNum+=v.num;
     })
     //赋值
     this.setData({
       cart,
       totalPrice,
       address,
       totalNum
     });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleOrderPay(){
    const token=wx.getStorageSync('token');
    if(!token){
        wx.navigateTo({url: '/pages/auth/index'})
        return;
    }
    
  }
})