<template>
    <div class="cartcontrol">
        <div class="iconfont icon-reduce" @click.stop="reduceCount"></div>
        <div class="cart-count">{{count}}</div>
        <div class="iconfont icon-add" @click.stop="addCount"></div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:{
        count:Number,
        productId:String
    },
    data(){
        return{
            
        }
    },
    methods:{
        addCount(){
            const obj = {
                quantity:this.count+1,
                productId:this.productId,
                userId:this.userInfo._id
            }
            this.$store.dispatch('updateCount',obj)  
        },
        reduceCount(){
            if(this.count <=1){
                return
            }
            const obj = {
                quantity: this.count-1,
                productId:this.productId,
                userId:this.userInfo._id
            }
            this.$store.dispatch('updateCount',obj)  
        }
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style lang="scss" scoped>
.cartcontrol{
   .cart-decrease{
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
    }
    .icon-reduce{
        display: inline-block;
        padding :6px;
        line-height :22px;
        font-size :22px;
        color: green;
    }

    .cart-count{
        display: inline-block;
        vertical-align: top;
        // width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 1rem;
        color: rgb(0, 15, 29);
    }
    .icon-add{
        display: inline-block;
        padding: 6px;
        line-height: 22px;
        font-size: 22px;
        color: green  ;  
    }

}
    
   
   
    
</style>