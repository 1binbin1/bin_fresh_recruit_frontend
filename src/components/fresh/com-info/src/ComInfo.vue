<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/fresh/main'
import { defineEmits, defineProps, onMounted } from 'vue'
import router from '@/router'
import { useJobStore } from '@/stores/fresh/job'

const jobStore = useJobStore()
const { changeCurrent, changeComId } = jobStore
const { count, pageSize } = storeToRefs(jobStore)

defineProps({
  avatar: {
    type: String
  },
  comName: {
    type: String,
    default: '暂无名称'
  },
  comInfo: {
    type: String,
    default: '暂无介绍'
  },
  comAddress: {
    type: String,
    default: '暂无地址'
  },
  comType: {
    type: String,
    default: '暂无类型'
  },
  comTime: {
    type: String,
    default: '暂无成立时间'
  },
  comNum: {
    type: String,
    default: '暂无公司规模'
  },
  comId: {
    type: String
  }
})

const emit = defineEmits(['getJobInfo'])
const clickFn = (data: any) => {
  emit('getJobInfo', data)
}

const getComAllJob = (data: string) => {
  changeComId(data)
  router.push('/fresh/companyJob')
}
</script>

<template>
  <div class="comBox">
    <span class="title">公司基本情况</span>
    <div class="comImg">
      <div class="avatar">
        <img :src="avatar" alt="暂无图片" style="width: 100%" />
      </div>
      <div class="comName">{{ comName }}</div>
    </div>
    <div class="center">
      <p>{{ comInfo }}</p>
    </div>
    <div class="info">
      <el-icon>
        <Location />
      </el-icon>
      <span>{{ comAddress }}</span>
    </div>
    <div class="info">
      <el-icon>
        <Tickets />
      </el-icon>
      <span>{{ comType }}</span>
    </div>
    <div class="info">
      <el-icon>
        <PriceTag />
      </el-icon>
      <span>{{ comNum }}</span>
    </div>
    <div class="info">
      <el-icon>
        <Clock />
      </el-icon>
      <span>{{ comTime }}</span>
    </div>
    <div class="bottom">
      <el-button @click="getComAllJob(comId)">查看全部岗位</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comBox {
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 470px;
  background-color: #fff;
  align-items: flex-start;
}

.title {
  font-size: 20px;
  letter-spacing: 2px;
}

.comImg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.comName {
  display: flex;
  justify-content: center;
  align-content: center;
}

.avatar {
  margin-right: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #eaeaea;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
}

.info {
  margin-top: 15px;
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 16px;
}

.info span {
  margin-left: 5px;
}

.center {
  margin-top: 15px;
  background-color: rgb(248, 252, 251);
  border-radius: 10px;
  padding: 5px;
  width: 95%;
  min-height: 100px;
}

p {
  font-size: 14px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
}

// 按钮
.bottom {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

:deep(.el-button) {
  width: 180px;
  height: 40px;
  font-size: 16px;
  letter-spacing: 2px;
  color: var(--theme-color);
  font-weight: bolder;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid var(--theme-color);
}

:deep(.el-button:hover) {
  transform: scale(1.03);
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}
</style>
