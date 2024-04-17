<script setup lang="ts">
import type {PropType, defineProps, defineEmits} from 'vue'
import type {ItableConfig} from '@/components/base/kl-table'
import {showBox, showMsg} from "@/utils/message";
import FileUpload from "@/components/base/file-upload";
import {ref} from "vue";
import {InfoFilled} from '@element-plus/icons-vue'
import DataOut from "@/components/base/data-out";

const fileUploadRef = ref<InstanceType<typeof FileUpload>>()
const dataOutRef = ref<InstanceType<typeof DataOut>>()

const props = defineProps({
  tableConfig: {
    type: Object as PropType<ItableConfig>,
    required: true
  },
  tableData: {
    type: Array,
    required: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    required: true
  },
  isEdit: {
    type: Boolean,
    default: true
  },
  isDelete: {
    type: Boolean,
    default: true
  },
  isAdd: {
    type: Boolean,
    default: true
  },
  currentPage: {
    type: Number,
    default: 1
  },
  isBatchAdd: {
    type: Boolean,
    default: false
  },
  isDataOut: {
    type: Boolean,
    default: false
  }
})
// slot处理
const allSlots = props.tableConfig.propList.filter((item) => {
  if (!item.slotName) return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})
// emits
const emits = defineEmits(['edit', 'delete', 'add', 'pageChange', 'fresh', 'batchAdd','batchOut'])
// 新增按钮
const addFn = () => {
  emits('add')
}
// 编辑按钮
const editFn = (value: any) => {
  emits('edit', value)
}
// 批量新增
const batchAddFn = (file: any) => {
  emits('batchAdd', file)
}
// 数据导出
const batchOutFn = (data: number[]) => {
  if (data.length != 0){
    emits('batchOut', data)
  }else {
    showMsg("请选择导出范围","error")
  }
}
// 删除按钮
const deleteFn = (value: any) => {
  emits('delete', value)
}
const pageChange = (value: any) => {
  emits('pageChange', value)
}
// 刷新按钮
const pageFresh = () => {
  emits('fresh')
}

// 批量可视化
const showBatch = () => {
  fileUploadRef.value!.getVisible()
}

// 批量可视化
const showDataOut = () => {
  dataOutRef.value!.getVisible()
}
</script>

<template>
  <div class="table">
    <klTable
        :table-data="tableData"
        v-bind="tableConfig"
        @pageChange="pageChange"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
    >
      <!-- 顶部按钮处理 -->
      <template #titleHandler>
        <div class="titleHandler">
          <el-button type="success" size="large" icon="Plus" v-if="isDataOut" @click="showDataOut"
          >数据导出
          </el-button>
          <el-button type="primary" @click="addFn()" size="large" icon="Plus" v-if="isAdd"
          >新增数据
          </el-button
          >
          <el-button type="success" size="large" icon="Plus" v-if="isBatchAdd" @click="showBatch"
          >批量新增
          </el-button>
          <el-button icon="Refresh" circle style="margin-left: 20px" @click="pageFresh"/>
          <FileUpload ref="fileUploadRef" @batchAdd="batchAddFn"></FileUpload>
          <DataOut ref="dataOutRef" @batchOut="batchOutFn"></DataOut>
        </div>
      </template>
      <!-- 时间处理 -->
      <template #createAt="scoped">
        {{ $filter.formatUTCtoTime(scoped.row.create_time) }}
      </template>
      <template #updateAt="scoped">
        {{ $filter.formatUTCtoTime(scoped.row.update_time) }}
      </template>
      <!-- 按钮处理 -->
      <template #handler="scoped">
        <el-button type="warning" @click="editFn(scoped.row)" icon="Edit" v-if="isEdit"
        >编辑
        </el-button>
        <el-popconfirm title="是否确定删除" @confirm="deleteFn(scoped.row)" width="200px" confirm-button-text="确认"
                       cancel-button-text="取消" :icon="InfoFilled"
                       icon-color="#626AEF">
          <template #reference>
            <el-button type="danger" icon="Delete" v-if="isDelete"
            >删除
            </el-button
            >
          </template>
        </el-popconfirm>

      </template>
      <template v-for="item in allSlots" :key="item.field" #[item.slotName!]="scoped">
        <slot :name="item.slotName" :row="scoped.row"></slot>
      </template>
    </klTable>
  </div>
</template>

<style lang="scss" scoped>
.titleHandler {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
