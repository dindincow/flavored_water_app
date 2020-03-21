<template>
    <div class="pageNotFound">
        <div class="no-uthority-img">
            <img src="../../assets/images/404.png">
        </div>
      
        <router-link to="/">
            <button type="button">前往首頁</button>
        </router-link>
    </div>
</template>

<script>


export default {
   
}
</script>

<style lang="scss" scoped>
    .pageNotFound{
        height: 100vh;
        background: #F7F8F8;
        display: flex;
        flex-direction: column;
        align-items: center;
        .no-uthority-img{
            margin-top:6rem;
            width: 15.625rem;
        }


        button{
            font-family: inherit;
            margin-top: 2rem;
            height: 2.5rem;
            letter-spacing: 1px;
            width: 12.5rem;
            font-size: 1rem;
            padding: 0.2em 1em 0.3em;
            color: #fff; /* rgba not supported (IE 8) */
            border: none rgba(0, 0, 0, 0);  /*IE9 + everything else*/
            background-color: #71a28d;
            border-radius: 20px;
            outline: none;
            &:hover,&:active{
                background-color: #ccc;
            }
        }
    }

    
</style>
