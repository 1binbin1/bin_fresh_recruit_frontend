<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  onMounted,
  ref,
  onBeforeUnmount,
  defineExpose,
  onUnmounted,
  nextTick,
  onUpdated, reactive, watch
} from 'vue'
import {useChatStore} from '@/stores/chat/chatStore'
import {formatUTC} from '@/utils/formatTime'
import localCache from '@/utils/localCache'
import {showBox} from "@/utils/message";
import emojis from "@/assets/image/emojis.json"

const inputContent = ref("")
const chatStore = useChatStore()
const {getChatList, freshSendByPicture, comSendByPicture} = chatStore
// const {freshInfo, chatListCom} = storeToRefs(chatStore)


let intervalTime = 5000
let intervalScrollTime = 1000
let interval
let count = 0
const propds = defineProps({
  userType: {
    type: Number,
    default: 1
  },
  chatList: {},
  userInfo: {
    type: Object
  }
})

const contentCenter = ref(null)

watch(() => propds.userInfo, () => {
  nextTick(() => {
    setTimeout(() => {
      console.log("scroll bottom")
      interval = setInterval(startInterval, intervalTime)
      contentCenter.value.scrollTop = contentCenter.value.scrollHeight
    }, 500)
  })
})

const faceList = []
for (let emojisKey in emojis) {
  faceList.push(emojis[emojisKey]['char'])
}

onMounted(() => {
  window.addEventListener('keydown', keyDown)
})

onUnmounted(() => {
  clearInterval(interval)
  clearInterval(intervalScroll)
  location.reload()
  window.removeEventListener('keydown', keyDown, false)
})

defineExpose({
  closeChat() {
    clearInterval(interval)
    clearInterval(intervalScroll)
  }
})

onBeforeUnmount(() => {
  console.log("chat close")
  location.reload()
  clearInterval(interval)
  clearInterval(intervalScroll)
})

const toBottom = () => {
  contentCenter!.value.scrollTop = contentCenter!.value.scrollHeight
}

const isActive = ref(false)

const emit = defineEmits(['startChat'])
const send = async (data: string) => {
  emojiShow.value = false
  contentCenter!.value.scrollTop = contentCenter!.value.scrollHeight
  if (inputContent.value !== undefined) {
    emit('startChat', data, inputContent.value)
  }
  inputContent.value = ''
}

const sendPicture = async (file) => {
  const formData = new FormData()
  // 判断类型
  const typeArry = ['.png', '.jpg']
  // 上传前检查
  const fileSize = file.size
  const fileName = file.name
  const type = fileName.substring(fileName.lastIndexOf('.'))
  const isFile = typeArry.indexOf(type) > -1
  // 最大1MB
  if (fileSize / 1024 / 1204 > 1) {
    showBox('上传失败', '图片最大仅支持1MB，请重新上传')
    return
  } else if (!isFile) {
    showBox('上传失败', '图片仅支持JPG或PNG格式')
    return
  }
  formData.append('file', file.raw)
  // 上传
  if (propds.userType === 1) {
    formData.append("com_id", propds.userInfo.com_id)
    await freshSendByPicture(formData)
  }
  if (propds.userType === 2) {
    formData.append("user_id", propds.userInfo.user_id)
    await comSendByPicture(formData)
  }
}

async function startInterval() {
  if (propds.userInfo !== undefined) {
    console.log("刷新数据中", count)
    if (propds.userType === 1) {
      count++
      await getChatList({
        user_id: localCache.getCache('userId'),
        com_id: propds.userInfo.com_id
      })
    }
    if (propds.userType === 2) {
      count++
      await getChatList({
        user_id: propds.userInfo.user_id,
        com_id: localCache.getCache('userId')
      })
    }
  }
  if (count > 1000) {
    clearInterval(interval)
  }
}

const keyDown = (e) => {
  if (e.keyCode == 13 || e.keyCode == 100) {
    if (propds.userType === 1) {
      send(propds.userInfo.com_id)
    }
    if (propds.userType === 2) {
      send(propds.userInfo.user_id)
    }
  }
}

const showImg = () => {
  clearInterval(interval)
}
const closeImg = () => {
  interval = setInterval(startInterval, intervalTime)
}
let intervalScroll
const intervalScrollFun = () => {
  contentCenter!.value.scrollTop = contentCenter!.value.scrollHeight
  console.log("滑动到底部")
}
const scrollFun = (e) => {
  isActive.value = true
  clearInterval(intervalScroll)
  const height = e.target.scrollHeight
  const top = e.target.scrollTop
  const clientHeight = e.target.clientHeight
  if (top + clientHeight + 1 >= height) {
    console.log("到底了")
    isActive.value = false
    intervalScroll = setInterval(intervalScrollFun, intervalScrollTime)
  }
}


