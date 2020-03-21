<template>
    <div class="footer_guide">

         <router-link to="/home"
            class="guide_item">
            <span class="item_icon">
                <i class="iconfont icon-shop"></i>
            </span>
            <span>首頁</span>
        </router-link>

        <router-link to="/shop"
            class="guide_item">
            <span class="item_icon">
                <i class="iconfont icon-product"></i>
            </span>
            <span>商品</span>
        </router-link>

        <router-link to="/cart"
            class="guide_item shopCatr">
            <span class="amount">{{toalCount}}</span>
            <span class="item_icon">
                <i class="iconfont icon-cart"></i>
            </span>
            <span>購物車</span>
        </router-link>

        <router-link to="/order"
            class="guide_item">
            <span class="item_icon">
                <i class="iconfont icon-order"></i>
            </span>
            <span>訂單</span>
        </router-link>

        <router-link to="/me"
            class="guide_item">
            <span class="item_icon">
                <i class="iconfont icon-me"></i>
            </span>
            <span>我的</span>
        </router-link>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'footerGuide',
    methods:{
        goto(path){
            this.$router.replace(path)
        }
    },
    computed:{
        ...mapGetters(['toalCount'])
    }
}
</script>

<style lang="scss" scoped>

.footer_guide{
    border-top: 1px solid #ccc;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    .guide_item{
        display: flex;
        flex: 1;
        text-align: center;
        flex-direction: column;
        align-items: center; 
        margin: 5px;
        color: #999999;
        &.router-link-active{
            color: #02a774;
        }
           
        &.on{
            color: #02a774;
        }
           
        span{
            font-size: 12px;
            margin-top: 2px;
            margin-bottom: 2px;
        }
           
        .iconfont{
            font-size: 22px;
        }
            
    }
}
.shopCatr{
    position: relative;
}
.amount{
    padding: 0.2rem 0.4rem;
    display: block;
    background: red;
    position: absolute;
    top: -0.3125rem;
    color: #fff;
    border-radius: 10px;
    right: .225rem;
}


    
</style>