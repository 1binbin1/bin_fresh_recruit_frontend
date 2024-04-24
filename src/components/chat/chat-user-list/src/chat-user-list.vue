<script setup lang="ts">
import { defineEmits, defineProps, onMounted } from 'vue'
import { formatUTC } from '@/utils/formatTime'

defineProps({
  userType: {
    type: Number,
    default: 1
  },
  latelyInfo: {}
})
const emit = defineEmits(['changeStyle'])
const changeStyle = (data: any) => {
  emit('changeStyle', data)
}
</script>

<template>
  <div class="list">
    <div class="list-inner" v-if="userType === 2">
      <div
        class="list-info"
        v-for="item in latelyInfo"
        :key="item"
        @click="changeStyle(item)"
        :id="item.user_id"
      >
        <div class="info">
          <div class="imgContain">
            <img class="img" :src="item.a_avatar" alt="" />
          </div>
          <div class="user-info">{{ item.user_name === '' ? '暂无昵称' : item.user_name }}</div>
        </div>
        <div class="time">{{ formatUTC(item.create_time) }}</div>
      </div>
    </div>
    <div class="list-inner" v-if="userType === 1">
      <div
        class="list-info"
        v-for="item in latelyInfo"
        :key="item"
        @click="changeStyle(item)"
        :id="item.com_id"
      >
        <div class="info">
          <div class="imgContain">
            <img class="img" :src="item.a_avatar" alt="" />
          </div>
          <div class="user-info">{{ item.com_name === '' ? '暂无昵称' : item.com_name }}</div>
        </div>
        <div class="time">{{ formatUTC(item.create_time) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active {
  background-color: var(--theme-color);
  color: #fff;
  font-weight: bolder;
  transform: scale(1.03);
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  order: -1;
}

.list {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  height: 655px;
  overflow-y: auto;
  overflow-x: hidden;
}

.list-info {
  width: 100%;
  height: 90px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.imgContain {
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
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

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}

.user-info {
  font-size: 18px;
}

.time {
  float: right;
  margin-bottom: 10px;
  margin-top: -10px;
  margin-right: 10px;
}
</style>
