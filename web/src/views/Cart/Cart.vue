<template>
    <div class="shopCart">   
        <HeadTop title="購物車"></HeadTop>

        <div class="cartList">
            <div class="cartItem" v-for="(item,index) in shopcartList" :key="index">
                <div class="cartItem-remove" @click="removeItem(item.shopCartItem._id)">
                    <i class="iconfont icon-trash"></i>
                </div>
                <div class="cartItem-img">
                    <img :src="item.detail.img"/>
                </div>
                <div class="cartItem-info">
                    <p class="name">{{item.detail.name}}</p>
                    <p class="price">
                        <span class="unit-price">{{item.detail.discountPrice}}/件</span>
                        <CartControl 
                            :count="item.shopCartItem.quantity"
                            :productId = "item.shopCartItem.productId"
                            >
                        </CartControl>
                    </p>
                </div>
                
                <div class="cartItem-amount">{{item.totalItemPrice}}</div>
            </div>
            <div class="noProduct" v-if="shopcartList.length == 0">
                <div class="noProduct-img">
                     <img src="../../assets/images/noShopping.png"/>
                </div>
                <div class="text">購物車目前沒有商品唷!</div>
                <router-link to="/" tag="button" class="button">
                    去逛逛吧
                </router-link>
                <!-- <button type="button" class="button">去逛逛吧</button> -->
            </div>
        </div>

        <div class="price-total">
            <span class="moeny">總價: $ {{toalPrice}}</span>
            <button type="button" class="check-button" @click="goCheckout">去結帳</button>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import HeadTop from '@/components/HeadTop/HeadTop';
import CartControl from "@/components/CartControl/CartControl";
export default {
    components:{
        HeadTop,
        CartControl
    },
    data(){
        return{
           
        }
    },
    methods: {
        goCheckout(){
            const obj ={
                userId:this.userInfo._id,
                products:this.userInfo.shoppingCart,
                totals:this.toalPrice
            }
            if(obj.totals===0 || obj.totals<0){
                alert("你沒買西喔")
                return false;
            }
            this.$store.dispatch('goCheckout',obj)
            this.$router.push(`/checkFinshed`)
        },
        removeItem(id){
             const obj ={
                userId:this.userInfo._id,
                shopCartItemId:id,  
            }
            this.$store.dispatch('deleteCartItem',obj);
            this.$store.dispatch('getCartList',this.userInfo._id)
        }

    },
    
    mounted(){
        this.$store.dispatch('getCartList',this.userInfo._id)
    },
    computed: {
        ...mapState(['userInfo','shopcartList']),
        ...mapGetters(['toalPrice'])
    }
   
}
</script>

<style lang="scss" scoped>
.shopCart{ 
    padding-top:2.8rem;
    .cartItem{
        display: flex;
        padding: .625rem 1rem;
        align-items: center;
        border-bottom: 1px solid #e3e2e2;
        .cartItem-remove{
            padding-right: .5rem;
        }
        .cartItem-img{
            width:4.5rem;
        }
        .cartItem-info{
            padding: 0 .3125rem;
            width: 6.875rem;
            border-right: 1px solid #d1d1d1;
            flex:1;
            .name{
                font-size: .9375rem;
            }
            .price{
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                .unit-price{
                    font-size: .8125rem;
                }
                
            }
        }
        .cartItem-amount{
            padding-left:.625rem;
            color: #ee554a;
            font-weight: bolder;
        }
    }

    .price-total{
        display: flex;
        width: 100%;
        background: #d0dbd0;
        align-items: center;
        position: fixed;
        bottom: 50px;
        justify-content: space-between;
        .moeny{
            padding-left:1.25rem;
        }
       
    }
}

.noProduct{
    text-align: center;
    .noProduct-img{
        width: 30%;
        margin: 7rem auto 3rem auto;
    }
    .text{
        margin-bottom: 1.3rem;
    }
}

.button{
    font-size: 0.8rem;
    padding: 0.5em 1em;
    width: 30%;
    color: #fff;
    border: none rgba(0, 0, 0, 0);
    background-color: #71a28d;
    border-radius: 20px;
    outline: none; 
}

.check-button{
    font-size: 0.8rem;
    padding: 1em 2.5em;
    color: #fff;
    border: none rgba(0, 0, 0, 0);
    background-color: #71a28d;
    outline: none;
}

</style>
