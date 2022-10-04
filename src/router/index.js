import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
const Home = () => import('../views/Home/index.vue')
const Search = () => import('../views/Search/index.vue')
const Login = () => import('../views/Login/index.vue')
const Register = () => import('../views/Register/index.vue')
const Deatil = () => import('../views/Detail/index.vue')
const AddCartSuccess = () => import('../views/AddCartSuccess/index.vue')
const ShopCart = () => import('../views/ShopCart/index.vue')
const Trade = () => import('../views/Trade/index.vue')
const Pay = () => import('../views/Pay/index.vue')
const PaySuccess = () => import('../views/PaySuccess/index.vue')
const Center = () => import('../views/Center/index.vue');
//引入二级路由
const MyOrder = () => import('../views/Center/myOrder/index.vue')
const GroupOrder = () => import('../views/Center/groupOrder/index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      show: true
    }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: {
      show: true
    },
    name: 'search'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      show: false
    }
  },
  {
    path: '/register',
    component: Register,
    show: false
  },
  {
    path: '/detail/:skuId?',
    component: Deatil,
    name: 'detail',
    meta: {
      show: true
    }
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    name: 'addcartsuccess',
    meta: {
      show: true
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    name: 'shopcart',
    meta: {
      show: true
    }
  },
  {
    path: '/trade',
    component: Trade,
    meta: {
      show: true
    },
    name: 'trade',
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    meta: {
      show: true
    },
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    meta: {
      show: true
    },
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: '/center',
    name: 'center',
    mata: {
      show: true
    },
    component: Center,
    children: [
      {
        path: 'myorder',
        component: MyOrder,
        name: 'myorder'
      },
      {
        path: 'grouporder',
        component: GroupOrder,
        name: 'grouporder'
      },
      {
        path: '/',
        redirect: 'myorder'
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  // next();
  //用户登录了才会有token，没登录不会有token
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    //用户登录之后，无法再去login界面
    next();
    if (to.path == '/login' || to.path == '/register') {
      next('/');
    } else {
      //登录了，去的不是login
      if (name) {
        next();
      } else {
        //没有用户信息，派发action
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          //token失效了 清除token，
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {
    //没登录 不能去交易相关，支付相关，个人中心
    //去的不是上述的路由放行
    let toPath = to.path;
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }
})

export default router
