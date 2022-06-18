<template>
  <div class="container">
    <div class="left"
         :style="{width:leftMenuOpen?'65px':'200px',background:currentTheme}">
      <div class="logo">
        <div>{{!leftMenuOpen?'Boot后台管理系统':'Boot'}}</div>
      </div>
      <el-menu active-text-color="#ffd04b"
               :background-color="currentTheme"
               class="el-menu-vertical-demo"
               :default-active="activeMenu"
               text-color="#fff"
               :collapse="leftMenuOpen"
               router>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <user />
            </el-icon>
            <span>账户管理</span>
          </template>
          <el-menu-item index="/layout/admin">用户管理</el-menu-item>
          <el-menu-item index="/layout/role">角色管理</el-menu-item>
          <el-menu-item index="/layout/auth">权限管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon>
            <Collection />
          </el-icon>
          <span>产品管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <List />
          </el-icon>
          <span>设备管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <Tickets />
          </el-icon>
          <span>设备日志</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon>
            <setting />
          </el-icon>
          <span>系统设置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="top"
           :style="{background:currentTheme}">
        <div class="icon-fold"
             @click="leftMenuOpen = !leftMenuOpen">
          <el-icon :size="20"
                   v-show="!leftMenuOpen">
            <Fold />
          </el-icon>
          <el-icon :size="20"
                   v-show="leftMenuOpen">
            <Expand />
          </el-icon>
        </div>
        <div class="menu-class">
          <el-menu :default-active="activeIndex1"
                   class="el-menu-demo"
                   mode="horizontal"
                   :background-color="currentTheme"
                   text-color="#fff"
                   active-text-color="#ffd04b">
            <el-menu-item index="1">
              <el-icon>
                <HomeFilled />
              </el-icon>
              首页
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <Message />
              </el-icon>
              邮件
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <ChatDotSquare />
              </el-icon>
              消息
            </el-menu-item>
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <Switch />
                </el-icon>切换皮肤
              </template>
              <el-menu-item @click="changeTheme(i)"
                            :index="'4-'+i"
                            :key="i"
                            v-for="(item,i) in getTheme">{{item}}</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon>
                  <Avatar />
                </el-icon>{{userInfo}}
              </template>
              <el-menu-item index="5-1">用户信息</el-menu-item>
              <el-menu-item index="5-2">修改密码</el-menu-item>
              <el-menu-item index="5-3"
                            @click="exit">退出系统</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
      <div class="bottom">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
// 导入路由
import { useRouter } from 'vue-router'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  setup () {
    // 当前项目路由对象
    const $router = useRouter()
    // 全局状态管理对象
    const $store = useStore()
    if (localStorage.getItem('color')) {
      const temp = {
        name: localStorage.getItem('theme'),
        color: localStorage.getItem('color')
      }
      $store.dispatch('theme/setThemeColor', temp)
    }
    // 定义菜单数据
    const menuList = reactive({
      activeIndex1: '1',
      activeMenu: '/layout/admin'
    })
    const data = reactive({
      // 左侧菜单折叠参数
      leftMenuOpen: false,
      userInfo: localStorage.getItem('userName') ? localStorage.getItem('userName') : '个人中心'
    })
    // 从全局状态中获取颜色数组
    const getTheme = computed(() => {
      return $store.getters['theme/getTheme']
    })
    const currentTheme = computed(() => {
      return $store.state.theme.currentTheme.color
    })
    // 切换主题
    const changeTheme = (index) => {
      const color = $store.state.theme.themes[index]
      localStorage.setItem('color', color.color)
      localStorage.setItem('theme', color.name)
      $store.dispatch('theme/setThemeColor', color)
    }

    // 退出系统
    const exit = () => {
      sessionStorage.clear()
      localStorage.clear()
      $router.push('/login')
    }

    onBeforeMount(() => {
      const path = $router.currentRoute.value.path
      menuList.activeMenu = path
      const token = sessionStorage.getItem('token')
      if (!token) { $router.push('/login') }
    })

    return {
      ...toRefs(menuList),
      ...toRefs(data),
      getTheme,
      currentTheme,
      changeTheme,
      exit
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .el-menu {
    border-right: none;
  }
  width: 100vw;
  height: 100vh;
  display: flex;
  .left {
    // width: 200px;
    transition: all 0.5s;
    // background: #545c64;
    .logo {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      // overflow: hidden;
      div {
        color: white;
        font-size: 18px;
        border: 1px solid #eee;
        padding: 4px 10px;
        border-radius: 4px;
        // 不收缩
        flex-shrink: 0;
      }
    }
  }
  .right {
    flex: 1;
    // background: lightseagreen;
    display: flex;
    flex-direction: column;
    .top {
      height: 60px;
      display: flex;
      // flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
      .icon-fold {
        color: white;
        // padding-left: 5px;
      }
      .menu-class {
        width: 650px;
      }
      // background: #545c64;
    }
    .bottom {
      flex: 1;
      padding: 5px;
      // background: grey;
    }
  }
}
</style>
