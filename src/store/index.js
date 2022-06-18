import { createStore } from 'vuex'
// 导入主题设置
import theme from './modules/theme'

export default createStore({
  modules: {
    theme
  }
})
