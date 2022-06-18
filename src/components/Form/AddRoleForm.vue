
<template>
  <div v-if="state.dialogVisible">
    <el-dialog v-model="state.dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
      :title="state.title" width="40%">
      <BaseForm ref="formRef" :form-data="state.formData" :form-item="state.formItem" :rules="state.rules"
        :dialog-visible="state.dialogVisible" @submitForm="submitForm" />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import BaseForm from '@/components/Form/BaseForm.vue'
import { formRules } from '@/util/config.js'
import { create, update } from '../../api/role'
import { $msgSuccess } from '../../util/tip'
const emit = defineEmits(['dataLoad'])
const { proxy } = getCurrentInstance()
defineProps({
  formBody: {
    // 表单数据
    type: Object,
    default: () => { }
  }
})

const state = reactive({
  dialogVisible: false,
  title: '',
  rules: {
    roleName: formRules('must', '角色名称'),
    roleKey: formRules('must', '角色标识'),
    status: formRules('must', '是否启用')
  },
  form: {
  },
  formData: {
    id: '',
    roleName: '',
    roleKey: '',
    status: '0'
  },
  formItem: [
    {
      label: '角色名称',
      placeholder: '角色名称',
      type: 'text',
      value: 'roleName',
      width: 12,
      disabled: false
    },
    {
      label: '角色标识',
      placeholder: '角色标识',
      type: 'text',
      value: 'roleKey',
      width: 12,
      disabled: false
    },
    {
      label: '是否启用',
      type: 'radio',
      value: 'status',
      disabled: false,
      children:
        [
          {
            label: '是',
            value: '0'
          },
          {
            label: '否',
            value: '1'
          }
        ],
      width: 12
    }
  ]
})

const formRef = ref(null)
const open = (title) => {
  state.title = title || '新增'
  state.dialogVisible = true
  if (title === '编辑') {
    state.formData = proxy.formBody
    state.formItem.map(item => {
      if (item.value !== 'roleName') {
        item.disabled = true
      }
    })
  } else if (title === '查看') {
    state.formData = proxy.formBody
    state.formItem.map(item => {
      item.disabled = true
    })
  }
}
const edit = (data) => {
  //   console.log(data)
}
// 确定
const confirm = () => formRef.value.submitForm()

// 提交数据
const submitForm = async (data) => {
  if (state.title === '新增') {
    const result = await create(data)
    if (result && result.success) {
      $msgSuccess(result.message)
      state.dialogVisible = false
      dataLoad()
      cancel()
    }
  } else if (state.title === '编辑') {
    const params = {
      id: data.id,
      roleName: data.roleName
    }
    await update(params).then(res => {
      if (res.success) {
        $msgSuccess(res.message)
        state.dialogVisible = false
        dataLoad()
        cancel()
      }
    })
  } else {
    cancel()
  }
}
const cancel = () => {
  state.dialogVisible = false
  if (state.title === '查看' || state.title === '编辑') {
    state.formItem.map(item => {
      item.disabled = false
    })
    state.formData = {}
  }
}
// 重新加载表格
const dataLoad = (params) => {
  emit('dataLoad', params)
}
defineExpose({ open, edit, dataLoad })
</script>
