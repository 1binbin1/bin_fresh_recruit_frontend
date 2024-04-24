<script setup lang="ts">
import { useFreshStore } from '@/stores/main/school/fresh'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const store = useFreshStore()
const { getFreshRateData } = store
const { freshRateData } = storeToRefs(store)
onMounted(async () => {
  await getFreshRateData()
})
</script>

<template>
  <div class="freshData">
    <template v-for="item in freshRateData" :key="item">
      <el-card shadow="hover" style="width: 12%">
        <div class="title">{{ item.label }}</div>
        <div class="content">{{ item.num_data }}</div>
      </el-card>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.freshData {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}
.content {
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 28px;
  font-weight: 700;
  color: var(--theme-color);
}

::v-deep .el-card__body {
  padding: 15px;
}
</style>
