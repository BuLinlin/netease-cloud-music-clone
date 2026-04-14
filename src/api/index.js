import { get, post, put, del } from './requests'

// 示例：用户相关接口
export const userApi = {
  // 获取用户信息
  getUserInfo: () => get('/user/info'),
  
  // 用户登录
  login: (data) => post('/user/login', data),
  
  // 用户注册
  register: (data) => post('/user/register', data),
  
  // 更新用户信息
  updateUserInfo: (data) => put('/user/info', data),
  
  // 删除用户
  deleteUser: (id) => del(`/user/${id}`)
}

// 示例：音乐相关接口
export const musicApi = {
  // 获取推荐歌单
  getRecommendPlaylists: () => get('/recommend/resource'),
  // 获取歌单详情
  getPlaylistDetail: (id, limit = 50, offset = 0) => get(`/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`),
  // 获取热门歌曲
  getHotSongs: () => get('/music/hot/songs'),
  
  // 获取歌曲详情
  getSongDetail: (id) => get(`/music/song/detail/${id}`),
  
  // 获取歌词
  getLyric: (id) => get(`/music/song/lyric/${id}`),
  
  // 搜索歌曲
  searchSongs: (keyword) => get('/music/search', { keyword })
}

// 导出所有API模块
export default {
  userApi,
  musicApi
}