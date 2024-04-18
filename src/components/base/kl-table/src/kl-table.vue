<script setup lang="ts">
import {} from 'vue'
import type {IpropList} from '..'
// props
defineProps({
  isShowIndex: {
    type: Boolean,
    default: false
  },
  isShowSelect: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  propList: {
    type: Array < IpropList >,
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
  currentPage: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['pageChange'])
const pageChange = (value: number) => {
  emit('pageChange', value)
}
</script>

<template>
  <div class="table">
    <div class="header">
      <div class="title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="titleHandler">
        <slot name="titleHandler"></slot>
      </div>
    </div>
    <div class="container">
      <!-- 表格本体 -->
      <el-table :data="tableData"
                stripe
                style="width: 100%"
                highlight-current-row
                empty-text="暂无数据"
                show-overflow-tooltip
                :tooltip-options="{ effect:'light',placement:'bottom', showArrow: true, width: '80px'  }">
        <el-table-column align="center" type="selection" width="55" v-if="isShowSelect"/>
        <el-table-column align="center" type="index" width="55" v-if="isShowIndex"/>
        <template v-for="prop in propList" :key="prop.field">
          <el-table-column v-bind="prop" align="center">
            <template #default="scope">
              <slot :name="prop.slotName" :row="scope.row">
                {{ prop.field ? scope.row[prop.field] : '' }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <!-- 后面用来放分页器 -->
      <el-pagination
          background
          layout="prev, pager, next,jumper,total"
          :total="total"
          :page-size="pageSize"
          @current-change="pageChange"
          :current-page="currentPage"
          hide-on-single-page
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  // margin: 10px;
  font-weight: 700;
  font-size: 18px;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 30px;
}

.footer {
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
