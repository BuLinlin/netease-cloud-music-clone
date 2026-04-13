import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // 基础URL，根据实际后端地址配置
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  // 请求超时时间
  timeout: 10000,
  // 请求头配置
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 直接返回响应数据
    return response.data
  },
  error => {
    console.error('响应错误:', error)
    
    // 错误处理逻辑
    if (error.response) {
      // 服务器返回错误状态码
      switch (error.response.status) {
        case 401:
          // 未授权，可跳转到登录页
          console.log('未授权，请重新登录')
          break
        case 403:
          console.log('没有权限访问该资源')
          break
        case 404:
          console.log('请求的资源不存在')
          break
        case 500:
          console.log('服务器内部错误')
          break
        default:
          console.log(`请求失败，状态码：${error.response.status}`)
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.log('网络异常，请检查网络连接')
    } else {
      // 请求配置出错
      console.log('请求配置错误:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default service