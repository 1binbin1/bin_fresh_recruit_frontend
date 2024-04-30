<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useMainStore} from '@/stores/fresh/main'
import {defineEmits, defineProps, onMounted} from 'vue'
import router from '@/router'
import {useJobStore} from '@/stores/fresh/job'
import {useInfoStore} from '@/stores/main/company/info'
import ChatWindow from '@/components/SecondPackage/chat-window'
import localCache from "@/utils/localCache";
import {ref} from "vue";
import {useChatStore} from "@/stores/chat/chatStore";

const chatWindowModal = ref<InstanceType<typeof ChatWindow>>()
const chatStore = useChatStore()
const {getChatList, changeComId: changeComIdByChat} = chatStore
const jobStore = useJobStore()
const { chatList, comInfo } = storeToRefs(chatStore)
const {
  saveSearchContent,
  saveSearch,
  searchJob,
  changeCurrent,
  changeJobId,
  jobInfo,
  changeComId
} = jobStore
const {count, pageSize, jobInfoResult} = storeToRefs(jobStore)

defineProps({
  jobList: {
    type: []
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
  },
  isPage: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['pageChange'])
const clickFn = (data: any) => {
  router.push('/fresh/jobInfo')
  changeJobId(data.job_id)
  changeComId(data.com_id)
}
const getFn = (data: any) => {
  changeComId(data)
  router.push('/fresh/companyJob')
}
const pageChange = (value: number) => {
  emit('pageChange', value)
}
// 沟通弹窗
const showChatWindow = async (data: any) => {
  await chatWindowModal.value!.getVisible()
  await changeComIdByChat(data.com_id)
  await getChatList({
    com_id: data.com_id,
    user_id: localCache.getCache('userId')
  })
}
</script>

<template>
  <div class="jobContent">
    <div class="card-empty" v-if="!jobList || jobList.length === 0"></div>
    <div class="card" v-for="item in jobList" :key="item">
      <div class="top">
        <div class="left">
          <div class="name"  @click="clickFn(item)">{{ item.job_name }}</div>
          <el-icon class="chat"  @click="showChatWindow(item)">
            <ChatDotSquare/>
          </el-icon>
        </div>
        <div class="right"  @click="clickFn(item)">{{ item.job_pay }}</div>
      </div>
      <div class="center" @click="clickFn(item)">
        <p>{{ item.job_require }}</p>
      </div>
      <div class="bottom" @click="getFn(item.com_id)">
        <div class="bottom-left">
          <div class="avatar">
            <img :src="item.a_avatar" alt="暂无图片"/>
          </div>
          <div class="comName">{{ item.com_name }}</div>
        </div>
        <div class="bottom-right">{{ item.com_address }}</div>
      </div>
    </div>
  </div>
  <ChatWindow ref="chatWindowModal" :chatList="chatList" :userInfo="comInfo"></ChatWindow>
  <div class="footer">
    <!-- 后面用来放分页器 -->
    <el-pagination
        background
        layout="prev, pager, next,jumper,total"
        :total="total"
        :page-size="pageSize"
        @current-change="pageChange"
        :current-page="currentPage"
        v-if="isPage"
        hide-on-single-page
    />
  </div>
</template>

<style lang="scss" scoped>
.card-empty {
  width: 1536px;
}

.jobContent {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 80%;
  margin-bottom: 10px;
  margin-top: 10px;
}

.card {
  flex: 1;
  margin: 0 25px 25px 0;
  width: calc((100% - 50px) / 3);
  min-width: calc((100% - 50px) / 3);
  max-width: calc((100% - 50px) / 3);
}

.card:nth-child(3n) {
  // 去除第3n个的margin-right
  margin-right: 0;
}

// 内容区
.card {
  cursor: pointer;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  height: auto;
  border-radius: 12px;
}

.card:hover {
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
}

// 顶部
.top {
  display: flex;
  justify-content: space-between;
  margin: 12px 12px 0 15px;
}

.top .right {
  color: red;
  font-size: 18px;
}

.top .left {
  display: flex;
  justify-content: center;
  font-size: 20px;
}

.chat {
  font-size: 25px;
  margin-left: 8px;
  cursor: pointer;
}

// 中部
.center {
  margin: 12px 15px;
  background-color: rgb(248, 252, 251);
  border-radius: 10px;
  padding: 10px;
  width: 60%;
  min-height: 50px;
}

p {
  font-size: 16px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
}

// 底部
.bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  background-color: rgb(248, 252, 251);
  border-radius: 0 0 12px 12px;
}

.bottom .bottom-left,
.comName {
  display: flex;
  justify-content: center;
  align-content: center;
}

.avatar {
  margin: 5px 5px 5px 15px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #eaeaea;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comName,
.bottom-right {
  font-size: 14px;
  height: 50px;
  line-height: 52px;
  text-align: center;
}

.bottom-right {
  margin-right: 12px;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
