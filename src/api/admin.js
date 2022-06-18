/* eslint-disable no-unused-vars */
// 定义管理员的API函数------------------后台增删改查接口
import { $get, $post, $setToken } from '../util/request.js'
import md5 from 'js-md5'
import { $msgSuccess, $msgWarn, $msgErr } from '../util/tip'

export const Login = async (params) => {
  params.password = md5(params.password)
  const data = await $post('/user/login', params)
  if (data && data.success) {
    // localStorage除非手动清除，不然会一直缓存
    // sessionStorage随浏览器关闭而清空
    sessionStorage.setItem('token', data.data.token)
    $setToken()
    $msgSuccess(data.message)
    const { remember } = params
    if (remember && remember === true) {
      localStorage.setItem('userName', params.userName)
      localStorage.setItem('password', params.password)
    }
    // 登录成功之后获取角色列表请求 todo
  } else {
    data.message ? $msgErr(data.message) : $msgErr('服务异常！')
  }
  return data.success
}

/** 自动登录 */
export const LoginAuto = async () => {
  const userName = localStorage.getItem('userName')
  const password = localStorage.getItem('password')
  if (userName && password) {
    const params = {
      userName,
      password
    }
    const data = await $post('/user/login', params)
    if (data && data.success) {
      sessionStorage.setItem('token', data.data.token)
      $setToken()
      return true
    } else {
      return false
    }
  } return false
}
