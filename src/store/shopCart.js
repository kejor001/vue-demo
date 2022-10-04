import { reqCartList, reqDeleteCart, reqUpdateChecked } from "@/api";

const state = {
    cartList: []
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    //获取购物车列表的数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETCARTLIST', result.data);
        }
    },
    //删除购物车产品
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code == 200) {
            return 'fuck';
        } else {
            return Promise(new Error('you'));
        }
    },
    //修改购物车选中的状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked);
        if (result.code == 200) {
            return "fuck"
        } else {
            // return Promise.reject(new Error('you'));
        }
    },
    //删除选中的全部商品
    deleteAllInfo({ dispatch, getters }) {
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : '';
            PromiseAll.push(promise);
        });
        //只要全部的promise成功返回为成功，如果有一个失败返回的就是失败
        return Promise.all(PromiseAll);
    },
    updateAllCart({ dispatch, state }, checked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateChecked', { skuId: item.skuId, checked });
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}