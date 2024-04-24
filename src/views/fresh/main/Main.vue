<script setup lang="ts">
import Search from '@/components/fresh/search/src/Search.vue'
import JobCard from '@/components/fresh/job-card/src/JobCard.vue'
import { useCommonStore } from '@/stores/common/common'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useJobStore } from '@/stores/fresh/job'
import { useMainStore } from '@/stores/fresh/main'
import { onMounted } from 'vue'

const jobStore = useJobStore()
const { saveSearchContent, searchJob } = jobStore

const mainStore = useMainStore()
const { getRecommendList } = mainStore
const { recommendResult } = storeToRefs(mainStore)

const commonStore = useCommonStore()
const { getdict } = commonStore

onMounted(async () => {
  await getRecommendList()
})

const fn = async (content, jobType) => {
  await saveSearchContent({
    search_content: content,
    job_type: jobType
  })
  await searchJob()
}

const getDictFn = async (num: number, array) => {
  const res = await getdict(num)
  array.value = res
}
const dictsPhoto = ref([])
getDictFn(7, dictsPhoto)

const dictsType = ref([])
getDictFn(1, dictsType)

// 点击岗位类别
const clickJobType = (data: any) => {
  saveSearchContent({
    job_type: data
  })
}
</script>

<template>
  <div class="freshMain">
    <Search @search="fn" />
    <!--  轮播图-->
    <div class="center">
      <div class="left">
        <ul class="leftUl">
          <li class="leftUi" v-for="item in dictsType" :key="item" @click="clickJobType(item)">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="right">
        <el-carousel :interval="5000" arrow="always" style="height: 100%; width: 100%" autoplay>
          <el-carousel-item v-for="item in dictsPhoto" :key="item">
            <div class="img">
              <img :src="item" alt="" class="carouselImg" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--  岗位卡片-->
    <div class="content">
      <div class="recommend">推荐岗位</div>
      <div class="line"></div>
    </div>
    <JobCard
      class="jobCard"
      @getJobInfo="getJobInfo"
      @getComInfo="getComInfo"
      :jobList="recommendResult"
    />
  </div>
</template>

<style lang="scss" scoped>
.freshMain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
}

.center {
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 450px;
  margin-top: 30px;
  justify-content: space-between;
}

.right {
  width: 70%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border: 2px solid rgba(83, 80, 80, 0.1);
  border-radius: 10px;
}

.img .carouselImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

:deep(.el-carousel__container) {
  height: 100%;
}

:deep(.el-carousel__item.is-animating) {
  border-radius: 10px;
}

.center .left {
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 10px;
  height: 100%;
  width: 29%;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

// 列表
.leftUl {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

.leftUi {
  font-size: 16px;
  padding: 9px 0 9px 10px;
  flex-basis: 47%;
}

.leftUi:hover {
  background-color: var(--theme-color);
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
}

// 岗位卡片
.jobCard {
  margin-top: 20px;
}
.content {
  margin-top: 25px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.recommend {
  color: var(--theme-color);
  font-size: 28px;
  font-weight: bold;
}
.line {
  width: 100%;
  height: 4px;
  background-color: var(--theme-color);
  margin-top: 10px;
}
</style>
