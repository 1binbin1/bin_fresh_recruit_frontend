<script setup lang="ts">
import { defineEmits, defineExpose, defineProps, onMounted, ref } from 'vue'
import { useResumeStore } from '@/stores/fresh/resume'
import { storeToRefs } from 'pinia'
import router from '@/router'

const resumeStore = useResumeStore()
const { changeVisible, getResumeList, getResumeInfo } = resumeStore
const { visible, resumeList, resumeInfo } = storeToRefs(resumeStore)

onMounted(async () => {
  await getResumeList()
})

defineProps({})
// 选择简历
const resumeData = ref()
resumeData.value = resumeList.value?.length > 0 ? resumeList.value[0]?.resume_id : 1
const innerDialog = ref(false)

const emit = defineEmits(['confirm'])
const closeBoxChild = () => {
  emit('confirm', resumeData)
  changeVisible(false)
  innerDialog.value = false
}
const closeBox = () => {
  changeVisible(false)
  innerDialog.value = false
}

// 前往附件管理
const gotoResume = () => {
  router.push('/fresh/freshInfoIntention')
}

const openInner = async () => {
  innerDialog.value = true
  await getResumeInfo(resumeData.value)
}
const openResume = (data: string) => {
  window.open(data, '_blank')
}
</script>

<template>
  <el-dialog class="modal-cover" v-model="visible" width="550" title="选择简历附件">
    <div class="modal">
      <div class="modal-top" @click="gotoResume">
        <span class="model-top-right">前往管理简历附件</span>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
      <div class="resume-list">
        <el-radio-group
          v-model="resumeData"
          class="group"
          text-color="var(--theme-color)"
          size="large"
          fill="var(--theme-color)"
        >
          <el-radio :value="item.resume_id" v-for="item in resumeList" :key="item">
            <div class="name">{{ item.resume_name }}</div>
            <a @click="openResume(item.user_name_link)">点击查看</a>
          </el-radio>
        </el-radio-group>
      </div>
      <div class="out-button">
        <button @click="closeBox">取消</button>
        <button @click="openInner" style="margin-left: 20px">确认投递</button>
      </div>
      <el-dialog v-model="innerDialog" append-to-body width="400" title="是否确认投递">
        <div class="inner-dialog">
          <div class="div">选择的简历是：{{ resumeInfo?.resume_name }}</div>
          <div class="inner-button">
            <button @click="innerDialog = false">取消</button>
            <button @click="closeBoxChild" style="margin-left: 20px">确认</button>
          </div>
        </div>
      </el-dialog>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
// 投递弹窗
:deep(.el-radio:last-child) {
  //margin-right: 30px
}

:deep(.el-radio) {
  margin-bottom: 10px;
}

:deep(.el-radio.el-radio--large .el-radio__label) {
  display: flex;
  width: 100%;
  font-size: 18px;
}

:deep(.el-radio.el-radio--large) {
  width: 100%;
}

.group {
  margin-top: 10px;
}

.group a {
  margin-left: 20px;
}

.group a:hover {
  color: red;
}

.modal-top {
  display: flex;
}

.inner-dialog {
  display: flex;
  flex-direction: column;
}

.inner-button,
.out-button {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
}

.div {
  font-size: 16px;
}

.out-button button,
.inner-button button {
  width: 100px;
  height: 35px;
  background-color: #fff;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 4px;
  border: 2px solid var(--theme-color);
  border-radius: 8px;
}

.out-button button:hover,
.inner-button button:hover {
  background-color: var(--theme-color);
  color: #fff;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}

// 简历列表
.modal-top {
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.modal-top:hover {
  color: red;
}
</style>
