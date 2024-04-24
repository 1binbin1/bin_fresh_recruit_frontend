<script setup lang="ts">
import { useAuthStore } from '@/stores/user/auth'
import { ref } from 'vue'
const phone = ref<string>('')
const password = ref<string>('')
const check_password = ref<string>('')
const code = ref<string>('')
const role = ref<number>(1)
const tips = ref<string>('')

const emit = defineEmits(['toLogin'])
// 获取仓库
const store = useAuthStore()
const { getCode: getC, userChangePwd } = store

// 1. 发送验证码逻辑
let btndisabled = ref(false)
let btnText = ref('发送验证码')
const getCode = async () => {
  // 发送验证码
  const data = {
    phone: phone.value,
    role: role.value,
    type: 0
  }
  const res = await getC(data)
  // res 为true即为发送成功
  console.log(res)
  if (res) {
    tips.value = '发送验证码成功'
    // 按钮禁用
    btndisabled.value = true
    // 倒计时六十秒解除灰色
    let second = 60
    let timer = setInterval(() => {
      if (second > 0) {
        // console.log(second)
        second -= 1
        btnText.value = `${second}秒后重试`
      } else {
        clearInterval(timer)
        btnText.value = '发送验证码'
        btndisabled.value = false
      }
    }, 1000)
  } else {
    tips.value = '发送验证码失败，请联系管理员'
  }
}
// 2. 获取找回密码逻辑
const changePwd = async () => {
  const data = {
    phone: phone.value,
    password: password.value,
    check_password: check_password.value,
    role: role.value,
    code: code.value
  }
  const res = await userChangePwd(data)
  tips.value = res
}
const toLogin = () => {
  emit('toLogin')
}
</script>

<template>
  <div class="findPassPanel">
    <div class="header">找回密码</div>
    <div class="container">
      <el-input
        v-model="phone"
        style="width: 450px; height: 50px; margin-bottom: 20px"
        placeholder="请输入手机号或账号"
        clearable
      />
      <el-input
        v-model="password"
        style="width: 450px; height: 50px; margin-bottom: 20px"
        type="password"
        placeholder="请输入密码"
        clearable
      />
      <el-input
        v-model="check_password"
        style="width: 450px; height: 50px; margin-bottom: 20px"
        type="password"
        placeholder="请确认密码"
        clearable
      />
      <div class="yanzheng">
        <el-input v-model="code" style="width: 300px; height: 50px" placeholder="请输入验证码" clearable/>
        <el-button style="width: 140px; height: 50px;margin-left: 10px" :disabled="btndisabled" @click="getCode" clearable>{{
          btnText
        }}</el-button>
      </div>
      <div class="tips">
        <el-text class="mx-1" size="large" type="warning">{{ tips }}</el-text>
        <el-link :underline="false" type="warning" @click="toLogin">← 返回登录</el-link>
      </div>
      <div class="groups">
        <el-radio-group v-model="role">
          <el-radio :value="1">应届生</el-radio>
          <el-radio :value="2">企业招聘方</el-radio>
          <el-radio :value="0">学生就业中心</el-radio>
        </el-radio-group>
      </div>
      <div class="btn">
        <el-button type="primary" size="large" auto-insert-space @click="changePwd"
          >找回密码</el-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  font-size: 20px;
  border-bottom: solid 3px var(--theme-color);
  height: 40px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 30px;
  caret-color: rgba(0, 0, 0, 0);
}
.container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .groups {
    margin-bottom: 20px;
  }
  .yanzheng {
  }
  .tips {
    display: flex;
    justify-content: space-between;
    width: 70%;
    .el-link {
      font-size: 16px;
    }
    margin: 20px 0;
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
