<template>
    <div class="red-popupbox">
        <div class="red-popupbox-wrapper">
            <div @click="close" class="closeBtn"><i class="iconfont icon-remove-circle"></i></div>
            <!-- <div class="red-popupbox-amount">$ 10</div> -->
            <div class="red-popupbox-btn">
                <button type="button" class="comfirm-button btn" @click="close">我知道了</button>
            </div>
        </div>
       
    </div>
</template>

<script>

export default {
    methods: {
        close(){
            this.$emit('closeRedPopup')
        }
    },
    data() {
        return {};
    },
    created() {
    }
};
</script>

<style lang="scss" scoped>
.red-popupbox {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 199;
    background: rgba(0,0,0,0.7);

    .red-popupbox-wrapper{
        position: relative;
        background: url('../../assets/images/redEnvelope.png') no-repeat;
        width: 22.5rem;
        height: 20rem;
        background-size: cover;
        margin: 0 auto;
        margin-top: 50%;
        transform: translateY(-20%);
        .closeBtn{
            position: absolute;
            top: 0rem;
            right: 0rem;
            color: #fff;
            i{
                font-size: 1.6rem;
            }

        }

        .red-popupbox-amount{
            position: absolute;
            font-size: 1.875rem;
            left: 42%;
            top:60%; 
        }

        .red-popupbox-btn{
            position: absolute;
            width: 200px;
            bottom: 15px;
            left: 50%;
            transform: translateX(-46%);
            .btn{
                padding-left:.625rem; 
            }
        }
    }

   
}

</style>
