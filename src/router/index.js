import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Recommend',
      component: () => import('@/views/RecommendPage.vue'),
      meta: {
        title: '推荐'
      }
    },
    {
      path: '/playlist/:id',
      name: 'PlaylistDetail',
      component: () => import('@/views/PlaylistDetailPage.vue'),
      meta: {
        title: '歌单详情'
      }
    }
  ],
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '网易云音乐'
  next()
})

export default router
