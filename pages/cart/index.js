//引入
import { getSetting,chooseAddress,openSetting,showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    //获取缓存中的收货地址
    const address=wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart=wx.getStorageSync("cart")||[];
    this.setData({address});
    this.setCart(cart);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //收货地址
  async handleChooseAddress(){
    try{
       // 获取权限状态
     const res1=await getSetting();
     const scopeAddress=res1.authSetting["scope.address"];
     //判断状态
     if(scopeAddress===false){
      await openSetting();
     }
     const address=await chooseAddress();
     //存入缓存
     wx.setStorageSync("address", address);
    }catch(error){
      console.log(error);
    }
  },
  //商品选中
  handItemChange(e){
    const goods_id=e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart}=this.data;
    //寻找被修改的商品对象
    let index=cart.findIndex(v=>v.data.message.goods_id===goods_id);
    //选中状态取反
    cart[index].checked=!cart[index].checked;
    //将新数据重新设置会data和缓存中
    this.setCart(cart);

  },
  //设置购物车
  setCart(cart){
     //总价格,总数量计算
     let totalPrice=0;
     let totalNum=0;
     let allChecked=true;
     cart.forEach(v=>{
       if(v.checked){
         totalPrice+=v.num*v.data.message.goods_price;
         totalNum+=v.num
       }else{
         allChecked=false;
       } 
     })
     //判断数组是否为空
     allChecked=cart.length!=0?allChecked:false;
     //赋值
     this.setData({
       cart,
       allChecked,
       totalPrice,
       totalNum
     });
     wx.setStorageSync("cart", cart);
  },
  //商品全选和反选
  handleItemAllChenck(){
    //获取data的数据
    let {cart,allChecked}=this.data;
    //修改值
    allChecked=!allChecked;
    //循环修改cart数组
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  //商品数量修改
  handLeItemNumEdit(e){
    //获取传递来的参数
    const {operation,id}=e.currentTarget.dataset;
    //获取购物车数组
    let {cart}=this.data;
    //寻找需要修改的商品索引
    const index=cart.findIndex(v=>v.data.message.goods_id===id);
    //判断是否删除
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        title: '提示',
        content: '您是否要删除该商品？',
        success: (res)=> {
          if(res.confirm){
            cart.splice(index,1);
            this.setCart(cart);
          }else if (res.cancel){
            console.log('取消')
          }
        }
      })
    }else{
      //修改数量
    cart[index].num+=operation;
    //将数据存回缓存和data中
    this.setCart(cart);
    }
  },
  //结算功能
  async handlePay(){
    const {address,totalNum}=this.data;
    //判断是否有地址
    if(!address.userName){
      await showToast({title:"还没有选择收货地址"});
      return;
    }
    //判断购物车是否有商品
    if(totalNum===0){
      await showToast({title:"还没有选购商品"});
      return;
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})