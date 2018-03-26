
import Vue from 'vue'
import App from './App'
import WinningUI from 'winning-ui'
//import 'winning-ui/lib/theme-default/index.css'
import '../theme/index.css'
import './styles/common.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


//注释涉及换肤
import routes from './routes'
import Mock from './mock'
Mock.ajaxhook();//拦截所有ajax请求



Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(WinningUI)


NProgress.configure({ showSpinner: false });
const router = new VueRouter({
  routes:routes
})
NProgress.start();
router.push({ path: 'main' })
router.go(-1)
NProgress.done();
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

