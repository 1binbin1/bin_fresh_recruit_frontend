<script setup lang="ts">
import {defineExpose, ref} from "vue";
import LoginRecord from "@/components/login-record/src/login-record.vue";
import localCache from "@/utils/localCache";

const aId = ref()
aId.value = localCache.getCache("userId")

const dialogVisible = ref(false)
defineExpose({
  getVisible() {
    dialogVisible.value = true
  }
})
const cancel = () => {
  dialogVisible.value = false
}
</script>

<template>
  <div class="login-record-window">
    <el-dialog v-model="dialogVisible" title="登录记录" width="80%" align-center>
      <LoginRecord :userId="aId"></LoginRecord>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
