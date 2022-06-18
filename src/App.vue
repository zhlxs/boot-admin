<template>
  <router-view />
  <!-- <router-view v-if="isRouterAlive" /> 进行v-if判断 -->
</template>

<script>
import { ref, nextTick, provide } from 'vue'// 要引入方法
export default {
  name: 'App',
  setup () {
    // 局部组件刷新
    const isRouterAlive = ref(true)
    const reload = () => {
      isRouterAlive.value = false
      nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide('reload', reload)
    return {
      isRouterAlive
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  outline: none;
}

// 定义全局字体格式
// @font-face {
//   font-family: 'bing';
//   src: url();
// }
</style>
