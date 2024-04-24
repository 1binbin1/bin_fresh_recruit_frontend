<script setup lang="ts">
import {} from 'vue'
import FreshInfo from '@/components/fresh/fresh-info'
import ResumeList from '@/components/fresh/resume-list'
import router from '@/router'
import JobPurpose from '@/components/fresh/job-purpose/src/job-purpose.vue'

const openFirst = () => {
  router.push('/fresh/freshInfoResult')
}
const openSecond = () => {
  router.push('/fresh/freshInfoIntention')
}
</script>

<template>
  <div class="freshInfoIntention">
    <div class="result">
      <div class="result-left">
        <div class="result-left-top">
          <FreshInfo></FreshInfo>
        </div>
        <div class="result-left-bottom">
          <div class="bottom-top">
            <div class="top-left" @click="openFirst">投递进度</div>
            <div class="top-right" @click="openSecond">意向岗位</div>
          </div>
          <div class="contain">
            <JobPurpose></JobPurpose>
          </div>
        </div>
      </div>
      <div class="result-right">
        <ResumeList></ResumeList>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.freshInfoIntention {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result {
  width: 80%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.result-left {
  width: 70%;
}

.result-right {
  width: 29%;
  height: 100%;
}

.result-left-bottom {
  width: 100%;
  min-height: 380px;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
}

.bottom-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 55px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.top-left,
.top-right {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 6px;
  font-size: 22px;
  font-weight: bolder;
}

.top-left {
  cursor: pointer;
  border-radius: 8px 0 0 0;
}

.top-right {
  background-color: var(--theme-color);
  color: #fff !important;
  border-radius: 0 8px 0 0;
}
</style>
