<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { musicApi } from '@/api/index.js'
const getPlaylistDetail = musicApi.getPlaylistDetail
const route = useRoute()
const id = route.params.id
const title = route.query.title || '歌单详情'
const list = ref([])
onMounted(async () => {
    try {
        const res = await getPlaylistDetail(id)
        console.log(res);
        if (res) {
            list.value = res.songs.map(item => ({
                name: item.name,
                picUrl: item.al.picUrl,
                id: item.id,
                // 保留完整的歌手信息
                singerInfo: item.ar,
                // 同时提供格式化的歌手名字字符串
                singerNames: item.ar.map(item => item.name).join('/'),
                alia: item.alia.join('/'),
                mv: item.mv,
                fee: item.fee,
                originCoverType: item.originCoverType,
                alName: item.al.name,
            }))
        }
    } catch (error) {
        console.error('获取歌单详情失败:', error)
    }
})
</script>
<template>
    <DetailHeader :title="title"></DetailHeader>
    <SongItem></SongItem>
    <SongListItem v-for="item in list" :key="item.id" :song="item"></SongListItem>
</template>
