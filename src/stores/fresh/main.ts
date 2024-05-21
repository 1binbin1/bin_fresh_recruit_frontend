// 主页
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GetRecommendListRequest } from '@/service/fresh/type'
import { getJobListByHttp, getUserInfoHttp, updateUserInfoHttp } from '@/service/fresh/request'
import type { FreshUserInfo } from '@/service/fresh/type'
import { showMsg } from '@/utils/message'

export const useMainStore = defineStore('freshMain', () => {
  const recommendResult = ref()
  const reqData = ref<GetRecommendListRequest>({
    limit: Math.floor(Math.random() * (12 - 9 + 1)) + 9,
    is_recommend: 1 // 0-否 1-是
  })
  // 推荐的岗位
  const getRecommendList = async () => {
    const res = await getJobListByHttp(reqData.value)
    if (res.code === 0) {
      recommendResult.value = res.data
    }
  }
  // 获取个人信息
  const freshOneInfo = ref()
  const getFreshInfo = async (data: string) => {
    const res = await getUserInfoHttp({
      user_id: data
    })
    if (res.code === 0) {
      freshOneInfo.value = res.data
      if (freshOneInfo.value.user_sex === 0) {
        freshOneInfo.value.user_sex = '男'
      } else {
        freshOneInfo.value.user_sex = '女'
      }
    }
  }
  // 修改个人信息
  const updateFreshInfo = async (data: any) => {
    const res = await updateUserInfoHttp(data)
    if (res.code === 0) {
      showMsg('修改成功', 'success')
    } else {
      showMsg('修改失败，请重试', 'error')
    }
  }
  return { recommendResult, freshOneInfo, getFreshInfo, getRecommendList, updateFreshInfo }
})
