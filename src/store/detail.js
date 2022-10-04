import { reqGoodsInfo, reqAddcart } from "@/api";
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodInfo: {},
    uuid_token: getUUID()
};
const getters = {
    //路径导航的简化数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    skuSaleAttrList(state) {
        return state.goodInfo.skuInfo.skuSaleAttrValueList || [];
    }
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
};
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        console.log(result);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);
        }
    },
    //将产品添加到购物车中去
    async addShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddcart(skuId, skuNum);
        // console.log(result);
        if (result.code == 200) {
            return 'fuck'
        } else {
            //加入购物车失败
            return Promise.reject(new Error('you'));
        }
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}