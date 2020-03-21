import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import Home from '@/views/Home/Home'
import Shop from '@/views/Shop/Shop'
import Cart from '@/views/Cart/Cart'
import Search from '@/views/Search/Search'
import Order from '@/views/Order/Order'
import Me from '@/views/Me/Me'
import ProductDetail from '@/views/ProductDetail/ProductDetail'
import NoAuthority from '@/views/NeedLogin/NeedLogin'
import PageNotFound from '@/views/404Page/404Page'
import Actives from '@/views/Actives/Actives'
import ActivesDetail from '@/views/ActivesDetail/ActivesDetail'
import CheckFinshed from '@/views/CheckFinshed/CheckFinshed'


Vue.use(Router)

var router =  new Router({
    routes: [
        // 登入
        {
            path: '/login',
            component: Login,
            
        },
        
        {
            path: '/',
            redirect: '/home', 
        },
    
        // 首頁
        {
            path: '/home', 
            component:Home
        },
    
        // 商店
        {
            path: '/shop', 
            component:Shop
        },
    
        // 購物車
        {
            path: '/cart', 
            component:Cart
        },
    
        // 搜尋
        {
            path: '/search', 
            component:Search
        },
    
        // 訂單
        {
            path: '/order', 
            component:Order
        },
    
        // 我的
        {
            path: '/me', 
            component:Me
        },
    
        // 商品詳情
        {
            path: '/detail/:id', 
            component:ProductDetail
        },
        // 活動列表
        {
            path: '/actives', 
            component:Actives
        },
        // 活動列表詳情
        {
            path: '/actives/:id', 
            component:ActivesDetail
        },

        // 沒權限頁
        {
            path: '/noAuthority', 
            component:NoAuthority
        },

        // 購物結帳完成
        {
            path: '/checkFinshed',
            name:'CheckFinshed',
            component:CheckFinshed
        },

         // 404
        {
            path: '*',
            name:'404',
            component:PageNotFound
        },

         
    ]
})

router.beforeEach((to,from,next)=>{
    var isLogin = localStorage.token ? true : false;
    if(to.path=='/me' || to.path=='/order' || to.path=='/cart'){
        if(isLogin){
            next()
        }else{
            next('/noAuthority')
        }
       
        // isLogin ? next():next('/login');
    }else{
        next();
    }
})

export default router
