import Vue from 'vue'
import App from './App.vue'
import VCharts from 'v-charts'
import router from './router'
import store from './store'
import http from './http'
import './plugins/element.js'

// 引入 css
import '@/assets/css/customiz.css';
import '@/assets/iconfont/iconfont.css';


// 使用時間插件
Vue.use(require('vue-moment'));
Vue.use(VCharts)

Vue.config.productionTip = false
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
