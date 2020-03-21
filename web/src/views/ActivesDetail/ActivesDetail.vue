<template>
    <div class="event-detail">
        <HeadTop title="活動文章詳情">
             <div class="header-back" slot="left" @click="$router.back(-1)">
                <i class="iconfont icon-arrow-left-c"></i>    
            </div>
        </HeadTop>
        <!--banner-->
        <div class="banner" v-if="activesInfo.img">
            <img :src="activesInfo.img" /> 
        </div>

        <!---主體內容-->
        <div class="content">
            <p>{{activesInfo.createTime  | moment("YYYY-MM-DD")}}</p>
            <h4>{{activesInfo.name}}</h4>
            <div class="html-text" v-html="activesInfo.detail"></div>
        </div>
       
    </div>
</template>

<script>
import { reqActiveInfo } from '@/api'
import HeadTop from '@/components/HeadTop/HeadTop';
export default {
   
    components:{
       HeadTop
    },

    data(){
        return{
            activesInfo:{},
            number:0,
        }
    },
    methods:{
       async getActiveInfo(activeId){
            const result = await reqActiveInfo(activeId);
            if(result.code===0){
                console.log('result',result)
                this.activesInfo = result.activesInfo;
            }
       }

    },

    mounted() {
        console.log('this.routes.params.id',this.$route.params.id)
       const activeId = this.$route.params.id || ''
       this.getActiveInfo(activeId)   
    },
 
}
</script>

<style scoped >
.event-detail{
    background: #fff;
    width: 100%;
    height: 100%;
    margin-bottom: 3.142857rem;
}


.banner{
    background: #fff;
    text-align: center;
}

.banner img{
    width: 100%;
    max-height: 20rem;
}
.event-detail > .content{
    padding: 1.2rem;
}

.event-detail > .content > h4{
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 2px;
    line-height: 1.5rem;
    margin-bottom: .714286rem;
}

.event-detail > .content > p{
    text-align: right;
    font-size: .714286rem;
    color: #8d8d8d;
}

.event-detail > .content > .html-text {
    letter-spacing: 1px;
    line-height: 1.428571rem;
    font-size: 0.92rem;
    text-align: justify;
}

/* .event-detail > .content > h2{
    font-size: 1.2rem;
}  */



</style>
