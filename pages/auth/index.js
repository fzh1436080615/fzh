//引入
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {login} from '../../utils/asyncWx.js';
Page({
  //获取用户信息
  async hendlegetUserInfo(e){
    try {
      // 获取用户信息
      const {encryptedData, iv, rawData, signature} = e.detail;
      //获取小程序登入成功后的code
      const code = await login();
      // 发生请求获取用户token值
      const loginParams={ encryptedData, rawData, iv, signature ,code};
      const {token}=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
      wx.setStorageSync('token',toekn);
      wx.navigateBack({delta:1})
    } catch (error) {
      console.log(error)
    }
  }
})