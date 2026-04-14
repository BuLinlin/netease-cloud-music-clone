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
  // 获取歌单详情动态
  getPlaylistDetailDynamic: (id) => get(`/playlist/detail/dynamic?id=${id}`),
  // 获取音乐播放地址
  getMusicUrl: (id, level = 'exhigh') => get(`/song/url/v1?id=${id}&level=${level}`),
}

// 导出所有API模块
export default {
  userApi,
  musicApi
}