<script setup lang="ts">
import {ref} from 'vue'
import router from '@/router'
import {useAuthStore} from '@/stores/user/auth'
import {storeToRefs} from 'pinia'
import ChangeTheme from "@/components/ThemeSetting/change-theme/src/change-theme.vue";
import {useCommonStore} from "@/stores/common/common";

const store = useAuthStore()
const {outLoginReq} = store
const {roleData, userInfo} = storeToRefs(store)
const commonStore = useCommonStore()
const {getIp, getIpCity} = commonStore
const {cityInfo} = storeToRefs(commonStore)
const forgetPassword = () => {
      // 忘记密码
      router.push('/login')
    }
;` `
// 退出登录
const out = async () => {
  await outLoginReq({
    role: roleData.value
  })
}

const changeThemeModal = ref<InstanceType<typeof ChangeTheme>>()
// 主题切换打开
const openColor = () => {
  changeThemeModal.value!.getVisible()
}
</script>

<template>
  <div class="userInfo">
    <el-dropdown>
      <div class="el-dropdown-link">
        <div class="imgContain">
          <img :src="userInfo?.a_avatar" class="img"/>
        </div>
        <div class="contain">
          <div class="username">{{ userInfo?.user_name }}</div>
          <div class="location" v-if="cityInfo.address">
            <el-icon>
              <Location/>
            </el-icon>
            <span
                style="margin-left: 5px">{{ cityInfo.address }}</span></div>
        </div>
        <el-icon class="el-icon--right">
          <arrow-down/>
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="Edit" @click="openColor">主题切换</el-dropdown-item>
          <el-dropdown-item icon="User" @click="forgetPassword">重置密码</el-dropdown-item>
          <el-dropdown-item icon="CloseBold" @click="out">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <ChangeTheme ref="changeThemeModal"></ChangeTheme>
</template>

<style lang="scss" scoped>
.contain{
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.username{
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bolder;
}
.userInfo {
  font-size: 16px;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-dropdown-link:focus {
  outline: none;
}

.location {
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 12px;
  margin-right: 10px;
}

.imgContain {
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
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
