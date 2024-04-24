<script setup lang="ts">
import Search from '@/components/fresh/search/src/Search.vue'
import JobCard from '@/components/fresh/job-card/src/JobCard.vue'
import { useCommonStore } from '@/stores/common/common'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useJobStore } from '@/stores/fresh/job'
import { defineEmits } from 'vue'

const jobStore = useJobStore()
const { saveSearchContent, saveSearch } = jobStore
const { searchContent } = storeToRefs(jobStore)
const comType = ref()
const comNum = ref()
const comCity = ref()
const value = ref(searchContent.value.job_type)
const input = ref(searchContent.value.search_content)

const commonStore = useCommonStore()
const { getdict } = commonStore
const { dictData } = storeToRefs(commonStore)

const getDictFn = async (num: number, array) => {
  const res = await getdict(num)
  array.value = res
}
const dictsPhoto = ref([])
getDictFn(7, dictsPhoto)

const dictsType = ref([])
getDictFn(1, dictsType)

const dictsCity = ref([])
getDictFn(2, dictsCity)

const comNums = ref([])
getDictFn(6, comNums)

const comTypes = ref([])
getDictFn(3, comTypes)

const dictFn = async () => {
  await getdict(1)
}
dictFn()

const emit = defineEmits(['search'])

const searchFn = () => {
  saveSearch({
    search_content: input.value ?? '',
    job_type: value.value ?? '',
    com_type: comType.value ?? '',
    com_num: comNum.value ?? '',
    com_address: comCity.value ?? ''
  })
  emit('search')
}
</script>

<template>
  <div class="complex">
    <!-- 简单搜索框-->
    <div class="searchContent">
      <el-input
        v-model="input"
        style="width: 100%; height: 100%"
        placeholder="请输入搜索内容"
        clearable
        class="input-with-select"
        @change="searchFn"
      >
        <template #prepend>
          <el-select
            v-model="value"
            placeholder="岗位类别"
            style="width: 160px; height: 100%"
            @change="searchFn"
            clearable
          >
            <el-option v-for="item in dictsType" :key="item" :label="item" :value="item" />
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
    <div class="select">
      <div class="one">公司城市</div>
      <el-select
        v-model="comCity"
        placeholder="请选择公司城市"
        style="width: 200px; margin-right: 25px"
        @change="searchFn"
        :clearable="true"
        :model-value="comCity"
      >
        <el-option v-for="item in dictsCity" :key="item" :label="item" :value="item" />
      </el-select>
      <div class="one">公司类别</div>
      <el-select
        v-model="comType"
        placeholder="请选择公司类别"
        style="width: 200px; margin-right: 25px"
        @change="searchFn"
        :clearable="true"
        :model-value="comType"
      >
        <el-option v-for="item in comTypes" :key="item" :label="item" :value="item" />
      </el-select>
      <div class="one">公司规模</div>
      <el-select
        v-model="comNum"
        placeholder="请选择公司规模"
        style="width: 200px; margin-right: 25px"
        @change="searchFn"
        :clearable="true"
        :model-value="comNum"
      >
        <el-option v-for="item in comNums" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.complex {
  background-color: #fff;
  width: 80%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  margin-bottom: 20px;
}

.search {
  width: 90%;
  margin-top: 20px;
}

.city {
  width: 90%;
  display: flex;
  flex-direction: column;
}

.city .title {
  color: var(--theme-color);
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 17px;
  padding-top: 20px;
}

.city .line {
  width: 60px;
  height: 3px;
  background-color: var(--theme-color);
  margin-top: 4px;
  margin-bottom: 4px;
}

.cityList span {
  font-size: 18px;
  padding-right: 25px;
  cursor: pointer;
}

.cityList span:hover {
  color: var(--theme-color);
}

.select {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  align-items: center;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.one {
  margin-right: 10px;
}

.searchContent {
  height: 45px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  border: 2px solid var(--theme-color);
  margin-top: 20px;
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
