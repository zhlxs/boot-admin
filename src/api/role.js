import { $get, $post } from '../util/request.js'
/**
 * 分页查询
 * @param {} params
 * @returns
 */
export const pager = async (params) => {
  return await $post('/role/page', params)
}

/**
 * 新增
 * @param {*} params
 * @returns
 */
export const create = async (params) => {
  return await $post('/role/create', params)
}

/**
 * 删除
 */
export const del = async (params) => {
  return await $get('/role/delete', params)
}

/**
 * 删除
 */
export const update = async (params) => {
  return await $post('/role/update', params)
}
