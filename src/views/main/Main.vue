<script setup lang="ts">
import NavMenu from '@/components/base/nav-menu'
import NavHeader from '@/components/base/nav-header/src/nav-header.vue'
// 测试表格，等会删
import { tableData, tableConfig } from '../config'
import contentTable from '@/components/SecondPackage/content-table'
// *****************
import { ref } from 'vue'
// 侧边栏收缩功能
const iscollapse = ref<boolean>(false)
const changeCollapse = (isFold: boolean) => {
  iscollapse.value = isFold
}
// *****************
</script>

<template>
  <div class="main">
    <el-container>
      <el-aside :width="iscollapse ? '60px' : '250px'"
        ><NavMenu :isCollapse="iscollapse"
      /></el-aside>
      <el-container>
        <el-header>
          <NavHeader @changeCollapse="changeCollapse" />
        </el-header>
        <el-main>
          <!-- <contentTable :tableData="tableData" :tableConfig="tableConfig" /> -->
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: var(--theme-color);
  transition: width 0.3s linear;
  overflow-x: hidden;
  overflow-y: hidden;
}
.el-header {
  background-color: #fff;
}
.el-main {
  background-color: #edeff2;
}
</style>
