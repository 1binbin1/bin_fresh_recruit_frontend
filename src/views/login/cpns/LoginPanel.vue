<script setup lang="ts">
import {defineEmits, ref} from 'vue'
import {useAuthStore} from '@/stores/user/auth'
import SliderVerifyCode from "@/components/base/slider-verify-code/src/slider-verify-code.vue";
import {showMsg} from "@/utils/message";

const store = useAuthStore()
const {getCode: getC, userChangePwd, userLogin} = store
const phone = ref<string>('')
const password = ref<string>('')
const role = ref<number>(1)
const tips = ref<string>('')
const isCode = ref<Boolean>(false)
const placeholder = ref<String>("")
const code = ref<String>("")
// 用户登录
const keyDown = async (e) => {
  if (e.keyCode == 13 || e.keyCode == 100) {
    await login()
  }
}

const login = async () => {
  if (!isLock.value) {
    tips.value = "请将滑块滑动到最右端"
    showMsg("请将滑块滑动到最右端", "error")
    return
  }
  let data = {}
  if (!isCode.value) {
    data = {
      login_type: 0,
      phone: phone.value,
      password: password.value,
      role: role.value,
      isFilterLately: 1
    }
  }
  if (isCode.value) {
    data = {
      login_type: 1,
      phone: phone.value,
      code: code.value,
      role: role.value,
      isFilterLately: 1
    }
  }
  tips.value = await userLogin(data)
}
// emit
let emit = defineEmits(['findPwd', 'loginByCode'])
const findEmit = () => {
  emit('findPwd')
}

// 验证码登录
const loginByCode = () => {
  isCode.value = true
  placeholder.value = "请输入手机号"
  emit('loginByCode')
}
const loginByPassword = () => {
  placeholder.value = "请输入手机号或账号"
  isCode.value = false
}

// 1. 发送验证码逻辑
let btndisabled = ref(false)
let btnText = ref('发送验证码')
const getCode = async () => {
  if (!isLock.value) {
    tips.value = "请将滑块滑动到最右端"
    showMsg("请将滑块滑动到最右端", "error")
    return
  }
  // 发送验证码
  const data = {
    phone: phone.value,
    role: role.value,
    type: 1
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

// 滑块验证码
const isLock = ref<Boolean>(false)
const handlerLock = (data: any) => {
  isLock.value = data
}

</script>

<template>
  <div class="loginPanel">
    <el-input
        v-model="phone"
        style="width: 450px; height: 50px; margin-bottom: 30px"
        placeholder="请输入手机号或账号"
        v-if="!isCode" clearable
    />
    <el-input v-if="!isCode"
              v-model="password"
              style="width: 450px; height: 50px; margin-bottom: 20px"
              placeholder="请输入密码"
              type="password" clearable
    />
    <el-input
        v-model="phone"
        style="width: 450px; height: 50px; margin-bottom: 30px"
        placeholder="请输入手机号"
        v-if="isCode" clearable
    />
    <div class="yanzheng" v-if="isCode" style="margin-bottom: 20px">
      <el-input v-model="code" style="width: 300px; height: 50px" placeholder="请输入验证码" clearable/>
      <el-button style="width: 140px; height: 50px;margin-left: 10px" :disabled="btndisabled" @click="getCode">{{
          btnText
        }}
      </el-button>
    </div>
    <SliderVerifyCode v-model="isLock" @change="handlerLock"
                      style="width: 450px;margin-bottom: 20px"></SliderVerifyCode>
    <div class="tips">
      <el-text class="mx-1" size="large" type="warning">{{ tips }}</el-text>
      <div class="link">
        <el-link :underline="false" type="success" @click="loginByCode" style="margin-right: 20px" v-if="!isCode">验证码登录
        </el-link>
        <el-link :underline="false" type="success" @click="loginByPassword" style="margin-right: 20px" v-if="isCode">
          账号密码登录
        </el-link>
        <el-link :underline="false" type="warning" @click="findEmit">忘记密码？</el-link>
      </div>
    </div>
    <div class="groups">
      <el-radio-group v-model="role">
        <el-radio :value="1">应届生</el-radio>
        <el-radio :value="2">企业招聘方</el-radio>
        <el-radio :value="0">学生就业中心</el-radio>
      </el-radio-group>
    </div>
    <div class="btn">
      <el-button type="primary" size="large" auto-insert-space @click="login" @keydown.enter="keyDown($event)">确认登录
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loginPanel {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tips {
    display: flex;
    justify-content: space-between;
    width: 78%;

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
      background-color: rgb(0, 166, 167);
    }
  }
}
</style>
