//所有的api接口，进行统一的管理
import requests from './request'
//三级联动接口 /api/product/getBaseCategoryList get 无参数
import mockRequests from './mockAjax'

export const reqCategoryList = () => {
    //发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}

export const reqGetBannerList = () => mockRequests.get('/banner')
export const reqFloorList = () => mockRequests.get('/floor')
//获取搜索模块的数据 
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})
//获取detail模块的数据
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
//将产品添加到购物车中，更新够一个产品的个数
export const reqAddcart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
//获取购物车列表的接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });
//删除购物车产品的接口
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
//修改商品的选中状态
export const reqUpdateChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//获取验证码的接口
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
//注册接口  methods:post
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data });
//登录接口 methods:post phone password 
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, method: 'post', data });
//获取用户的信息，带着用户的token向服务器要用户信息 method：get
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });
//退出登录
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' });
//获取用户地址信息
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });
//获取交易界面信息
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });
//提交订单的请求
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });
//获取订单的信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
//获取订单支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });
//获取我的订单接口
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });    