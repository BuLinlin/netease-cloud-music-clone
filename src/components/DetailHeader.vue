<script setup>
// 定义 props
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
const onClickLeft = () => history.back();
</script>
<template>
    <van-nav-bar :title="props.title" left-arrow>
        <template #left>
            <van-icon @click="onClickLeft" name="arrow-left" color="#fff" />
        </template>
        <template #right>
            <van-icon name="search" color="#fff" />
        </template>
    </van-nav-bar>
</template>
<style scoped>
.van-nav-bar {
    background-color: #6B6D7D;
}

:deep(.van-nav-bar__title) {
    color: #fff;
}
</style>
