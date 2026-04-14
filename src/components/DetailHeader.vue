<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 定义 props
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})

const route = useRoute()
const onClickLeft = () => history.back();
// 优先使用 prop 传递的标题，否则使用路由参数中的标题
const displayTitle = computed(() => props.title || route.query.title || '网易云音乐')
</script>
<template>
    <van-nav-bar :title="displayTitle" left-arrow>
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
