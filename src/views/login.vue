<template>
  <div class="container">
    <div class="login">
      <div class="item">
        <h2>Boot后台管理系统</h2>
      </div>
      <div class="item">
        <span>账号：</span>
        <div>
          <el-input size="small"
                    v-model="userName"
                    placeholder="请输入账号..." />
        </div>
      </div>
      <div class="item">
        <span>密码：</span>
        <div>
          <el-input size="small"
                    type="password"
                    v-model="password"
                    placeholder="请输入密码..." />
        </div>
      </div>
      <div class="item">
        <span>记住我：</span>
        <div>
          <el-checkbox v-model="remember"></el-checkbox>
        </div>
      </div>
      <div class="item">
        <span></span>
        <el-button size="small"
                   type="primary"
                   @click="adminLogin">登录</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入组合式api
import { reactive, toRefs, onBeforeMount } from 'vue'
import { Login, LoginAuto } from '../api/admin'
// 导入路由
import { useRouter } from 'vue-router'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup () {
    // 当前项目路由对象
    const $router = useRouter()

    const loginData = reactive({
      userName: '',
      password: '',
      remember: false
    })

    const adminLogin = async () => {
      // 解构出需要的参数
      const { userName, password, remember } = loginData
      const success = await Login({ userName, password, remember })
      if (success) {
        // 登录成功，跳转布局页
        $router.push('/layout')
      }
    }

    // 页面挂载之前
    onBeforeMount(async () => {
      if (await LoginAuto()) {
        // 登录成功，跳转布局页
        $router.push('/layout')
      }
    })

    return {
      ...toRefs(loginData),
      adminLogin
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgb(13, 54, 82),
    lightblue
  ); //向下渐变色
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 400px;
    // height: 200px;
    border: 1px solid #eee;
    border-radius: 6px;
    color: #eee;
    font-family: "仿宋";
    padding: 10px;
    .item {
      font-size: 14px;
      display: flex;
      align-items: center;
      margin: 10px 0;
      h2 {
        flex: 1; //抢占剩余宽度
        text-align: center;
      }
      span {
        width: 60px;
        text-align: right;
      }
      // 左边对齐处理方式
      div {
        flex: 1;
      }
    }
  }
}
</style>
