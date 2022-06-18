
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
import { reactive, ref } from 'vue'
import BaseForm from '@/components/Form/BaseForm.vue'
import { formRules } from '@/util/config.js'
import { create } from '../../api/role'
import { $msgSuccess } from '../../util/tip'
const emit = defineEmits(['dataLoad'])
const state = reactive({
  dialogVisible: false,
  title: '',
  rules: {
    roleName: formRules('must'),
    roleKey: formRules('must'),
    status: formRules('must')
  },
  form: {
  },
  formData: {
  },
  formItem: [
    {
      label: '角色名称',
      type: 'text',
      value: 'roleName',
      width: 12
    },
    {
      label: '角色标识',
      type: 'text',
      value: 'roleKey',
      width: 12
    },
    {
      label: '是否启用',
      type: 'radio',
      value: 'status',
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
const open = () => {
  state.title = '新增'
  state.dialogVisible = true
}
const edit = (data) => {
  //   console.log(data)
}
// 确定
const confirm = () => formRef.value.submitForm()

// 提交数据
const submitForm = async (data) => {
  const result = await create(data)
  if (result && result.success) {
    $msgSuccess(result.message)
    state.dialogVisible = false
    dataLoad()
  }
}
const cancel = () => {
  state.dialogVisible = false
}
// 重新加载表格
const dataLoad = (params) => {
  emit('dataLoad', params)
}
defineExpose({ open, edit, dataLoad })
</script>
