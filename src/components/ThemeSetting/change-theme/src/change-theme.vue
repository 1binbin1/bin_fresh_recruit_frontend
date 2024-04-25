<script setup lang="ts">
// 可视化
import {defineExpose, onMounted, ref} from "vue";
import {useCommonStore} from "@/stores/common/common";
import {storeToRefs} from "pinia";
import localCache from "@/utils/localCache";

const store = useCommonStore()
const {saveTheme, getTheme} = store
const {themeResult} = storeToRefs(store)

const dialogVisible = ref(false)
defineExpose({
  getVisible() {
    dialogVisible.value = true
  }
})
const cancel = () => {
  dialogVisible.value = false
}

const themeColor = ref('')
const themeActiveColor = ref('')
onMounted(async () => {
  // 加载颜色
  await getTheme(localCache.getCache('userId'))
  document.documentElement.style.setProperty('--theme-color', themeResult.value.ts_theme_color)
  document.documentElement.style.setProperty('--theme-active-color', themeResult.value.ts_theme_active_color)
  themeColor.value = themeResult.value.ts_theme_color
  themeActiveColor.value = themeResult.value.ts_theme_active_color
})

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
const changeTheme = async (data: number, type: number) => {
  if (data === 1) {
    const color = (type === 1 ? themeColor.value : 'rgb(0, 166, 167)')
    await saveTheme({
      a_id: localCache.getCache('userId'),
      theme_type: 1,
      color: color,
    })
    document.documentElement.style.setProperty('--theme-color', themeResult.value.ts_theme_color)
    themeColor.value = color
  }

  if (data === 2) {
    const color = (type === 1 ? themeActiveColor.value : 'rgb(0, 133, 134)')
    await saveTheme({
      a_id: localCache.getCache('userId'),
      theme_type: 2,
      color: color,
    })
    document.documentElement.style.setProperty('--theme-active-color', themeResult.value.ts_theme_active_color)
    themeActiveColor.value = color
  }
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
                               color-format="hsl" @change="changeTheme(1,1)"/>
              <el-link class="link" @click="changeTheme(1,2)" :underline="false">恢复默认</el-link>
            </el-descriptions-item>
            <el-descriptions-item label="导航栏选中">
              <el-color-picker v-model="themeActiveColor" show-alpha :predefine="predefineColors" size="large"
                               color-format="hsl" @change="changeTheme(2,1)"/>
              <el-link class="link" @click="changeTheme(2,2)" :underline="false">恢复默认</el-link>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
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

.link {
  margin-left: 15px;
}
</style>
