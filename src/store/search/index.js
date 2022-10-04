import { reqGetSearchInfo } from "@/api";
const state = {
    searchList: {},
};
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || [];
    }
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
        // console.log(result);
    }
};
export default {
    state,
    getters,
    mutations,
    actions
}