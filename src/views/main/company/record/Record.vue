<script setup lang="ts">

import LoginRecord from "@/components/login-record/src/login-record.vue";
import {onMounted, ref} from "vue";
import localCache from "@/utils/localCache";

const aId = ref()
aId.value = localCache.getCache("userId")
</script>

<template>
  <div class="com-record">
    <LoginRecord :userId="aId"></LoginRecord>
  </div>
</template>

<style lang="scss" scoped>

</style>
