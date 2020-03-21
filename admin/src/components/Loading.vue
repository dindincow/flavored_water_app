<template>
    <transition name="loading-fade">
        <div v-show="visible" class="loading-mask">
            loading
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Loading',
    data() {
        return {
        visible: false
        };
    }
};
</script>

