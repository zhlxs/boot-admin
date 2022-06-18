<template>
  <!-- page-count 设置为5到21的奇数即可 -->
  <!-- <el-config-provider :locale="locale"></el-config-provider> -->
  <el-pagination v-model:current-page="state.currentPage"
                 v-model:page-size="state.pageSize"
                 background
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total"
                 :hide-on-single-page="false"
                 :pager-count="7"
                 @current-change="handleCurrentChange"
                 @size-change="handleSizeChange" />
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
// import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文

defineProps({
  queryData: {
    // 查询数据
    type: Object,
    default: () => {
      return { pageSize: 10, currentPage: 1 }
    }
  },
  total: {
    type: Number,
    default: () => 0
  }
})

const { proxy } = getCurrentInstance()

// 将table 组件传过来值设置成响应式 在上面使用v-model:进行绑定,在下方使用watch进行监听并传给父组件
const state = reactive({
  currentPage: proxy.queryData.currentPage,
  pageSize: proxy.queryData.pageSize
})

const emit = defineEmits(['pagination'])
// 改变每页展示的数据条数
const handleSizeChange = (val) => {
  state.pageSize = val
  emit('pagination', state)
}
// 改变当前页的页码
const handleCurrentChange = (val) => {
  state.currentPage = val
  emit('pagination', state)
}

// watch(state, (newVal) => {
//   emit('pagination', newVal)
// })
</script>
<style lang="scss" scoped>
.el-pagination {
  padding: 10px;
  :deep(.el-select) {
    .el-input__inner {
      height: 28px;
    }
  }
}
</style>
