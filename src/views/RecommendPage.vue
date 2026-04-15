<script setup>
// 获取推荐歌单数据
import { ref, onMounted } from 'vue'
import { musicApi } from '@/api/index.js'
import { useRouter } from 'vue-router'
// 创建路由实例
const router = useRouter()
// 跳转详情页功能代码
const navigateToPlaylist = (id, title) => {
    router.push({
        name: 'PlaylistDetail', params: { id, title }, query: { title }
    })
}
// 定义推荐卡片数据
const recommendCards = ref([])

onMounted(() => {
    musicApi.getRecommendPlaylists()
        .then(res => {
            console.log('API 响应:', res)
            // 安全地处理响应数据
            if (res) {
                // 根据实际 API 返回结构调整
                let data = res.recommend || res
                if (data) {
                    // 检查数据是否为数组，如果不是则转换为数组
                    if (!Array.isArray(data)) {
                        data = [data]
                    }
                    // 映射数据字段
                    recommendCards.value = data.map(item => ({
                        title: item.name || '未知歌单',
                        desc: item.copywriter || `共${item.trackCount || 0}首歌曲`,
                        icon: item.picUrl || '',
                        id: item.id || ''
                    }))
                    console.log('获取推荐数据成功:', recommendCards.value)
                }
            }
        })
        .catch(error => {
            console.error('获取推荐数据失败:', error)
        })
})
</script>
<template>
    <div class="w-full flex px-[15px] py-3 gap-[10px] overflow-x-auto scrollbar-hide">
        <div class="rounded-sm overflow-hidden w-[140px] h-[190px] flex-shrink-0 cursor-pointer relative"
            v-for="card, index in recommendCards" :key="index" @click="navigateToPlaylist(card.id, card.title)">
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
                <div class="card-desc  flex flex-col items-end justify-end">
                    <van-icon size="20" name="play-circle" class="text-white mb-1 mr-1" />
                    <p class="px-2 py-3 text-white  text-[12px] w-full text-center truncate bg-black/40">
                        {{ card.title }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
