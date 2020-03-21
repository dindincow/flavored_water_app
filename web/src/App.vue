<template>
    <div id="app">
        <router-view/>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer/Footer'
export default {
    components:{
        Footer
    },
   
}
</script>

<style lang="scss" scoped>


</style>
