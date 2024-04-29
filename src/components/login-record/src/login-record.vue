<script setup lang="ts">
import ContentTable from '@/components/SecondPackage/content-table'
import {useCommonStore} from "@/stores/common/common";
import {storeToRefs} from "pinia";
import {defineProps, onMounted, ref} from "vue";
import {tableConfig} from "@/components/login-record/src/config/tableConfig";
import type {IpVo} from "@/service/common/type";

const store = useCommonStore()
const {getLoginInfoByPage, changeCurrent, getIp} = store
const {score, total, pageSize, list, getLoginInfoData, cityInfo} = storeToRefs(store)

const grade = ref()
const color = ref()
const colorStyle = ref()

const pro = defineProps({
  userId: {
    type: String,
    default: ""
  }
})

onMounted(async () => {
  await getLoginInfoByPage(pro.userId)
  await getIp()
  getColor()
})

// 分页加载数据
const getListByPage = async (page: Number) => {
  await getLoginInfoByPage(pro.userId)
  changeCurrent(page)
  getColor()
}
// 刷新数据
const pageList = async () => {
  await getLoginInfoByPage(pro.userId)
  getColor()
}

const getColor = () => {
  if (list.size == 0){
    return
  }
  if (score.value >= 90) {
    grade.value = "安全"
    color.value = "green"
  } else if (score.value >= 80) {
    grade.value = "较高"
    color.value = "orange"
  } else if (score.value >= 60) {
    grade.value = "较低"
    color.value = "yellow"
  } else {
    grade.value = "风险高"
    color.value = "red"
  }
  colorStyle.value = "color:" + color.value
}

</script>

<template>
  <div class="com-record">
    <div class="top">
      <span style="font-weight: bolder;margin-top: 10px;font-size: 18px">当前账号等级：<span :style="colorStyle">{{
          grade
        }}</span></span>
      <span class="warning" style="margin-bottom: 5px;margin-top: 5px"><el-icon style="margin-right: 5px"><Warning/></el-icon>只展示近90天的数据，且一天内重复登录将不记录</span>
      <span class="warning" style="margin-bottom: 10px"><el-icon style="margin-right: 5px"><Warning/></el-icon>当前IP为：{{
          cityInfo.address
        }}，将以该IP为依据判断账号安全等级</span>
    </div>
    <div class="bottom">
      <!--  表格数据-->
      <content-table
          :table-config="tableConfig"
          :table-data="list"
          :total="total"
          @page-change="getListByPage"
          :page-size="pageSize"
          @fresh="pageList"
          :current-page="getLoginInfoData.current"
          :isAdd=false
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  width: calc(100% - 10px);
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-left: 10px solid var(--theme-color);
  flex-direction: column;

  span {
    margin-left: 10px;
  }
}

.warning {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
