// 请求相关
import axios from 'axios'
// 导入nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import { BASE_URL } from '../config/constants.js'
import { $msgErr } from '../util/tip'

var instance = axios.create({
  baseURL: BASE_URL, // 地址前缀
  timeout: 30000 // 超时时间
  // headers: { token:  }// 自定义请求头
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做点什么
  nprogress.start()
  return config
}, function (error) {
  // 对请求错误做些什么
  nprogress.done()
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  nprogress.done()
  return response
}, function (error) {
  nprogress.done()
  $msgErr(error.response.data.message)
  return Promise.reject(error)
})

export const $get = async (url, params) => {
  $setToken()
  const { data } = await instance.get(url, { params })
  return data
}

export const $post = async (url, params) => {
  $setToken()
  const { data } = await instance.post(url, params)
  return data
}

/**
 * 设置token
 */
export const $setToken = () => {
  if (sessionStorage.getItem('token')) {
    instance.defaults.headers.common.token = sessionStorage.getItem('token')
  }
}
