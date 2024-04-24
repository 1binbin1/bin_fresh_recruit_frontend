<script setup lang="ts">
import { useAuthStore } from '@/stores/user/auth'
import { ref } from 'vue'
const phone = ref<string>('')
const password = ref<string>('')
const check_password = ref<string>('')
const role = ref<number>(0)
const tips = ref<string>('')
// 引入仓库
const store = useAuthStore()
const { userRegister } = store
// 注册账号
const register = async () => {
  let data = {
    phone: phone.value,
    password: password.value,
    check_password: check_password.value,
    role: role.value
  }
  const res = await userRegister(data)
  tips.value = res
}
</script>

<template>
  <div class="registerPanel">
    <el-input
      v-model="phone"
      style="width: 450px; height: 50px; margin-bottom: 30px"
      placeholder="请输入手机号" clearable
    />
    <el-input
      v-model="password"
      style="width: 450px; height: 50px; margin-bottom: 30px"
      type="password"
      placeholder="请输入密码" clearable
    />
    <el-input
      v-model="check_password"
      style="width: 450px; height: 50px; margin-bottom: 20px"
      type="password"
      placeholder="请再次输入密码" clearable
    />
    <div class="tips">
      <el-text class="mx-1" size="large" type="warning">{{ tips }}</el-text>
    </div>
    <div class="groups">
      <el-radio-group v-model="role">
        <el-radio :value="2">企业招聘方</el-radio>
        <el-radio :value="0">学生就业中心</el-radio>
      </el-radio-group>
    </div>
    <div class="btn">
      <el-button type="primary" size="large" auto-insert-space @click="register"
        >注册账号</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.registerPanel {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tips {
    display: flex;
    justify-content: space-between;
    width: 70%;
    .el-link {
      font-size: 16px;
    }
  }
  .groups {
    margin: 20px 0;
    width: 75%;
    .el-radio-group {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
  .btn {
    width: 75%;
    .el-button {
      width: 100%;
      height: 50px;
      background-color: var(--theme-color)
    }
  }
}
</style>
