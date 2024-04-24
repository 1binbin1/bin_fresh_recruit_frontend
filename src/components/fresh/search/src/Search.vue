<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref } from 'vue'
import { useCommonStore } from '@/stores/common/common'
import { storeToRefs } from 'pinia'
const commonStore = useCommonStore()
const { getdict } = commonStore
const { dictData } = storeToRefs(commonStore)

const dictFn = async () => {
  await getdict(1)
}
dictFn()

const emit = defineEmits(['search'])

const searchFn = () => {
  emit('search', input.value, value.value)
}

const value = ref()
const input = ref()
</script>

<template>
  <!-- 简单搜索框-->
  <div class="searchContent">
    <el-input
      v-model="input"
      style="width: 100%; height: 100%"
      placeholder="请输入搜索内容"
      clearable
      class="input-with-select"
    >
      <template #prepend>
        <el-select
          v-model="value"
          placeholder="岗位类别"
          style="width: 160px; height: 100%"
          clearable
          @change="searchFn"
        >
          <el-option v-for="item in dictData" :key="item" :label="item" :value="item" />
        </el-select>
      </template>
      <template #append>
        <el-button
          icon="Search"
          class="searchButton"
          style="
            background-color: var(--theme-color);
            height: 100%;
            border-radius: 0;
            width: 80px;
            color: #fff;
            font-size: 20px;
            font-weight: bold;
          "
          @click="searchFn"
        />
      </template>
    </el-input>
  </div>
</template>

<style lang="scss" scoped>
.searchContent {
  height: 45px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 60%;
  border: 2px solid var(--theme-color);
}

:deep(.el-select__wrapper) {
  height: 100%;
}

:deep(.el-input-group--prepend .el-input-group__prepend .el-select .el-select__wrapper) {
  background-color: #fff;
}
:deep(.el-select__placeholder) {
  font-size: 16px;
  font-weight: normal;
}
:deep(.el-input-group--append > .el-input__wrapper) {
  font-size: 16px;
}
</style>
