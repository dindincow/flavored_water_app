<template>
    <div class="order">
        <HeadTop title="我的訂單"></HeadTop>
        <div class="card" v-for="(oder,index) in orderList" :key="index">
            <div class="card-title">
                <div class="orderNo">訂單號【{{oder._id}}】</div>
                <div class="orderStatus" :class="orderStatusStyle(oder.status)">{{formtOrderStatus(oder.status)}}</div>
                <!-- <div class="orderStatus">{{oder.status}}</div> -->
            </div>  
            <div class="card-body">
                <div class="card-item" v-for="(item,index) in oder.products" :key="index">
                    <div class="card-item-img">
                        <img :src="item.pDetail.img"/>
                    </div>
                    <div class="card-item-name">{{item.pDetail.name}}</div>
                    <div class="card-item-amount">{{item.amount}}</div>
                    <div class="card-item-price">{{item.pDetail.discountPrice * item.amount *1}}</div>
                </div>
            </div>
            <div class="card-footer">
                <div class="orderDate">訂購日期 : {{oder.createTime | moment("YYYY-MM-DD hh:mm:ss") }} </div>
                <div class="orderTotals">總價$ {{oder.totals}}</div>
            </div>  
           
        </div>
    </div>
</template>

<script>
import { reqOrderList } from '@/api'
import HeadTop from '@/components/HeadTop/HeadTop';
import {mapState} from 'vuex'
export default {
    components:{
        HeadTop,
    },
    data(){
        return{
            orderList:[],   
        }
    },
    methods:{
        async getOrderList(userId){
            const result = await reqOrderList(userId);
            if(result.code===0){
                this.orderList = result.orders;
            }
        },
        orderStatusStyle(val){
            //1:處理中 2:成功 3:失敗 
            switch(val){
                case 1:
                    return 'blue'
                case 2:
                    return 'green'
                case 3:
                    return 'red'     
            }   
        },
        formtOrderStatus(val){
            switch(val){
                case 1:
                    return '處理中'
                case 2:
                    return '成功'
                case 3:
                    return '失敗'     
            } 
        }
        
    },
    mounted(){
        this.getOrderList(this.userInfo._id)   
    },
    computed:{
         ...mapState(['userInfo']),
    }
}
</script>
<style lang="scss" scoped>
.order{
    background: #efefef;
    margin-top:2.8125rem;
    height: 100%;
    padding-top: .9375rem;
    padding-bottom: 2.8125rem;
}

.card{
    width: 95%;
    margin: 0 auto;
    border-radius:10px;
    background:#fff; 
    padding: .625rem;
    box-sizing: border-box;
    border: 1px solid #eeecec;
    margin-bottom: .9375rem;
    .card-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #eeecec;
        .orderNo{
            font-size: .8rem;
            color: #949494;
        }
        .orderStatus{
            font-size: .8rem;
            padding: .3125rem .625rem;
            border-radius:.3125rem;
            color: #eeecec;  
            &.blue{
                background: #00bcd4;
            }
            &.green{
                background: #4caf50;
            }
            &.red{
                background: #d9574e;
            }
        }
    }

    .card-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: .625rem;
        .card-item-img{
            width: 20%;
        }
        .card-item-name{
            flex:1;
            padding: 0 10px;
            font-size: 14px;
        }
        .card-item-amount{
            width: 10%;
        }
        .card-item-price{
            width: 15%;
        }

    }
    .card-footer{
        padding-top: 10px;
        border-top: 1px dashed #dad8d8;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        .orderDate{
           font-size: .8125rem;
        }
        .orderTotals{
            padding-right: .9375rem;
            color: #f01414;
        }
    }
}

</style>
