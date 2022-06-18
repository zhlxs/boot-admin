import { ElMessage } from 'element-plus'

/**
 * 成功提示
 * @param {*} message
 * @param {*} duration
 */
export const $msgSuccess = (message, duration = 2000) => {
  ElMessage({
    showClose: true,
    message,
    duration,
    type: 'success'
  })
}

/**
 * 警告提示
 * @param {*} message
 * @param {*} duration
 */
export const $msgWarn = (message, duration = 2000) => {
  ElMessage({
    showClose: true,
    message,
    duration,
    type: 'warning'
  })
}

/**
 * 错误提示
 * @param {*} message
 * @param {*} duration
 */
export const $msgErr = (message, duration = 2000) => {
  ElMessage({
    showClose: true,
    message,
    duration,
    type: 'error'
  })
}
