<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { musicApi } from '@/api/index.js'
onMounted(() => {
    musicApi.getPlaylistDetail(route.params.id)
        .then(res => {
            console.log('API 响应:', res)
            // 安全地处理响应数据
            if (res) {
                // 根据实际 API 返回结构调整
                let data = res.playlist || res
                if (data) {
                    // 映射数据字段
                    playlist.value = data
                    console.log('获取歌单详情成功:', playlist.value)
                }
            }
        })
        .catch(error => {
            console.error('获取歌单详情失败:', error)
        })
})
const playlist = ref({})

</script>
<template>
    <div>歌单详情</div>
</template>
<style lang="scss" scoped></style>
