import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './views/Home/TypeNav/index.vue'
import Carousel from './components/Carousel/index.vue'
import "@/mock/mockServe"
import 'swiper/css/swiper.css'
import Pagination from './components/Pagination/index.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import kejor from '@/assets/images/kejor.jpg'

Vue.use(VueLazyload, {
  loading: kejor
})
Vue.use(ElementUI);

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App)
}).$mount('#app')
