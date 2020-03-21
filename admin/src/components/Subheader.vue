<template>   
    <div class="subheader">
        <h1 class="subheader-title">
            <i class="el-icon-edit"></i> {{pageTitle}}
        </h1>
    </div>
</template>

<script>
export default {
    name: 'Subheader',
    props:{
        pageTitle:String, 
    }
}
</script>

<style scoped lang="css">
.subheader {
    margin-bottom: calc(1.5rem + .625rem);
    position: relative;
    align-items: center;
}
.subheader-title {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 2px;
    color: #505050;
    text-shadow: #fff 0 1px;
    margin: 0;
    
}
.subheader small {
    font-weight: 400;
    color: #838383;
    margin-bottom: 0;
    font-size: .875rem;
}
</style>
