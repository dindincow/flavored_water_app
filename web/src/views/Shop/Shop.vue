<template>
    <div class="product">
        <HeaderTop title="全部商品"></HeaderTop>
        <!-- 搜尋 -->
        <!-- <div class="search">
           <input type="text" name="fname" class="input-circle"/>
        </div> -->

        <div class="ad">
            <img src="../../assets/images/ad.jpg">
        </div>
      
        <div class="goods">
            <!-- 右側選單 -->
            <div class="menu-wrapper">
                <ul>
                <!-- current -->
                    <li
                        class="menu-item"
                        v-for="(category,index) in allProducts"
                        :key="index"
                        :class="{current:index===currentIndex}"
                        @click="clickMenuItem(index)"
                        >
                        <span class="text">{{category.name}}</span>
                    </li>
                </ul>
            </div>

            <!-- 左邊展示 -->
            <div class="foods-wrapper">
                <ul ref="foodsUl">
                    <li class="food-list-hook" v-for="(category,index) in allProducts" :key="index">
                        <h1 class="title">{{category.name}}</h1>
                        <ul>
                            <li class="food-item"
                                v-for="(item,index) in category.productsList"
                                :key="index"
                                @click="productClick(item._id)"
                            >
                                <div class="icon">
                                    <img width="57" height="57" :src="item.img" />
                                </div>
                                <div class="content">
                                    <h2 class="name">{{item.name}}</h2>
                                    <!-- <p class="desc">{{item.desc}}</p> -->
                                    <div class="priceBox">
                                        <div class="price">
                                            <span class="now">￥{{item.discountPrice}}</span>
                                            <span class="old" v-if="item.price">￥{{item.price}}</span>
                                        </div>
                                        <div class="cartcontrol-wrapper">
                                            <div  class="wishBtn" @click.stop="changeWishStatus(item._id)">
                                                <i :class="iconStyle(item._id)" class="like-icon"></i>
                                            
                                            </div>
                                            <button class="buy-button" @click.stop="addCart(item._id)"><i class="iconfont icon-cart"></i> </button>
                                            <!-- <CartControl :food="item"></CartControl> -->
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import HeaderTop from "@/components/HeadTop/HeadTop";
// import CartControl from "@/components/CartControl/CartControl";
import BScroll from 'better-scroll'
export default {
    components:{
        HeaderTop,
        // CartControl
    },
    data() {
        return {
            scrollY: 0, // 右側滑動時的當前座標(滑動過程時時變化)

            // 右側分類 Li 的 TOP 值組成的數組(列表第1次顯示後就不在變化)
            tops: [],
            getProducts:[]
        
        };
    },
    methods:{
        iconStyle(productId){
            console.log('productId',productId)
           
            // 先判斷是否登入,就把喜歡的撈出來
            if(this.userInfo.wish){
                const isWish = this.userInfo.wish.find(item=>{
                    return item.productId === productId
                })

                console.log('isWish==>',isWish)

                if(isWish){
                    return 'iconfont icon-licke-c';
                }else{
                    return 'iconfont icon-licke';
                } 
            }
            return 'iconfont icon-licke';
        },
        addCart(productId){

            if(!this.userInfo._id){
                alert('請先登入');
                return
            }
            this.$store.dispatch('addCart',{id:this.userInfo._id,productId})   
        },
        productClick(productId) {
            this.$router.push(`/detail/${productId}`)
        },

        changeWishStatus(productId){
            if(!this.userInfo._id){
                alert('請先登入');
                return
            }
           
            const data={
                userId :this.userInfo._id,
                wishes:productId
            }

            this.$store.dispatch('changeWishStatus',data)   
        },
        
        clickMenuItem(index){
            const y = -this.tops[index]
            this.scrollY = y;
            this.foodsScroll.scrollTo(0, y, 300,'bounce')
        },
        initScroll(){
            // 列表顯示後創件
            new BScroll('.menu-wrapper',{click:true});
            this.foodsScroll = new BScroll('.foods-wrapper',{
                probeType:2,// probeType:3 隨時監聽當時位子
                click:true
                
            });

            // 給右側列表綁定scroll 監聽
            this.foodsScroll.on('scroll',({y})=>{
                this.scrollY = Math.abs(y)
            })

            // 給右側滾動結束後的監聽型為 ，配合 probeType:2
            this.foodsScroll.on('scrollEnd',({y})=>{
                this.scrollY = Math.abs(y)
            })
        },
        initTops(){
            // 找所有分類的li
            const tops=[];
            let top=0
            tops.push(top)  
            const lis = this.$refs.foodsUl.children;

            lis.forEach(li => {
                top = top + li.clientHeight;
                tops.push(top)
            });
            console.log('tops',tops)
            this.tops = tops; 
        }     
    },
    mounted(){
        this.$store.dispatch('getProducts',()=>{
            this.initScroll();
            this.initTops();
        })

    },
    computed: {
        ...mapState(['allProducts','userInfo']),
        // 計算得到當前分類的下標
        currentIndex(){
            const {scrollY,tops} = this;
            const index = tops.findIndex((top,index)=>{
                return scrollY >= top && scrollY < tops[index+1]
            })
            return index;
        }
    }
}
</script>
<style lang="scss" scoped>

.search{
    width: 90%;
    margin: .5rem auto;
    input{
        width: 90%;
    }
}

.product{
    /* 廣告 */
    .ad{
        margin-top:3.125rem; 
    }

    /* 商品 */
    .goods {
        display: flex;
        position: absolute;
        top: 195px;
        bottom: 46px;
        width: 100%;
        background: #fff;
        overflow: hidden;

        /* 商品分類選單 */
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            .menu-item {
                display: table;
                height: 54px;
                width: 56px;
                padding: 0 12px;
                line-height: 14px;
                &.current {
                    position: relative;
                    z-index: 10;
                    margin-top: -1px;
                    background: #fff;
                    color: green;
                    font-weight: 700;
                    .text {
                        border: none;
                    }
                }

                .text {
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    border-bottom: #ccc 1px solid;
                    font-size: 12px;
                }
            }
        }

        .foods-wrapper {
            flex: 1;
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
            }

            .food-item {
                display: flex;
                margin: 10px;
                padding-bottom: 18px;
                border-bottom: 1px solid #ccc;

                &:last-child {
                    border: none;
                    margin-bottom: 0;
                }
                .icon {
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc,.extra {
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        line-height: 12px;
                        margin-bottom: 8px;
                    }
                    .extra {
                        .count {
                            margin-right: 12px;
                        }
                    }
                    .priceBox{
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                    }

                    .price {
                        font-weight: 700;
                        line-height: 24px;
                        .now {
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240, 20, 20);
                        }
                        .old {
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .cartcontrol-wrapper {
                        justify-content: flex-end;
                        display: flex;
                    }
                }
            }
        }
    }
}

.wishBtn{
    i{
        font-size: 1.675rem;    
    }
}

i.like-icon{
    font-size: 1.275rem;
    margin-right: 10px;
}

.icon-licke-c{
    color: #df3636;
}
.icon-licke{
    color: #ccc;
}


</style>
