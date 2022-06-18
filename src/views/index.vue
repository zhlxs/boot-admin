<template>
  <div></div>
</template>

<script>
import { onBeforeMount } from 'vue'
import { LoginAuto } from '../api/admin'
// 导入路由
import { useRouter } from 'vue-router'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  setup () {
    // 当前项目路由对象
    const $router = useRouter()
    // 页面挂载之前
    onBeforeMount(async () => {
      if (await LoginAuto()) {
        // 登录成功，跳转布局页
        $router.push('/layout')
      } else {
        $router.push('/login')
      }
    })
  }
}
</script>

<style scoped lang="scss">
</style>
