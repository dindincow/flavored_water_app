<template>
    <div class="actives">
        <HeadTop title="活動文章">
             <div class="header-back" slot="left" @click="$router.back(-1)">
                <i class="iconfont icon-arrow-left-c"></i>    
            </div>
        </HeadTop>
        <div class="actives-list">
            <div class="item" v-for="item in list" :key="item._id" @click="eventClick(item._id)">
                <h3>{{item.name}}</h3>
                <p class="time">{{item.createTime | moment("YYYY-MM-DD")}}</p>
                <div class="item-img">
                    <img :src="item.img"/>
                </div>
            </div>
        </div>  
    </div>  
</template>

<script>
import HeadTop from '@/components/HeadTop/HeadTop';
import { reqActiveList } from '@/api'
export default {
    components:{
        HeadTop
    },
    data(){
        return{
            list:[]
        }
    },
    methods:{
        async getActiveList(){    
            const result = await reqActiveList();
            if(result.code===0){
                this.list = result.activesList;
            }
        },
        eventClick(id){
            console.log("id",id)
            this.$router.push(`/actives/${id}`)
            
        }
    },
    created() {
        this.getActiveList()
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

.actives{
    text-align: center;
    padding: 3rem 1rem;
}

.actives > .actives-list >.item{
    padding:20px 0;
    border-bottom: 1px dashed #ccc; 
}

.actives > .actives-list h3{
  margin-bottom: .457143rem;
}

.actives > .actives-list p{
   margin-bottom: .357143rem;
   font-size: .857143rem;
}

.time{
    color: #949494;
    font-size: .75rem;
}


</style>
