<template>
    <div class="category">
        <dl>
            <dt>
                <i class="iconfont icon-tubiaozuhebaocunbanweikuozhan-"></i> 
            </dt>
            <dd>新品</dd>
        </dl>
        <dl>
            <dt>
                <i class="iconfont icon-gift"></i> 
            </dt>
            <dd>禮品</dd>
        </dl>

        <dl>
            <dt>
                <i class="iconfont icon-wedding"></i> 
            </dt>
            <dd>婚禮</dd>
        </dl>
        <router-link to="/actives" tag="dl">
            <dt>
                <i class="iconfont icon-Weddinginvitation"></i> 
            </dt>
            <dd>文章</dd>
        </router-link>
    </div>
</template>

<script>


export default {
    name: "Category",
};
</script>

<style scoped>
.category {
    overflow: hidden;
    background: #fff;
    padding: 15px 10px 10px 10px;
    overflow: hidden;
}
.category > dl {
    float: left;
    width: 25%;
    text-align: center;
    
}
.category > dl > dt {
    width: 3.4375rem;
    height: 3.4375rem;
    border-radius: 50%;
    background: #ccc;
    margin: 0 auto;
    
}
.category > dl:nth-child(1) > dt{
    background: #d7a4a4;
}
.category > dl:nth-child(2) > dt{
    background: #a4bfd7;
}
.category > dl:nth-child(3) > dt{
    background: #ae9ed5;
}
.category > dl:nth-child(4) > dt{
    background: #d59ece;
}
.category > dl:nth-child(5) > dt{
    background: #9ed5b7;
}

.category > dl > dt i{
    font-size:1.875rem;
    line-height: 3.5rem;
    color: #fff;
}

.category > dl > dt > img {
    width: 100%;
}

.category > dl > dd {
    margin-top: 5px;
    color: #4c4c4c;
    letter-spacing: 3px;
}

.category .icon {
    line-height: 48px;
    font-size: 30px;
}
</style>
