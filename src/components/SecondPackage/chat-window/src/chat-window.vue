<script setup lang="ts">
import { ref, type PropType, watch, defineProps, defineExpose, defineEmits } from 'vue'
import type { IFormConfig } from '@/components/base/form/type/type'
import KlForm from '@/components/base/form'
import ChatContent from '@/components/chat/chat-content'
import { useChatStore } from '@/stores/chat/chatStore'
import ChatWindow from '@/components/SecondPackage/chat-window'
const chatContentModal = ref<InstanceType<typeof ChatContent>>()
const chatWindow = ref<InstanceType<typeof ChatContent>>()
const chatStore = useChatStore()
const { freshSend } = chatStore

defineProps({
  userType: {
    type: Number,
    default: 1
  },
  chatList: {},
  userInfo: {}
})

// 发起聊天
const startChat = async (data: string, inputContent: string) => {
  await freshSend({
    com_id: data,
    content: inputContent
  })
}

// 可视化
const dialogVisible = ref(false)
defineExpose({
  getVisible() {
    dialogVisible.value = true
  }
})

const closeChat = () => {
  chatWindow.value!.closeChat()
}
</script>

<template>
  <div class="chat-window">
    <el-dialog v-model="dialogVisible" width="800" @close="closeChat">
      <ChatContent
        class="chat-content"
        @startChat="startChat"
        :userInfo="userInfo"
        :userType="userType"
        :chatList="chatList"
        ref="chatWindow"
      ></ChatContent>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
