export default {
  namespaced: true,
  state: {
    themes: [
      {
        name: '蓝色',
        color: '#101f30'
      },
      {
        name: '绿色',
        color: '#497568'
      },
      {
        name: '红色',
        color: '#481e1c'
      },
      {
        name: '黑色',
        color: '#000000'
      },
      {
        name: '灰色',
        color: '#545c64'
      }
    ],
    currentTheme: {
      name: '蓝色',
      color: '#101f30'
    }
  },
  getters: {
    getTheme (state) {
      return state.themes.map(r => r.name)
    }
  },
  mutations: {
    // 设置当前主题
    setThemeColor (state, val) {
      state.currentTheme = val
    }
  },
  actions: {
    // 设置当前主题
    setThemeColor (store, val) {
      store.commit('setThemeColor', val)
    }
  }
}
