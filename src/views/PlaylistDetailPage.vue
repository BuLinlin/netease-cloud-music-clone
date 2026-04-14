<script setup>
// 导入 Vue 相关的响应式函数和生命周期钩子
import { ref, onMounted, computed, watch } from 'vue'
// 导入路由相关的函数
import { useRoute } from 'vue-router'
// 创建路由实例，用于获取路由参数
const route = useRoute()
// 导入 API 接口
import { musicApi } from '@/api/index.js'
// 导入详情页头部组件
import DetailHeader from '@/components/DetailHeader.vue'
// 导入播放音乐状态管理
import playMusicStore from '@/stores/PlayMusic'
const musicStore = playMusicStore()
// 声明响应式变量
// active: 用于控制排序按钮的状态
const active = ref(0)
// list: 用于存储歌曲列表数据
const list = ref([])
// originalList: 用于存储原始歌曲列表，用于恢复顺序
const originalList = ref([])
// loading: 用于控制加载状态
const loading = ref(false)
// finished: 用于控制列表是否加载完成
const finished = ref(false)

/**
 * 加载歌单详情数据
 * 从 API 获取歌单的歌曲列表数据
 */
const loadPlaylistData = async () => {
    // 设置加载状态为 true，显示加载动画
    loading.value = true
    try {
        // 调用 API 获取歌单详情
        const res = await musicApi.getPlaylistDetail(route.params.id)
        // 打印 API 响应，用于调试
        console.log('API 响应:', res)
        // 安全地处理响应数据，检查响应是否存在且状态码为 200
        if (res && res.code === 200) {
            // 直接使用 res.songs 作为歌曲列表，若不存在则使用空数组
            const songs = res.songs || []
            list.value = [...songs]
            // 保存原始列表，用于恢复顺序
            originalList.value = [...songs]
            // 打印获取成功的歌曲列表，用于调试
            console.log('获取歌单详情成功:', list.value)
            // 只有在数据加载成功后才设置 finished = true，停止加载
            finished.value = true
        }
    } catch (error) {
        // 捕获并打印错误信息
        console.error('获取歌单详情失败:', error)
    } finally {
        // 无论成功或失败，都设置加载状态为 false
        loading.value = false
    }
}

/**
 * 组件挂载时执行的生命周期钩子
 */
onMounted(() => {
    // 设置页面标题，优先使用路由参数中的标题，否则使用默认标题
    document.title = route.query.title || '网易云音乐'
    // 组件挂载时调用加载数据函数
    loadPlaylistData()
})

/**
 * 计算属性：统计不同类型的歌曲数量
 * @returns {Object} 包含不同类型歌曲数量的对象
 */
const playAll = computed(() => {
    // 计算免费或无版权的歌曲数量（fee === 0）
    const freeCount = list.value.filter(song => song.fee === 0).length
    // 计算 VIP 歌曲数量（fee === 1 或 fee === 8）
    const vipCount = list.value.filter(song => [1, 8].includes(song.fee)).length
    // 计算需要购买的歌曲数量（fee === 4）
    const purchaseCount = list.value.filter(song => song.fee === 4).length

    // 返回统计结果
    return {
        freeCount,     // 免费歌曲数量
        vipCount,      // VIP 歌曲数量
        purchaseCount, // 需要购买的歌曲数量
        totalCount: list.value.length // 总歌曲数量
    }
})

/**
 * 根据歌曲的 fee 值获取对应的收费类型文本
 * @param {number} fee - 歌曲的收费类型代码
 * @returns {string} 收费类型文本
 */
const getFeeText = (fee) => {
    // 根据 fee 值返回对应的文本
    switch (fee) {
        case 0: return '免费';  // 免费或无版权
        case 1: return 'VIP';   // VIP 歌曲
        case 4: return '专辑';   // 购买专辑
        case 8: return '限免';   // 非会员可免费播放低音质，会员可播放高音质
        default: return '';      // 其他情况返回空字符串
    }
}

// 监听 active 变化，根据值排序列表
watch(active, (newVal) => {
    if (newVal === 1) {
        // 按歌曲名称排序
        list.value = [...list.value].sort((a, b) => a.name.localeCompare(b.name))
    } else {
        // 恢复原始顺序
        list.value = [...originalList.value]
    }
})

// 播放歌曲
const playSong = (song) => {
    // 点击后向传入当前播放音乐信息
    musicStore.setCurrentMusic(song)
    // 开始播放
    musicStore.setPlaying(true)
    console.log(musicStore.currentMusic)
}
</script>
<template>
    <DetailHeader></DetailHeader>
    <!-- 播放全部按钮 -->
    <div class="play-all-btn">
        <div class="left">
            <van-icon name="play-circle" size="20" color="#FF3D31" style="margin-right: 10px;" />
            <span>播放全部 ({{ playAll.freeCount + playAll.vipCount }}/{{ playAll.totalCount }})</span>
        </div>
        <div class="right">
            <van-icon @click="active = 1" v-if="active === 0" name="descending" size="20" />
            <van-icon @click="active = 0" v-if="active === 1" name="ascending" size="20" />
        </div>
    </div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了">
        <div v-for="item, index in list" :key="index" class="list-item" @click="playSong(item)">
            <div class="item-left">
                <van-image lazy-load height="40" width="40" radius="7px" fit="cover" :src="item.al.picUrl" />
                <div class="item-info">
                    <div class="info-top">
                        {{ item.name }}
                    </div>
                    <div class="info-bottom">
                        <van-tag plain class="fee-tag">
                            {{ getFeeText(item.fee) }}
                        </van-tag>
                        <p>
                            {{ item.ar[0].name }}-{{ item.al.name }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="item-right">
                <van-icon v-if="item.mv" name="live" />
            </div>
        </div>
    </van-list>
</template>
<style lang="scss" scoped>
.play-all-btn {
    display: flex;
    justify-content: space-between;
    padding: 3% 5%;
    width: 100%;
    box-sizing: border-box;
    align-items: center;

    .left {
        display: flex;
        align-items: center;

        span {
            font-size: 14px;
            font-weight: bold;
        }
    }
}

.list-item {
    width: 100%;
    padding: 4% 5% 0 5%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;

    .item-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        width: 85%;

        .item-info {
            width: calc(100% - 50px);
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .info-top {
                font-size: 14px;
                font-weight: bold;
            }

            .info-bottom {
                width: 100%;
                font-size: 10px;
                color: #999;
                display: flex;
                align-items: center;
                margin-top: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                .fee-tag {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 5px;
                    font-size: 8px;
                    border-radius: 4px;
                    line-height: normal;
                    padding: 1px;
                    font-weight: bold;
                    color: #FF4D4D;
                    border: 1px solid #FFC6C6;

                    &::before {
                        display: none;
                        content: '';
                    }
                }

                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>