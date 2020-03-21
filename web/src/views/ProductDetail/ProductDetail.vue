<template>
    <div class="product-detail">
        <!--header-->
        <HeaderTop title="商品詳情">
            <div class="header-back" slot="left" @click="$router.back(-1)">
                <i class="iconfont icon-arrow-left-c"></i>    
            </div>
        </HeaderTop>

        <!--banner-->
        <div class="banner">
            <img :src="productDetail.img" /> 
        </div>

        <!---主體內容-->
        <div class="content">
            <h4><i class="iconfont icon-leaf_ea_ether"></i>漢方養身茶</h4>
            <h3>{{productDetail.name}}</h3>
            <div class="desc">{{productDetail.desc}}</div>

            <div class="price">
                <!-- <span>售 價</span> -->
                <p class="new-price">NT. {{productDetail.discountPrice}}</p>
                <p class="old-price">NT. {{productDetail.price}}</p>
            </div>
            <div class="buyBox">
               <select v-model="number">
                    <option value ="1">1</option>
                    <option value ="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button class="btn" @click="onAddCart(productDetail._id)">加入購物車</button>
            </div> 
        </div>
        <div class="content-info" v-if="productDetail.detail">
            <h3> 商品資訊</h3>
            <div v-html="productDetail.detail" class="info-text"></div>
        </div>
        <!-- <ShopCart></ShopCart> -->
       
    </div>
</template>

<script>

import { getProductDetail } from '@/api/index'
// import ShopCart from '@/components/ShopCart/ShopCart'
import HeaderTop from "@/components/HeadTop/HeadTop";


export default {
    components:{
       HeaderTop,
    //    ShopCart
    },
  
    data(){
        return{
            productDetail:{},
            number:1,
        }
    },
    methods:{
        async getProductDetail(){
            const data = await getProductDetail(this.$route.params.id);
            this.productDetail = data;
        },
    
        onCollect: function(){
            console.log('收藏')
        },
        onCart: function(){
            this.backPage();
            this.$router.push({path: '/shopCart'}) 
        },
        onAddCart: function(id){
         
            let obj = {
                id:this.$store.state.userInfo._id,
                productId: id,
                quantity : parseInt(this.number)
            }
            this.$store.dispatch('addCart',obj) ;
        },

        onBuy: function(){
            this.backPage();
            this.$router.push({path: '/shopCart'})
        }
    },
  
    mounted() {
        this.getProductDetail()
    },
 
}
</script>

<style lang="scss" scoped>

.header-back{
    position: absolute;
    left: 0;
    color: #fff;
    i{
        font-size: 1.8rem;
        padding-left:.5rem; 
    }
}

.product-detail{
    background: #ccc;
    // position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 999;
    height: 100%;
    overflow: auto; 
    margin-bottom: 3.142857rem;

    .banner{
        background: #fff;
        text-align: center;
    }
    .content{
        background: #fff;
        padding: 10px 25px;
        border-bottom: 1px solid #ccc;
        h3{
            font-size:1.3rem;
            padding: 15px 0;
            border-bottom: 1px solid #ccc;
        }
        h4{
            padding: 10px 0 0;
            color: #658f38;
            letter-spacing: 1px;
        }
        .desc{
            font-size: 14px;
            color: #5f5f5f;
            line-height: 24px;
            margin: 10px 0;
            text-align:justify;
        }
        .price{
            display: flex;
            align-items: center;
            .new-price{
                color: #f01326;
                font-size: 20px;
                margin-right:10px; 
            }
            .old-price{
                color: #c1bebe;
                font-size: 20px;
                text-decoration: line-through;
            }

        }
        
        .buyBox{
            margin: 15px 0;
            border-top: 1px dashed #ccc;
            padding-top: 15px;
            display: flex;
            justify-content: flex-end;
            .btn{
                width: 150px;
                margin-left: 15px;
                font-size: 14px;
                letter-spacing: 1px;
                background-color: #658f38;
                border: 1px solid #658f38;
                color: #fff;
            }
        }
    }

    .content-info{
        background: #fff;
        padding: 15px 20px 50px 20px;
        h3{
            font-size:1.2rem;
            padding: 5px 5px
        
        }
        .info-text{
            line-height: 1.5rem;
            color: #747674;
        }
    }

}

</style>
