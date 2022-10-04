import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail.js'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade
  }
})
