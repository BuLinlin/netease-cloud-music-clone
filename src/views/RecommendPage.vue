<script setup>
// 获取推荐歌单数据
import { ref, onMounted } from 'vue'
import { musicApi } from '@/api/index.js'
import PlaylistCard from '@/components/PlaylistCard.vue'

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
        <PlaylistCard v-for="card, index in recommendCards" :key="index" :card="card" />
    </div>
</template>