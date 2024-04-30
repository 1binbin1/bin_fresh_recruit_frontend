<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useResumeStore} from '@/stores/fresh/resume'
import {useSendStore} from '@/stores/fresh/send'
import {onMounted, ref} from 'vue'
import {formatUTC} from '@/utils/formatTime'
import router from '@/router'
import {useJobStore} from '@/stores/fresh/job'
import {showMsg} from '@/utils/message'
import localCache from '@/utils/localCache'
import ChatWindow from '@/components/SecondPackage/chat-window'
import {useChatStore} from '@/stores/chat/chatStore'

const sendStore = useSendStore()
const {getStateList, changeCurrent} = sendStore
const {stateListPage, total, pageSize, current} = storeToRefs(sendStore)
const jobStore = useJobStore()
const {changeJobId, changeComId} = jobStore
const {jobInfoResult} = storeToRefs(jobStore)

const chatWindowModal = ref<InstanceType<typeof ChatWindow>>()
const chatStore = useChatStore()
const {getChatList, changeComId: changeComIdByChat} = chatStore
const {chatList, comInfo} = storeToRefs(chatStore)
onMounted(async () => {
  await getStateList()
})

const dictMap = new Map()
dictMap.set(0, '已投递')
dictMap.set(1, '被查看')
dictMap.set(2, '邀约面试')
dictMap.set(3, '初筛不通过')
dictMap.set(4, '流程结束')
dictMap.set(5, '应聘成功')
const pageChange = async (data: number) => {
  await changeCurrent(data)
  await getStateList()
}
const gotoJobInfo = (data: any) => {
  router.push('/fresh/jobInfo')
  changeJobId(data.job_id)
  changeComId(data.com_id)
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
  <div class="state">
    <div class="state-top">
      <div class="state-list" v-for="item in stateListPage" :key="item">
        <div class="info">
          <div class="info-left" @click="gotoJobInfo(item)">
            <div class="avatar"><img :src="item.a_avatar" alt="无图片"/></div>
            <div class="job-info">
              <span style="font-size: 16px">{{ item.job_name }}</span>
              <span style="font-size: 12px; margin-top: 2px; width: 200px">{{
                  item.com_name
                }}</span>
            </div>
          </div>
          <div class="info-center" style="color: #000; width: 160px">
            {{ formatUTC(item.create_time) }}
          </div>
          <div class="info-center" style="width: 70px" v-if="item.send_state < 3">
            {{ dictMap.get(item.send_state) }}
          </div>
          <div
              class="info-center"
              style="width: 70px; color: rgb(48, 152, 30)"
              v-if="item.send_state === 5"
          >
            {{ dictMap.get(item.send_state) }}
          </div>
          <div
              class="info-center"
              style="width: 70px; color: rgb(254, 87, 103)"
              v-if="item.send_state === 3"
          >
            {{ dictMap.get(item.send_state) }}
          </div>
          <div
              class="info-center"
              style="width: 70px; color: rgb(254, 87, 103)"
              v-if="item.send_state === 4"
          >
            {{ dictMap.get(item.send_state) }}
          </div>
          <div class="info-right">
            <el-button @click="showChatWindow(item)"
                       style="background-color: var(--theme-color);border: none;border-radius: 10px;height: 35px;width: 110px;color: #fff;font-weight: bolder;letter-spacing: 2px;font-size: 16px;">
              立即沟通
            </el-button>
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <div class="state-bottom">
      <el-pagination
          background
          layout="prev, pager, next,jumper,total"
          :total="total"
          :page-size="pageSize"
          @current-change="pageChange"
          :current-page="current"
          hide-on-single-page
      ></el-pagination>
    </div>
    <ChatWindow ref="chatWindowModal" :chatList="chatList" :userInfo="comInfo"></ChatWindow>
  </div>
</template>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}

.state {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.state-top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.state-list {
  width: 98%;
}

.info {
  margin: 13px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.info-left {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: 10px;
}

.avatar img {
  height: 100%;
  width: 100%;
  object-fit: fill;
}

.job-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: self-start;
}

.job-info span {
  letter-spacing: 2px;
}

.info-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.state-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
}
</style>
