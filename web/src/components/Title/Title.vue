<template>
    <div class="title">
       <h3>{{titleName}}</h3>
    </div>
</template>

<script>

export default {
    name: 'Title',
    props:{
        titleName:String,
    }
}
</script>

<style scoped>
.title{
    text-align: center;
    padding: 10px;
}
.title h3{
    font-size: 1.1rem;
    color: #373737;
    font-weight: bold;
  
    background: #fff; 
    position: relative; 
}

h3::before{
    content: '';
    position: absolute;
    top:40%;   
    background: url('../../assets/images/title-left.png');
    width: 55px;
    height: 5px; 
    left: 50%; 
    margin-left:-100px; 
}

h3::after{
    content: '';
    position: absolute;
    top:40%;   
    background: url('../../assets/images/title-right.png');
    width: 55px;
    height: 5px; 
    right: 50%; 
    margin-right:-100px; 
}


</style>
