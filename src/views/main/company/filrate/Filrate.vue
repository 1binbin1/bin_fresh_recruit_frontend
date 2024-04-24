<script setup lang="ts">
import { onMounted } from 'vue'
import ContentTable from '@/components/SecondPackage/content-table'
import { tableConfig } from '@/views/main/company/filrate/config/tableConfig'
import updateConfig from '@/views/main/company/filrate/config/updateConfig'
import searchConfig from '@/views/main/company/filrate/config/searchConfig'

import { useFilrateStore } from '@/stores/main/company/filrate'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import ModalForm from '@/components/SecondPackage/modal-form'
import SearchForm from '@/components/SecondPackage/search-form/src/search-form.vue'

const modalRef = ref<InstanceType<typeof ModalForm>>()
const store = useFilrateStore()
const { getSendList, updateSendStatus, changeSearchData, changeCurrent } = store
const { sendList, count, pageSize, reqData } = storeToRefs(store)

// 加载数据
onMounted(async () => {
  await getSendList()
})
// 弹出修改框
const updateData = ref()
const showUpdateModal = (value: any) => {
  modalRef.value!.getVisible()
  updateData.value = { ...value }
}
// 更新状态
const updateJobById = async (data: any) => {
  const updateReq = ref({
    user_id: data.user_id,
    job_id: data.job_id,
    send_state: data.send_state,
    resume_id: data.resume_id
  })
  await updateSendStatus(updateReq.value)
}
// 搜索
const searchSend = async (data: any) => {
  await changeSearchData({
    send_status: data.send_status,
    job_name: data.job_name
  })
  await getSendList()
}
// 加载分页数据
const getJobListByPage = async (page: Number) => {
  changeCurrent(page)
  await getSendList()
}
// 刷新数据
const pageSend = async () => {
  await changeSearchData({
    send_status: -1,
    job_name: ''
  })
  await getSendList()
}
</script>

<template>
  <!-- 简历筛选 -->
  <div class="filrate">
    <search-form :form-config="searchConfig" @search="searchSend"></search-form>
    <content-table
      :table-config="tableConfig"
      :table-data="sendList"
      :total="count"
      @page-change="getJobListByPage"
      :page-size="pageSize"
      @fresh="pageSend"
      :is-delete="false"
      @edit="showUpdateModal"
      :is-add="false"
      :current-page="reqData.current"
    >
      <template #sendState="scope">
        <span v-if="scope.row['send_state'] === 0" style="color: var(--theme-color)">已投递</span>
        <span v-if="scope.row['send_state'] === 1">被查看</span>
        <span v-if="scope.row['send_state'] === 2">邀约面试</span>
        <span v-if="scope.row['send_state'] === 3">初筛不通过</span>
        <span v-if="scope.row['send_state'] === 4" style="color: red">流程结束</span>
        <span v-if="scope.row['send_state'] === 5" style="color: green">应聘成功</span>
      </template>
      <template #userNameLink="scope">
        <el-link type="success" target="_blank" :href="scope.row['user_name_link']"
          >点击下载简历</el-link
        >
      </template>
    </content-table>
    <modal-form
      :form-config="updateConfig"
      ref="modalRef"
      :data="updateData"
      @confirm="updateJobById"
    ></modal-form>
  </div>
</template>

<style lang="scss" scoped></style>
