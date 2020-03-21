import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局使用 Toast 組件
import Toast from './pluging/toast';
Vue.use(Toast);  

// 全局 Alert 組件
import AlertTip from './components/AlertTip';
Vue.use(AlertTip); 

// 使用時間插件
Vue.use(require('vue-moment'));

import './assets/scss/index.scss'


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
