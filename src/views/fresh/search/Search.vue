<script setup lang="ts">
import { onMounted } from 'vue'
import ComplexSearch from '@/components/SecondPackage/fresh/complex-search/src/complex-search.vue'
import { useJobStore } from '@/stores/fresh/job'
import JobCard from '@/components/fresh/job-card/src/JobCard.vue'
import { storeToRefs } from 'pinia'

const jobStore = useJobStore()
const { saveSearchContent, saveSearch, searchJob, changeCurrent, changeJobId, jobInfo } = jobStore
const { searchContent, jobSearchResult, count, pageSize, jobInfoResult } = storeToRefs(jobStore)

onMounted(async () => {
  await searchJob()
})

const searchJobList = async () => {
  await searchJob()
}

// 分页加载数据
const getJobListByPage = async (page: Number) => {
  await changeCurrent(page)
  await searchJob()
}
</script>

<template>
  <div class="search">
    <ComplexSearch @search="searchJobList"></ComplexSearch>
    <JobCard
      class="jobCard"
      :jobList="jobSearchResult"
      :total="count"
      :page-size="pageSize"
      @page-change="getJobListByPage"
      :current-page="searchContent.current"
      :is-page="true"
    />
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  width: 100%;
}
</style>