// 表情包输入相关
const emojiShow = ref(true)
const getBrowString = ref("")
const getBrow = (index: number) => {
  for (let i in faceList) {
    if (index == i) {
      getBrowString.value = faceList[index];
      inputContent.value += getBrowString.value
    }
  }
  emojiShow.value = false
}
</script>

<template>
  <div class="chat-content">
    <el-skeleton :rows="16" v-show="!userInfo"/>
    <div class="have-content" v-show="userInfo">
      <div class="content-top">
        <div class="info-left">
          <div class="imgContain">
            <img class="img" :src="userInfo?.a_avatar" alt=""/>
          </div>
          <div class="info">
            <div class="info-top" v-if="userType === 1">
              {{ userInfo?.com_name === '' ? '暂无昵称' : userInfo?.com_name }}
            </div>
            <div class="info-top" v-if="userType === 2">
              {{ userInfo?.user_name === '' ? '暂无昵称' : userInfo?.user_name }}
            </div>
            <div class="info-bottom" v-if="userType === 2">
              <el-tag class="tag">{{ userInfo?.user_sex }}</el-tag>
              <el-tag class="tag">{{ userInfo?.user_major }}</el-tag>
              <el-tag class="tag">{{ userInfo?.user_school }}</el-tag>
              <el-tag class="tag">{{ userInfo?.user_education }}</el-tag>
              <el-tag class="tag">{{ userInfo?.user_year }}</el-tag>
            </div>
          </div>
        </div>
        <div class="info-right">
          <div class="to-bottom" @click="toBottom" v-show="isActive">
            <span>回到底部</span>
            <el-icon>
              <ArrowDown/>
            </el-icon>
          </div>
        </div>
      </div>
      <div class="content-center" @scroll="scrollFun" id="content-center1" v-if="userType === 2" ref="contentCenter">
        <div class="list" v-for="item in chatList" :key="item">
          <div class="chat-list-right" v-if="item?.user_type === 2">
            <div class="right-content">
              <div class="content" style="background-color: var(--theme-color)" v-if="item?.chat_type === 0">{{
                  item?.chat_content
                }}
              </div>
              <div class="content-img" v-if="item?.chat_type === 1">
                <el-image
                    :src="item?.chat_content" alt="" style="width: 100%;  border-radius: 4px;" :zoom-rate="1.2"
                    :preview-src-list="[item?.chat_content]" :max-scale="7" :min-scale="0.2"
                    @show="showImg" @close="closeImg" :hide-on-click-modal="true"
                >
                  <template v-slot:placeholder>
                    <img :src="item?.chat_content" alt="" class="el-image__placeholder">
                  </template>
                </el-image>
              </div>
              <span class="content-time">{{ formatUTC(item.create_time) }}</span>
            </div>
            <div class="avatar">
              <img class="avatar-img" :src="item?.a_avatar" alt=""/>
            </div>
          </div>
          <div class="chat-list-left" v-if="item?.user_type === 1">
            <div class="left-content">
              <div class="content" style="background-color: #e8f3f3" v-if="item?.chat_type === 0">{{
                  item?.chat_content
                }}
              </div>
              <div class="content-img" v-if="item?.chat_type === 1">
                <el-image
                    :src="item?.chat_content" alt="" style="width: 100%;  border-radius: 4px;" :zoom-rate="1.2"
                    :preview-src-list="[item?.chat_content]" :max-scale="7" :min-scale="0.2"
                    @show="showImg" @close="closeImg" :hide-on-click-modal="true"
                >
                  <template v-slot:placeholder>
                    <img :src="item?.chat_content" alt="" class="el-image__placeholder">
                  </template>
                </el-image>
              </div>
              <span class="content-time">{{ formatUTC(item.create_time) }}</span>
            </div>
            <div class="avatar">
              <img class="avatar-img" :src="item?.a_avatar" alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div class="content-center" @scroll="scrollFun" id="content-center2" v-if="userType === 1" ref="contentCenter">
        <div class="list" v-for="item in chatList" :key="item">
          <div class="chat-list-right" v-if="item?.user_type === 1">
            <div class="right-content">
              <div class="content" style="background-color: var(--theme-color)" v-if="item?.chat_type === 0">{{
                  item?.chat_content
                }}
              </div>
              <div class="content-img" v-if="item?.chat_type === 1">
                <el-image
                    :src="item?.chat_content" alt="" style="width: 100%;  border-radius: 4px;" :zoom-rate="1.2"
                    :preview-src-list="[item?.chat_content]" :max-scale="7" :min-scale="0.2"
                    @show="showImg" @close="closeImg" :hide-on-click-modal="true"
                >
                  <template v-slot:placeholder>
                    <img :src="item?.chat_content" alt="" class="el-image__placeholder">
                  </template>
                </el-image>
              </div>
              <span class="content-time">{{ formatUTC(item.create_time) }}</span>
            </div>
            <div class="avatar">
              <img class="avatar-img" :src="item?.a_avatar" alt=""/>
            </div>
          </div>
          <div class="chat-list-left" v-if="item?.user_type === 2">
            <div class="left-content">
              <div class="content" style="background-color: #e8f3f3" v-if="item?.chat_type === 0">{{
                  item?.chat_content
                }}
              </div>
              <div class="content-img" v-if="item?.chat_type === 1">
                <el-image
                    :src="item?.chat_content" alt="" style="width: 100%;  border-radius: 4px;" :zoom-rate="1.2"
                    :preview-src-list="[item?.chat_content]" :max-scale="7" :min-scale="0.2"
                    @show="showImg" @close="closeImg" :hide-on-click-modal="true"
                >
                  <template v-slot:placeholder>
                    <img :src="item?.chat_content" alt="" class="el-image__placeholder">
                  </template>
                </el-image>
              </div>
              <span class="content-time">{{ formatUTC(item.create_time) }}</span>
            </div>
            <div class="avatar">
              <img class="avatar-img" :src="item?.a_avatar" alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div class="content-bottom">
        <el-popover
            placement="top"
            width="500"
            height="700"
            trigger="click"
            v-model="emojiShow"
        >
          <template #reference>
            <el-button circle style="margin-right: 10px;">😀</el-button>
          </template>
          <div class="browBox">
            <ul>
              <li
                  v-for="(item, index) in faceList"
                  :key="index"
                  @click="getBrow(index)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </el-popover>
        <el-input
            maxlength="120"
            show-word-limit
            v-model="inputContent"
            style="width: 70%; margin-right: 10px;height: 60%"
            placeholder="回复内容"
            class="input"
            clearable
            @focus="toBottom"
        ></el-input>
        <el-button
            style="width: 10%; height: 60%"
            v-if="userType === 1"
        >
          <el-upload action :show-file-list="false" :auto-upload="false" :on-change="sendPicture">选择图片</el-upload>
        </el-button>
        <el-button
            style="width: 10%; height: 60%"
            v-if="userType === 2"
        >
          <el-upload action :show-file-list="false" :auto-upload="false" :on-change="sendPicture">选择图片</el-upload>
        </el-button>
        <el-button
            style="width: 10%; height: 60%"
            @click="send(userInfo?.com_id)"
            @keydown.enter="keyDown($event)"
            v-if="userType === 1"
            type="primary"
        >发送
        </el-button>
        <el-button
            style="width: 10%; height: 60%"
            @click="send(userInfo?.user_id)"
            @keydown.enter="keyDown($event)"
            v-if="userType === 2"
            type="primary"
        >发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-content {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.have-content {
  width: 100%;
  height: 100%; // 告诉我这个不是高度是什么
}

.content-top {
  border-radius: 8px 8px 0 0;
  height: 80px;
  width: 100%;
  background-color: var(--theme-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.info-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.content-center {
  height: 490px;
  width: 100%;
  overflow-y: auto;
}

.to-bottom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-right: 20px;
  color: #fff;
  font-weight: bolder;
}

.to-bottom:hover {
  cursor: pointer;
}

.content-bottom {
  height: 60px;
  width: 100%;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.imgContain {
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #00000040;
  color: #7e7e7e;
  overflow: hidden;
  margin-left: 15px;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.info-top {
  font-size: 18px;
  letter-spacing: 4px;
  color: #fff;
  font-weight: bolder;
}

.tag {
  margin-right: 10px;
  margin-top: 5px;
}

:deep(.el-tag.el-tag--primary) {
  font-size: 12px;
  height: 18px;
}

.info-bottom {
  display: flex;
  flex-direction: row;
  //flex-wrap: wrap;
  width: 300px;
}

// 聊天区域
.avatar {
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #00000040;
  color: #7e7e7e;
  overflow: hidden;
  margin-left: 10px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat-list-right,
.chat-list-left {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 15px 0;
}

.chat-list-right {
  flex-direction: row;
}

.chat-list-left {
  flex-direction: row-reverse;
}

.content {
  max-width: 350px;
  height: auto;
  white-space: normal;
  word-wrap: break-word;
  display: inline-block;
  overflow-wrap: break-word;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 2px;
  border-radius: 4px;
  font-size: 16px;
}

.content-img {
  max-width: 350px;
  height: auto;
  border-radius: 4px;
}

.right-content,
.left-content {
  display: flex;
  flex-direction: column;
}

.right-content {
  align-items: flex-end;
}

.left-content {
  align-items: flex-start;
}

.content-time {
  display: inline-block;
  width: auto;
  font-size: 14px;
  margin-top: 4px;
}

.browBox {
  width: 100%;
  height: 200px;
  background: #fff;
  z-index: 100;
  bottom: 0;
  overflow: scroll;
  border-radius: 4px;
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      cursor: pointer;
      width: 10%;
      font-size: 26px;
      list-style: none;
      text-align: center;
    }
  }
}

</style>
