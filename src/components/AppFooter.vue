<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
// 检查是否显示底部导航栏
const showBottomNav = computed(() => route.meta.showBottomNav)
// 只有在 showBottomNav 为 true 时才显示底部导航栏
</script>
<template>
    <van-action-bar>
        <div class="bottom-nav" :class="{ 'hide': !showBottomNav }">
            <van-action-bar-icon :class="{ 'active': route.path === '/' }" to="/" text="首页" />
            <van-action-bar-icon :class="{ 'active': route.path === '/playlist' }" to="/playlist" text="歌单" />
            <van-action-bar-icon :class="{ 'active': route.path === '/my' }" to="/my" text="我的" />
        </div>
    </van-action-bar>
</template>

<style lang="scss" scoped>
.van-action-bar {
    height: auto;
    transition: all 0.3s ease-in-out;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.play-nav {
    width: 90%;
    box-sizing: border-box;
    // 圆角
    border-radius: 9999px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bottom-nav {
    width: 100%;
    box-sizing: border-box;
    padding: 3% 5%;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;

    :deep(.van-action-bar-icon) {
        font-size: 16px;
        font-weight: bold;
        color: #999;
    }

    &.hide {
        height: 0;
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }

    :deep(.van-action-bar-icon.active) {
        color: #000;
    }
}
</style>