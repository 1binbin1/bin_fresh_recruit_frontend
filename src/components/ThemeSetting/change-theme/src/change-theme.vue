<script setup lang="ts">
// 可视化
import {defineExpose, ref} from "vue";

const dialogVisible = ref(true)
defineExpose({
  getVisible() {
    dialogVisible.value = true
  }
})
const cancel = () => {
  dialogVisible.value = false
}

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 主题颜色
const themeColor = ref('rgb(0, 166, 167)')
const changeTheme = () => {
  document.documentElement.style.setProperty('--theme-color',themeColor.value)
}
const toDefaultTheme = ()=>{
  const color = 'rgb(0, 166, 167)'
  themeColor.value = color
  document.documentElement.style.setProperty('--theme-color',color)
}

// 导航栏被选中
const themeActiveColor = ref('rgb(0, 166, 167)')
const changeThemeActive = () => {
  document.documentElement.style.setProperty('--theme-active-color',themeActiveColor.value)
}
const toDefaultThemeActive = ()=>{
  const color = 'rgb(0, 133, 134)'
  themeActiveColor.value = color
  document.documentElement.style.setProperty('--theme-color',color)
}
</script>

<template>
  <div class="change-theme">
    <el-dialog v-model="dialogVisible" title="主题切换" width="40%" align-center>
      <div class="content">
        <div class="content-center">
          <el-descriptions class="item">
            <el-descriptions-item label="主题色">
              <el-color-picker v-model="themeColor" show-alpha :predefine="predefineColors" size="large"
                               color-format="hsl" @change="changeTheme"/>
              <el-link class="link" @click="toDefaultTheme" :underline="false">恢复默认</el-link>
            </el-descriptions-item>
            <el-descriptions-item label="导航栏选中">
              <el-color-picker v-model="themeActiveColor" show-alpha :predefine="predefineColors" size="large"
                               color-format="hsl" @change="changeThemeActive"/>
              <el-link class="link" @click="toDefaultThemeActive" :underline="false">恢复默认</el-link>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="content-bottom">
          <el-button class="cancel" @click="cancel">取消</el-button>
          <el-button class="confirm" type="success">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.content-bottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.cancel {
  margin-right: 20px;
}

.cancel, .confirm {
  width: 20%;
  height: 38px;
}

.content-center {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin-left: 15px;
}

.content-center .item {
  margin: 10px 0;
}
.link{
  margin-left: 15px;
}
</style>
