<script setup lang="ts">
import {onMounted, ref} from 'vue'
// 组件
import ModalForm from '@/components/SecondPackage/modal-form'
import ContentTable from '@/components/SecondPackage/content-table'
import FreshData from '@/components/base/fresh-data'
// 配置文件
import tableConfig from '@/views/main/school/fresh/config/tableConfig'
import modalConfig from './config/modalConfig'
// 仓库
import {useFreshStore} from '@/stores/main/school/fresh'
import {storeToRefs} from 'pinia'
import {useAuthStore} from "@/stores/user/auth";
import {showMsg} from "@/utils/message";

const modalRef = ref<InstanceType<typeof ModalForm>>()

const store = useFreshStore()
const {getFreshList, changeCurrent, addFresh: storeAddFresh, deleteFreshData, outFreshData} = store
const {freshList, count, pageSize, reqData} = storeToRefs(store)

const authStore = useAuthStore()
const {userInfo} = storeToRefs(authStore);

// 加载数据
onMounted(async () => {
  await getFreshList()
})
// 分页加载数据
const getFreshByPage = async (page: number) => {
  changeCurrent(page)
  await getFreshList()
}
// 弹出添加框
const showModal = () => {
  modalRef.value!.getVisible()
}
// 添加数据
const addFresh = async (data: any) => {
  // 处理数据
  const ids = data.fresh_ids
  const fresh_ids = ids.split(',')
  const fresh_data = {
    fresh_ids
  }
  await storeAddFresh(fresh_data)
}
// 页面刷新
const pageFresh = async () => {
  await getFreshList()
}
// 删除数据
const deleteFresh = async (value: any) => {
  const data = {
    fresh_id: value['user_id']
  }
  await deleteFreshData(data)
}
// 导出数据
const startBatchOut = async (data: number[], count: string) => {
  const range = count.split("-");
  let start = 1;
  let end = 1;
  if (range.length === 2) {
    start = range[0]
    end = range[1]
  }
  // 后端接口
  const res = await outFreshData({
    send_state: data,
    start: start,
    end: end
  })
  if (res.size == 0){
    showMsg("查询数据为空，不需要下载", "success")
    return
  }
  const blob = new Blob([res], {type: 'application/vnd.ms-excel'});
  const url = URL.createObjectURL(blob);
  const myDate = new Date();
  const fileName = userInfo.value.id + "_" + myDate.getFullYear() + myDate.getMonth() + myDate.getDate() + myDate.getHours() + myDate.getMinutes() + myDate.getSeconds() + ".xlsx";
  const link = document.createElement('a')
  link.href = url;
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link)
  link.click();
  URL.revokeObjectURL(url);
  showMsg("数据下载成功，只导出最近180的投递记录", "success")
}
</script>

<template>
  <!-- 应届生管理 -->
  <div class="fresh">
    <fresh-data/>
    <content-table
        :table-config="tableConfig"
        :table-data="freshList"
        :total="count"
        :is-edit="false"
        @page-change="getFreshByPage"
        @add="showModal"
        :page-size="pageSize"
        @fresh="pageFresh"
        :current-page="reqData.current"
        @delete="deleteFresh"
        :isDataOut="true"
        @batchOut="startBatchOut"
    >
      <template #userSex="scope">
        <el-button v-if="scope.row['user_sex'] === 0">男</el-button>
        <el-button v-if="scope.row['user_sex'] === 1">女</el-button>
      </template>
    </content-table>
    <!-- 弹出层/ 添加数据 -->
    <modal-form :form-config="modalConfig" ref="modalRef" @confirm="addFresh"></modal-form>
  </div>
</template>

<style lang="scss" scoped></style>
