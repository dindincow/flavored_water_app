import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

import ProductEdit from './views/ProductEdit'
import ProductList from './views/ProductList'
import ProductCategoryList from './views/ProductCategoryList'
import Home from './views/Home'
import User from './views/User/User'
import OrderList from './views/OrderList'
import BannerList from './views/BannerList'
import BannerEdit from './views/BannerEdit'
import ActiveList from './views/ActiveList'
import ActiveEdit from './views/ActiveEdit'


Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'main',
            redirect:'home',
            component: Main,
            children: [
                // home
                {
                    path: 'home',
                    name: 'home',
                    component: Home,  
                },
                // 產品
                {
                    path: '/products/categoryList',
                    name: 'productSortList',
                    component: ProductCategoryList,
                },
                {
                    path: '/products/create',
                    name: 'productCreate',
                    component: ProductEdit,
                }, {
                    path: '/products/list',
                    name: 'productList',
                    component: ProductList,
                }, {
                    path: '/products/edit/:id',
                    name: 'productEdit',
                    component: ProductEdit,
                    props: true //可把 url 參數注入到  CategoryEdit 裡面
                },
                // 使用著
                {
                    path: '/user/list',
                    name: 'userList',
                    component: User,
                    meta:["會員管理","會員列表"]
                },
                // 訂單
                {
                    path: '/order/list',
                    name: 'orderList',
                    component: OrderList,
                },
               
                // 廣告管理
                {
                    path: '/banner/list',
                    name: 'bannerList',
                    component: BannerList,
                    meta:["廣告管理","廣告列表"]
                },
                {
                    path: '/banner/edit/:id',
                    name: 'bannerEdit',
                    component: BannerEdit,
                    props: true,
                    meta:["廣告管理","編輯廣告"]
                },
                {
                    path: '/banner/create',
                    name: 'bannerCreate',
                    component: BannerEdit,
                    meta:["廣告管理","新增"],
                },

                // 活動
                {
                    path: '/active/list',
                    name: 'activeList',
                    component: ActiveList,
                    props: true
                },
                {
                    path: '/active/edit/:id',
                    name: 'activeEdit',
                    component: ActiveEdit,
                    props: true,
                },
                {
                    path: '/active/create',
                    name: 'activeCreate',
                    component: ActiveEdit,
                }
            ]
        },

    ]
})
