<template>
    <header class="header">
        <slot name="left"></slot>
        <a class="header-title">
            <!-- <i class="iconfont icon-leaf_ea_ether"></i> -->
            <span class="header-title-text">{{title}}</span>
        </a>
        <slot name="right"></slot>
    </header>
</template>
<script>
export default {
    props:{
        title:String
    }
}
</script>

<style lang="scss" scoped>
.header{
    background-color: #9ec8a0;
    position: fixed;
    z-index: 100;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    height:2.8125rem;
    display: flex;
    line-height:2.8125rem;
    max-width: 60rem;

    .header-title{
        flex: 1;
        text-align: center;
        i{
            padding-right: 0.5rem;
            color: rgb(65, 65, 65);
        }
    
    }
    .header-title-text{
        color:#fff;
        font-family: 'Fredoka One','Noto Sans TC', cursive;
        font-size: 1.125rem;
    }

    .header-login{
        position: absolute;
        right: .825rem;
        text-align: center;
        color: #fff;
        .header-login-text{
            font-size: 1rem; 
        } 
    }
}

</style>