<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';

// 定义标签内容，包含标题和对应的路由路径
const tabs = [
    {
        title: '心动',
        path: '/heart'
    },
    {
        title: '推荐',
        path: '/'
    },
    {
        title: '播客',
        path: '/podcast'
    },
    {
        title: '听书',
        path: '/audiobook'
    },
    {
        title: '免费听',
        path: '/free'
    }
]

// 定义当前激活的标签
const active = ref(1)
const route = useRoute();
const router = useRouter();

// 侧边栏显示状态
const showSidebar = ref(false)

// 监听路由变化
watch(() => route.path, (newPath) => {
    // 找到当前路由对应的标签索引
    const index = tabs.findIndex(tab => tab.path === newPath);
    if (index !== -1) {
        active.value = index;
    }
});

// 监听标签点击事件
const switchTab = (index) => {
    // 跳转到对应的路由
    router.push(tabs[index].path);
};

// 切换侧边栏显示状态
const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
};

// 关闭侧边栏
const closeSidebar = () => {
    showSidebar.value = false
};
const showHeader = computed(() => route.meta.showHeader)
</script>

<template>
    <div class="header" v-if="showHeader">
        <!-- 左侧菜单按钮 -->
        <div class="menu-btn" @click="toggleSidebar">
            <van-icon name="wap-nav" />
        </div>

        <!-- 使用Vant的van-tabs组件实现导航标签 -->
        <van-tabs v-model:active="active" @change="switchTab" class="nav-tabs">
            <van-tab v-for="(tab, index) in tabs" :key="index" :title="tab.title" />
        </van-tabs>

        <!-- 右侧搜索按钮 -->
        <div class="search-btn">
            <van-icon name="search" />
        </div>

        <!-- 侧边栏 -->
        <van-overlay :show="showSidebar" @click="closeSidebar" class="sidebar-overlay">
            <div class="sidebar">
                <!-- 侧边栏头部 -->
                <div class="sidebar-header">
                    <div class="user-info">
                        <div class="avatar">
                            <van-icon name="user-o" size="40" />
                        </div>
                        <div class="user-text">
                            <div class="user-name">点击登录</div>
                            <div class="user-desc">登录后享受更多功能</div>
                        </div>
                    </div>
                </div>

                <!-- 侧边栏菜单 -->
                <div class="sidebar-menu">
                    <div v-for="(item, index) in sidebarMenu" :key="index" class="menu-item" @click="closeSidebar">
                        <van-icon :name="item.icon" class="menu-icon" />
                        <span class="menu-text">{{ item.name }}</span>
                    </div>
                </div>

                <!-- 侧边栏底部 -->
                <div class="sidebar-footer">
                    <div class="footer-item">
                        <van-icon name="moon-o" />
                        <span>夜间模式</span>
                    </div>
                    <div class="footer-item">
                        <van-icon name="language-o" />
                        <span>语言</span>
                    </div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 5%;
    background-color: #fff;
    position: relative;
    z-index: 10;

    .menu-btn,
    .search-btn {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .search-btn {
        justify-content: end;
    }

    .nav-tabs {
        flex: 1;
        text-align: center;

        :deep(.van-tab) {
            font-weight: bold;
            color: #81838f;
        }

        :deep(.van-tab--active) {
            color: #0f0f24;
        }

        :deep(.van-tabs__line) {
            height: 1px;
            border-radius: 0;
            background-color: #0f0f24;
        }
    }
}

/* 侧边栏样式 */
.sidebar-overlay {
    z-index: 1000;

    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 280px;
        height: 100vh;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        display: flex;
        flex-direction: column;

        /* 侧边栏头部 */
        .sidebar-header {
            padding: 24px 16px;
            border-bottom: 1px solid #f0f0f0;

            .user-info {
                display: flex;
                align-items: center;

                .avatar {
                    margin-right: 12px;

                    .van-icon {
                        color: #d33a31;
                    }
                }

                .user-text {
                    .user-name {
                        font-size: 16px;
                        font-weight: 500;
                        margin-bottom: 4px;
                    }

                    .user-desc {
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }

        /* 侧边栏菜单 */
        .sidebar-menu {
            flex: 1;
            padding: 16px 0;

            .menu-item {
                display: flex;
                align-items: center;
                padding: 12px 24px;
                cursor: pointer;

                &:hover {
                    background-color: #f5f5f5;
                }

                .menu-icon {
                    margin-right: 12px;
                    font-size: 18px;
                    color: #666;
                }

                .menu-text {
                    font-size: 14px;
                    color: #333;
                }
            }
        }

        /* 侧边栏底部 */
        .sidebar-footer {
            padding: 16px;
            border-top: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-around;

            .footer-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;

                .van-icon {
                    font-size: 20px;
                    margin-bottom: 4px;
                    color: #666;
                }

                span {
                    font-size: 12px;
                    color: #666;
                }
            }
        }
    }
}
</style>