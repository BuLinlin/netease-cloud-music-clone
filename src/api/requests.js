import request from './axios'

/**
 * GET请求
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @returns {Promise}
 */
export const get = (url, params) => {
  return request({
    method: 'get',
    url,
    params
  })
}

/**
 * POST请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @returns {Promise}
 */
export const post = (url, data) => {
  return request({
    method: 'post',
    url,
    data
  })
}

/**
 * PUT请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @returns {Promise}
 */
export const put = (url, data) => {
  return request({
    method: 'put',
    url,
    data
  })
}

/**
 * DELETE请求
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @returns {Promise}
 */
export const del = (url, params) => {
  return request({
    method: 'delete',
    url,
    params
  })
}

// 导出所有方法
export default {
  get,
  post,
  put,
  del
}