<template>
    <div class="product-item" @click="productClick(product._id)">
        <img class="product-item-img" :src="product.img" />
        <p class="title">{{product.name}}</p>
        <p class="other">
            <span class="now-price">${{product.discountPrice}}</span>
            <span class="old-price">${{product.price}}</span>
            <button class="buy-button" @click.stop="addCart(product._id)"><i class="iconfont icon-cart"></i> </button>
        </p>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "ProductItem",
    props: {
        product: Object
    },
    components:{
        
    },
    methods: {
        productClick(productId) { 
            this.$router.push(`/detail/${productId}`)
        },
        addCart(productId){
            if(!this.userInfo._id){
                alert('請先登入');
                return
            }
         
            this.$store.dispatch('addCart',{id:this.userInfo._id,productId})   
        }
    },
    data() {
        return {};
    },
    computed:{
        ...mapState(['userInfo'])
    }
};
</script>

<style lang="scss" scoped>
.product-item {
   width: 47%;
    /* border: 1px solid #e9eae8; */
    /* -webkit-box-shadow: 0px 0px 3px #dcdcdc; */
    /* box-shadow: 0px 0px 3px #dcdcdc; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 15px;
    
    img{
        width: 100%;
        border-radius: 10px;
    }
    .title {
        padding: 3px 5px 5px 5px;
        font-size: 15px;
        line-height: 19px;
        color: #474747;
        text-align: left;
        /* font-weight: bold; */
        letter-spacing: 1px;
    } 
    
    .other {
        margin-bottom: 10px;
        padding: 0 8px;  
        margin-bottom: 10px;
        padding: 0 8px;
        align-items: center;
        display: flex;

        .old-price {
            font-size: 15px;
            color: #c3c3c3;;
            margin-right: 10px;
            text-decoration: line-through;
            flex: 1;
        }
        .now-price {
            font-size: 1rem;
            color: #ee4d4d;
            font-weight: bold;
            margin-right: 7px;
        }

    }
}

</style>
