import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
};
const getters = {};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data);
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}