//用户交易模块
import { reqAddressInfo, reqOrderInfo, reqSubmitOrder } from "@/api";

const state = {
    address: [],
    orderInfo: {},
};
const getters = {};
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data);
        }
    },
    //获取订单信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        console.log('trade111', result);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}