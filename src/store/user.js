//登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken } from "@/utils/token";

const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
};
const getters = {};
const mutations = {
    GETCODE(state, code) {
        state.code = code
        // console.log(code);
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        localStorage.removeItem('TOKEN');
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码接口，把验证码返回，但是正常情况验证码发送到客户的手机上
        let result = await reqGetCode(phone);
        // console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return "ok";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            // console.log('login', result);
            return "ok"
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户登录 :一般登录成功服务器会下发token，前端持久化存储token，带着token找服务器要用户的信息进行展示
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        console.log(result);
        //用户成功登录，获取到token
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户的信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        console.log('userInfo', result);
        if (result.code == 200) {
            commit('GETUSERINFO', result.data);
        }
    },
    //用户退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit('CLEAR');
        }
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}