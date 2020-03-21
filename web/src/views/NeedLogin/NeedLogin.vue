<template>
    <div class="no-uthority">
        <div class="no-uthority-img">
             <img src="../../assets/images/page_401.png">
        </div>
        <h3>OH~目前你沒權限訪問唷!</h3>
        <p>請先登入再說..</p>
        <router-link to="/login">
            <button type="button">前往登入頁面</button>
        </router-link>
       
       
    </div>
</template>

<script>


export default {
   
}
</script>

<style lang="scss" scoped>
    .no-uthority{
        height: 100vh;
        background: #F7F8F8;
        display: flex;
        flex-direction: column;
        align-items: center;
        .no-uthority-img{
            margin-top:6rem;
            width: 15.625rem;
        }

        h3{
            margin: 1.5rem 0 1rem 0;
            font-size: 1.2rem;
            color: #616161;
            letter-spacing: 1px;
            font-weight: 500;
        }
        
        p{
            font-size: 0.9rem;
            letter-spacing: 1px;
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
