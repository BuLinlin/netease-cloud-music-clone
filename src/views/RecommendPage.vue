<script setup>
// 获取推荐歌单数据
import { ref, onMounted } from 'vue'
import { musicApi } from '@/api/index.js'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
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
    <AppHeader></AppHeader>
    <div class="card-box">
        <div class="card" v-for="card, index in recommendCards" :key="index"
            @click="navigateToPlaylist(card.id, card.title)">
            <van-image fit="cover" :src="card.icon" />
            <!-- 信息遮罩 -->
            <div class="card-info">
                <div class="card-title">
                    <van-icon size="20" name="todo-list" />
                    <p>每日推荐</p>
                </div>
                <div class="card-desc">
                    <van-icon size="20" name="play-circle" />
                    <p>{{ card.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card-box {
    display: flex;
    width: 100%;
    overflow-x: auto;
    padding: 3% 5%;
    box-sizing: border-box;

    .card {
        display: flex;
        position: relative;
        border-radius: 5px;
        margin-right: 10px;
        overflow: hidden;
        height: 180px;
        flex: 0 0 34vw;

        .card-info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #fff;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .card-title {
                box-sizing: border-box;
                width: 100%;
                font-size: 16px;
                padding: 5%;
                box-sizing: border-box;
                font-weight: bold;
                display: flex;
                align-items: center;

                p {
                    margin-left: 5px;
                    font-size: 14px;
                }
            }

            .card-desc {
                box-sizing: border-box;
                width: 100%;
                font-size: 14px;
                display: flex;
                flex-direction: column;
                align-items: end;

                .van-icon {
                    margin-right: 5%;
                }

                p {
                    margin-top: 2%;
                    padding: 10% 5%;
                    box-sizing: border-box;
                    text-align: center;
                    width: 100%;
                    background-color: #a3b4c969;
                    font-size: 12px;
                    // 超出部分省略号
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        &:last-of-type {
            margin-right: 0;
        }
    }
}

// 隐藏滚动条
.card-box::-webkit-scrollbar {
    display: none;
}
</style>
