<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useInfoStore } from '@/stores/main/company/info'
import { useAuthStore } from '@/stores/user/auth'
import ModalForm from '@/components/SecondPackage/modal-form'
import updateConfig from '@/views/main/company/info/config/updateConfig'
import { keepDateRemoveTime } from '@/utils/formatTime'
import Avatar from '@/components/base/avatar'

const updateRef = ref<InstanceType<typeof ModalForm>>()

const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)

const store = useInfoStore()
const { getCompany, changeComId, updateCom } = store
const { companyInfo } = storeToRefs(store)

const info = ref([])
const label = [
  '企业名称',
  '手机号',
  '企业介绍',
  '企业地址',
  '企业规模',
  '企业类型',
  '工作时间',
  '成立时间',
  '企业福利'
]
const icons = ['user', 'user', 'user', 'user', 'user', 'user', 'user', 'user', 'user']
// 获取企业信息
onMounted(async () => {
  await changeComId({
    com_id: userInfo.value.id
  })
  await getCompany()

  // 封装数据
  watch(
    () => companyInfo.value,
    async (newValue) => {
      info.value = []
      await Object.keys(newValue).forEach((value) => {
        if (!(value === 'com_id' || value === 'a_avatar')) {
          info.value.push(newValue[value])
        }
      })
    },
    {
      immediate: true,
      deep: true
    }
  )
})

const size = ref('default')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px'
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default
  }
})

// 弹出修改框
const showModal = () => {
  updateRef.value!.getVisible()
}
// 修改企业信息
const update = async (data: any) => {
  data['com_set_time'] = keepDateRemoveTime(data['com_set_time'])
  const req = ref({
    com_phone: data['com_phone'],
    com_name: data['com_name'],
    com_intro: data['com_intro'],
    com_address: data['com_address'],
    com_num: data['com_num'],
    com_type: data['com_type'],
    com_work_time: data['com_work_time'],
    com_set_time: data['com_set_time'],
    com_welfare: data['com_welfare']
  })
  await updateCom(req.value)
}
</script>

<template>
  <!-- 企业信息 -->
  <div class="info">
    <!--  头像-->
    <div class="avatar">
      <Avatar />
      <span class="username">{{ companyInfo?.com_name }}</span>
    </div>
    <!--  企业信息列表-->
    <el-descriptions class="company" column="1" size="large" border title="企业基本信息">
      <template #extra>
        <el-button type="primary" @click="showModal">编辑</el-button>
      </template>
      <template v-for="(item, index) in icons" :key="item">
        <el-descriptions-item label-class-name="my-label" label-align="center">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <component :is="item" />
              </el-icon>
              {{ label[index] }}
            </div>
          </template>
          {{ info[index] }}
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
  <modal-form
    :form-config="updateConfig"
    ref="updateRef"
    :data="companyInfo"
    @confirm="update"
  ></modal-form>
</template>

<style lang="scss" scoped>
.avatar {
  padding-top: 20px;
  padding-left: 20px;
  width: 100%;
  display: flex;
  align-items: center;
}

.username {
  color: var(--theme-color);
  font-size: 30px;
  font-weight: bold;
  margin-left: 20px;
}

.info {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

// 企业信息框
.company {
  margin: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

:deep(.my-label) {
  width: 10%;
}
</style>
