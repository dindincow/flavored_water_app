<template>
    <div class="HotSell">
        <div class="HotSellWrapper">
            <div class="HotSellItem" v-for="(item,index) in hotProducts" :key="index" @click="productClick(item._id)">
                <div class="HotSellItem-img">
                    <img :src="item.img">
                </div>
                <div class="HotSellItem-info">
                    <div>{{item.name}}</div>
                    <div class="buy">
                        <span class="price">NT.{{item.price}}</span>
                        <button class="buy-button" @click.stop="addCart(item._id)"><i class="iconfont icon-cart"></i> </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:{
        hotProducts: Array
    },
    
    methods:{
        productClick(productId){
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
    created() {
        // this.$http.get('/home/hotProducts')
        // .then(res=>{
        //     this.productList = res.data;
        // })
    },
    computed:{
        ...mapState(['userInfo'])
    }
}
</script>

<style lang="scss" scoped>
.HotSell{
    width: 100%;
    overflow: auto;
    padding: 1.25rem 0;

    .HotSellWrapper{
        width: 40.625rem;
        display: flex;
        justify-content: space-around;
        flex-wrap: nowrap;
        overflow:scroll;

        .HotSellItem{
            width: 7.5rem;

            .HotSellItem-img{
                width: 7.5rem;
                border-radius: 10px;
                overflow: hidden;
            }
            .HotSellItem-info{
                font-size: .875rem;
                line-height: 1.1875rem;
                color: #474747;
                .price{
                    color: #ee4d4d;
                    font-weight: 600;
                }
                .buy{
                    margin-top: .3125rem;
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                }
            }
        }
    }
}





</style>
