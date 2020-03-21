<template>
    <div class="home">
        <!--首頁頭部-->
        <HeaderTop title="FavoWater">
            <router-link to="/" tag="div" class="header-login" slot="right">
                <span class="header-login-text" v-if="!userInfo.account"> 登入</span>
                <i class="iconfont icon-user-copy usericon" v-else></i>     
            </router-link>
        </HeaderTop>

         <!--首頁輪撥-->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(banner,index) in banners" :key="index">
                    <img :src="banner.img">
                </div>
            </div>
            <!-- 分頁 -->
            <div class="swiper-pagination"></div>
        </div>

        <!--分類選單-->
        <Category></Category>

        <!--拿紅包-->
        <div class="getRed" @click="isShowRedPopup = true">
            <img src="../../assets/images/getRed.png">
        </div>

        <!--特別訊息-->
        <!-- <div class="specail">
            <img src="../../assets/images/special.jpg">
        </div> -->

         <!--為你推薦-->
        <Title titleName="為您推薦"></Title>
        <div class="recommend">
           <ProductItem v-for="item in recommendList" :product="item" :key="item.id"></ProductItem>
        </div>

        <!--熱門商品-->
        <Title titleName="熱門商品"></Title>
        <HotSell :hotProducts="hotProducts"></HotSell>

        <!--拿紅包POPUPBOX-->
        <transition name="fade">
            <RedPopupTip v-show="isShowRedPopup" @closeRedPopup="closeRedPopup"></RedPopupTip>
        </transition>

    </div>
</template>

<script>
import {mapState} from 'vuex';
import { getBanners,getRecommend,getHotProducts } from '@/api/index';
import HeaderTop from "@/components/HeadTop/HeadTop";
import Category from "@/components/Category/Category";
import Title from "@/components/Title/Title";
import ProductItem from "@/components/ProductItem/ProductItem";
import HotSell from "@/components/HotSell/HotSell";
import RedPopupTip from "@/components/RedPopupTip/RedPopupTip";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
    components: {
        HeaderTop,
        Category,
        Title,
        ProductItem,
        HotSell,
        RedPopupTip
    },
    data(){
        return{
            isProductDetailShow:false,
            banners:[],
            recommendList:[],
            hotProducts:[],
            isShowRedPopup:false
        }
    }, 
    methods:{
        async getInitData(){
            const bannerData = await getBanners();
            const recommendData = await getRecommend();
            const hotProductsData = await getHotProducts();

            this.banners = bannerData;
            this.recommendList = recommendData;
            this.hotProducts = hotProductsData;  
        },

        closeRedPopup(){
            this.isShowRedPopup = false;
        }
    },
    mounted() {
        this.getInitData();
    },
    watch:{
        banners(){
            // 畫面更新後，再立即調用 swiper
            this.$nextTick(()=>{
                new Swiper(".swiper-container", {
                    loop: true, 
                    pagination: {
                        el: ".swiper-pagination"
                    },
                });
            })
          
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
}
</script>
<style lang="scss" scoped>
.home{
    margin:3.5rem 0; 

    /* 輪撥圖*/
    .swiper-container {
        border-radius: 35px;
        width: 93%;
        overflow: hidden;
        margin: 50px auto 0 auto;

        img{
            width: 100%;
            height: inherit;
        }
    }

    /*拿紅包*/
    .getRed{
        padding: 10px 15px;
    }

    /*特別訊息*/
    .specail{
        padding: 0 15px 10px 15px
    }

    /*為您推薦*/
    .recommend{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: .65rem;
    }

}

/* 已經登入icon*/
.header-login{
    i{
        font-size: 1.2rem ;
    }
}


</style>