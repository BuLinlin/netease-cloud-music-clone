<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
    card: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const navigateToPlaylist = () => {
    router.push({
        name: 'PlaylistDetail',
        params: { id: props.card.id },
        query: { title: props.card.title },
    })
}
</script>
<template>
    <div class="rounded-sm overflow-hidden w-[140px] h-[190px] flex-shrink-0 cursor-pointer relative"
        @click="navigateToPlaylist">
        <van-image class="w-full h-full" fit="cover" :src="card.icon" />
        <!-- 带上下阴影的遮罩 -->
        <div
            class="absolute top-0 left-0 w-full h-full flex flex-col justify-between bg-gradient-to-b from-black/30 via-transparent to-black/60">
            <!-- 顶部标签 -->
            <div class="p-2 w-full flex items-center text-white">
                <van-icon class="mr-1" size="20" name="todo-list" />
                <p class="font-bold text-[14px]">推荐歌单</p>
            </div>
            <!-- 底部描述区 -->
            <div class="card-desc flex flex-col items-end justify-end">
                <van-icon size="20" name="play-circle" class="text-white mb-1 mr-1" />
                <p class="px-2 py-3 text-white text-[12px] w-full text-center truncate bg-black/40">
                    {{ card.title }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 组件样式 */
</style>