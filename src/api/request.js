import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
import store from "@/store";
//对axios二次封装

//1.利用axios的方法create，创建一个axios实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

//请求拦截器：再发请求之前拦截器可以检测到，做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象   对象里面有一个重要的属性headers
    //进度条开始动
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    nProgress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //请求成功发的回调函数，请求到数据之后，做的事情
    //进度条结束
    nProgress.done();
    return res.data
}, (err) => {
    //请求失败的回调函数，
})

export default requests;