<template>
  <!-- 搜索框 -->
  <FormSearch :form-item="formItem" :form-data="formData" @searchForm="getList" @clearForm="clearForm" />
  <div class="container">
    <!-- 新增按钮 -->
    <div class="btn-list">
      <el-button type="primary" icon="Plus" @click="addClue">新增</el-button>
    </div>
  </div>
  <!-- 表格 -->
  <BaseTable :table-head="tableHead" :table-data="tableData" :selection="true" :index="true" :setting="false"
    :formselect="formselect" :operation="['view', 'edit', 'del']" :total="pageData.total" :list-loading="listLoading"
    style="height:calc(100vh - 320px);" @handleView="handleView" @handleEdit="handleEdit" @handleDelete="handleDelete"
    @paginationChange="paginationChange" />
  <!-- 新增 -->
  <AddForm ref="AddFormRef" @dataLoad="LoadTableData" :formBody="formBody" />
</template>

<script>
import { reactive, toRefs, ref, onMounted, watch } from 'vue'
import { pager, del } from '../../api/role'
import FormSearch from '../../components/Search/FormSearch.vue'
import BaseTable from '@/components/Table/BaseTable.vue'
import AddForm from '@/components/Form/AddRoleForm.vue'
import { $msgSuccess } from '../../util/tip'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Role',
  components: {
    FormSearch,
    BaseTable,
    AddForm
  },
  setup () {
    // 表头数据
    const tableHead = [
      {
        prop: 'roleName',
        label: '角色名称',
        width: '160'
      },
      {
        prop: 'roleKey',
        label: '角色标识',
        width: '160'
      },
      {
        prop: 'createTime',
        label: '创建时间',
        width: '200'
      }
    ]

    // 查询数组
    const formItem = [
      {
        label: '角色名称:',
        value: 'roleName',
        width: 4,
        type: 'text'
      }
    ]
    // 查询参数封装
    const formData = reactive({ roleName: '' })
    const formBody =
    {
      id: '',
      roleName: '',
      roleKey: '',
      status: '0'
    }
    const queryData = {
      current: 1,
      size: 10,
      roleName: formData.roleName
    }
    // 新增表单
    const AddFormRef = ref(null)
    const listLoading = ref(true)
    // 模拟数据
    // setTimeout(() => {
    //   for (let i = 0; i < 100; i++) {
    //     tableData.push({
    //       index: i + 1,
    //       roleName: `wcy${i + 1}`,
    //       roleKey: 18
    //     })
    //   }
    //   listLoading.value = false
    // }, 1000)

    const addClue = () => {
      AddFormRef.value.open()
    }
    const handleView = row => {
      formBody.roleName = row.roleName
      formBody.roleKey = row.roleKey
      formBody.status = row.status + ''
      AddFormRef.value.open('查看')
    }
    const handleEdit = row => {
      formBody.id = row.id
      formBody.roleName = row.roleName
      formBody.roleKey = row.roleKey
      formBody.status = row.status + ''
      if (formBody.id) {
        AddFormRef.value.open('编辑')
      }
    }
    const handleDelete = row => {
      del({ id: row.id }).then(res => {
        if (res.success && res.success === true) {
          $msgSuccess(res.message)
          LoadTableData()
        }
      })
    }
    // 查询
    const getList = val => {
      const params = Object.assign(queryData, val)
      listLoading.value = true
      pager(params).then(res => {
        if (res.success && res.success === true) {
          listLoading.value = false
          pageData.total = res.total
        }
        if (res.records && res.records.length >= 0) {
          dataRef.tableData = res.records
        }
      })
    }
    // 重置
    const clearForm = () => {
      queryData.roleName = ''
      LoadTableData()
    }
    const paginationChange = data => {
      if (data) {
        queryData.current = data.currentPage
        queryData.size = data.pageSize
        LoadTableData()
      }
    }
    // 表格数据
    const dataRef = reactive({
      tableData: []
    })
    // 分页数据结果
    const pageData = reactive({
      total: 0
    })
    // 分页参数
    const formselect = reactive({ page: queryData.current, limit: queryData.size })
    // 分页查询
    const LoadTableData = async () => {
      const data = await pager(queryData)
      if (data.success && data.success === true) {
        listLoading.value = false
        pageData.total = data.total
      }
      if (data.records && data.records.length > 0) {
        dataRef.tableData = data.records
      }
    }
    // LoadTableData()
    onMounted(async () => {
      await LoadTableData()
    })

    watch(queryData, (newVal) => {
      formselect.page = newVal.current
      formselect.limit = newVal.pageSize
    })
    return {
      ...toRefs(dataRef),
      formItem,
      formData,
      getList,
      clearForm,
      tableHead,
      AddFormRef,
      listLoading,
      addClue,
      handleView,
      handleEdit,
      handleDelete,
      paginationChange,
      pageData,
      formselect,
      LoadTableData,
      formBody
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .btn-list {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
