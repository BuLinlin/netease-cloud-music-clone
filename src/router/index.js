import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Recommend',
      component: () => import('@/views/RecommendPage.vue'),
      meta: {
        title: '推荐',
        showBottomNav: true,
        showHeader: true,
      }
    },
    {
      path: '/playlist/:id',
      name: 'PlaylistDetail',
      component: () => import('@/views/PlaylistDetailPage.vue'),
      meta: {
        title: '歌单详情',
        showBottomNav: false,
        showHeader: false,
      }
    }
  ],
})
router.beforeEach((to, from, next) => {
  // 对于歌单详情页，优先使用 query 中的 title
  if (to.name === 'PlaylistDetail' && to.query.title) {
    document.title = to.query.title
  } else {
    document.title = to.meta.title || '网易云音乐'
  }
  next()
})

export default router
