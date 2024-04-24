<script setup lang="ts">
import { useAuthStore } from '@/stores/user/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const props = defineProps(['isCollapse'])
const authStore = useAuthStore()
const { menus } = storeToRefs(authStore)
const router = useRouter()
// 跳转地址
const toUrl = (url: any) => {
  router.push(url)
}
</script>

<template>
  <div class="navMenu">
    <div class="header">
      <img class="logo" src="@/assets/image/logo.png" />
      <div class="title" :class="{ hidden: props.isCollapse }">校 招 通</div>
    </div>
    <div class="menu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="var(--theme-color)"
        class="el-menu-vertical-demo"
        default-active="0"
        text-color="#fff"
        :collapse="props.isCollapse"
        :collapse-transition="true"
      >
        <el-menu-item
          v-for="(item, index) in menus"
          :index="index"
          :key="item"
          @click="toUrl(item.url)"
        >
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.navMenu {
  color: #fff;
}
.header {
  height: 60px;
  padding-left: 13px;
  display: flex;
  align-items: center;
  .logo {
    height: 40px;
  }
  .title {
    flex: 1;
    margin-left: 20px;
    font-size: 20px;
  }
}
.el-menu {
  border-right: 0;
  caret-color: rgba(0, 0, 0, 0);
}
.el-menu-item {
  font-size: 18px;
  height: 70px;
}
.el-menu-item.is-active {
  background-color: var(--theme-active-color) !important;
}
:deep(.el-menu-item:hover){
  background-color: var(--theme-active-color) !important;
}
</style>
