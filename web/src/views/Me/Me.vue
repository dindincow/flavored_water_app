<template>
    <div class="me">
        <div class="me-page-top">
            <p style="font-size: 12px;">ID : {{userInfo._id}}</p>
            <div class="me-page-img">
                <img src="../../assets/images/Jessica.png">
            </div>
             <p>{{userInfo.account}}</p>
        </div>
        <div class="account-info">
            <div class="item">
                <p class="title">訂單</p>
                <p class="number">{{orderLength}}</p>
            </div>
            <div class="item">
                <p class="title">蒐藏</p>
                <p class="number">{{myWishData.length || 0}}</p>
            </div>
            <div class="item">
                <p class="title">折價卷</p>
                <p class="number">0</p>
            </div>
        </div>
      

       <div class="collection">
            <span class="icon"><i class="iconfont icon-wedding"></i> </span>
            <span> 我的蒐藏 </span>
        </div>
        
        <div class="me-page-collection">
            <div class="wish-item" v-for="item in myWishData" :key="item._id">
                <div class="wish-item-img">
                   <img :src="item.img"/>
                </div>
                <div class="content">
                    <h2 class="name">{{item.name}}</h2>
                    <div class="price">
                        <span class="now">￥{{item.discountPrice}}</span>
                        <span class="old" v-if="item.price">￥{{item.price}}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="logout">
             <button class="button" @click="logout">登出</button>
        </div>
    </div>
</template>

<script>
import { getWishList } from '@/api/index';
import {mapState} from "vuex";
export default {
    data(){
        return{
            title:'我的',
            navShow:false,
            password:'',
            user:'',
            myWishData:[],
            orderLength:0
        }
    },
    methods: {
        logout(){
            localStorage.clear();
            this.$store.dispatch('logout')
            this.$router.push('/login');
        },
        async getWishData(){
            const meData = await getWishList(this.userInfo._id);
            this.myWishData = meData.wishList;
            this.orderLength = meData.orderLength
        }
        
    },
    mounted() {
        this.getWishData();
    },
    computed:{
        ...mapState(['userInfo'])
    },
}
</script>

<style lang="scss" scoped>
.me{
    background: #fafafa;
    height: 100vh;
}
.me > .me-page-top{
    background: #9fc27a;
    border-bottom: 1px solid #7fa558;
    padding: 1rem;
    text-align: center;
    background: linear-gradient(180deg, #a9c889 36%, #8ABF75 90%);
}

.me > .me-page-top > p{
    padding:.714286rem 0; 
    color: #fff;
    letter-spacing: 1px;
}

.me > .me-page-top > .me-page-img{
    width: 6rem;
    margin: 0 auto;
     border-radius: 50%; 
    border: 5px solid #fff;
}

.me > .me-page-top > .me-page-img > img{
    border-radius: 50%;
   
}

.me > .account-info{
    display: flex;
    justify-content: space-between;
    text-align: center;
    border-bottom: 1px solid #e1e1e1;
    background: #fff;
}


.me > .account-info >.item{
    padding: .714286rem 0;
    width: 33.333%;
    border-right: 1px solid #e1e1e1;
} 

.me > .account-info >.item:nth-child(3){
    border-right: none;
}
.me > .account-info  > .item > .title{
    padding-bottom: .357143rem;
    color: #a3a3a3;
    font-size: 0.85rem;
    letter-spacing: 1px;
}

.me > .account-info  > .item >.number{
    font-size: 1.2rem;
    color: #696767;
    font-weight: bolder;
}

.me > .me-page-info{
    padding: 1.5rem 1.5rem 0.2rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #e1e1e1;
    justify-content: space-around;
}

.me > .me-page-info > .item{
    width: 40%;
    margin-bottom: 1.5rem;
}

.me > .me-page-info > .item >.icon{
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #8eccd3;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    margin-right:.5rem;
    color: #fff; 
        line-height: 40px;
    i{
        font-size: 1.25rem;
    }
}

.me > .me-page-info > .item:nth-child(2) >.icon{
    background: #e09792;
}
  

.me > .me-page-info > .item:nth-child(3) >.icon{
    background: #a9c889;
 
}

.me > .me-page-info > .item:nth-child(4) >.icon{
    background: #c89fcf;
} 

.me > .me-page-info > .item > span:nth-child(2){
   color: #5e5e5e;
   letter-spacing: 1px;
}


.van-icon, .van-icon::before {
    display: inline-block;
    font-size: 1.4rem;
    line-height: 40px;
}


.me > .promotion{
    padding: 1.5rem;
}

.me .logout{
    padding: 1.5rem;
}

.van-button{
    background: linear-gradient(180deg, #a9c889 1%, #8ABF75 54%);
    border: 1px solid #7fa558; 
}
.collection{
    background: #dddbdb;
    padding: .625rem .9375rem;
    color: #5e5e5e;
}

.wish-item{
    padding:.625rem .9375rem;
    display: flex;
    border-bottom: 1px solid #ded9d9;
    align-items: center;
    .wish-item-img{
        width: 20%;   
    }
    .content{
        margin-left:.9375rem; 
    }
    .price{
        margin-top: 10px;
        font-weight: 800;
        .now{
            margin-right: 8px;
            font-size: .875rem;
            color: #f01414;
        }
        .old{
            text-decoration: line-through;
            font-size: .625rem;
            color: #93999f;
        }
    }
}

.button{
   font-size: 1rem;
    padding: 0.5em 1em;
    width: 100%;
    color: #fff;
    border: none rgba(0, 0, 0, 0);
    background-color: #a9c889;
    border-radius: 20px;
    outline: none;
}




</style>
