<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMessageStore } from '@/stores/fresh/message'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/formatTime'

const messageStore = useMessageStore()
const { getMessageList, changeCurrent } = messageStore
const { total, pageSize, current, messageList } = storeToRefs(messageStore)

onMounted(async () => {
  await getMessageList()
})
const activeName = ref()
activeName.value = messageList.value?.length > 0 ? messageList.value[0]?.id : 1
const changePage = async (data: number) => {
  await changeCurrent(data)
  await getMessageList()
}
</script>

<template>
  <div class="jobMessage">
    <div class="message-top">
      <span>就业资讯</span>
    </div>
    <div class="out-contain">
      <div class="message-bottom">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            :title="item?.title"
            :name="item?.id"
            v-for="item in messageList"
            :key="item"
          >
            <div class="time">发布时间：{{ formatUTC(item?.create_time) }}</div>
            <div class="contain">
              {{ item?.intro_content }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next,jumper,total"
          :total="total"
          :page-size="pageSize"
          @current-change="changePage"
          :current-page="current"
          hide-on-single-page
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jobMessage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.message-top {
  width: calc(75% - 10px);
  background-color: #fff;
  margin-top: 20px;
  height: 50px;
  border-radius: 4px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-left: 10px solid var(--theme-color);
}

.message-top span {
  color: #000;
  font-weight: bolder;
  font-size: 20px;
  letter-spacing: 4px;
  margin-left: 10px;
}

.out-contain {
  width: 75%;
  margin-top: 10px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.message-bottom {
  width: 95%;
}

.page {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
