/**
 * @description: 应届生相关请求
 */
import type {
  ResumeRequest,
  FreshUserInfo,
  GetJobInfoOneRequest,
  GetJobInfoOneVo,
  UpdateUserInfoRequest,
  AddJobPurposeRequest,
  JobPurposeInfo,
  UpdateJobPurposeRequest,
  JobPurposeRequest,
  FreshResumeSendRequest,
  FreshSendStatusListRequest
} from '@/service/fresh/type'
import httpService from '..'
import type { Idata } from '../type'
import type { GetFreshUserInfoRequest, ResumeInfo } from '@/service/fresh/type'
import type {
  FreshSendStatusPage,
  GetJobListRequest,
  GetJobListVo,
  GetRecommendListRequest,
  ResumeSendInfo
} from '@/service/fresh/type'
import type { GetMessageByFreshRequest } from '@/service/fresh/type'
import type { GetMessageByFreshVo } from '@/service/fresh/type'

// 查询岗位信息-单个
export function getJobInfoOneHttp(data: GetJobInfoOneRequest) {
  return httpService.get<Idata<GetJobInfoOneVo>>({
    url: '/com/job/one',
    params: data
  })
}

// 查询岗位信息-首页列表
export function getJobListBySearchHttp(data: GetJobListRequest) {
  return httpService.post<Idata<GetJobListVo>>({
      url: '/com/job/list/search',
      data
  })
}

// 推荐岗位列表
export function getJobListByHttp(data: GetRecommendListRequest) {
  return httpService.get<Idata<GetJobInfoOneVo[]>>({
    url: '/fresh/job/recommend',
    params: data
  })
}

// ======================= 个人信息 =======================
// 修改个人信息
export function updateUserInfoHttp(data: UpdateUserInfoRequest) {
  return httpService.post<Idata<FreshUserInfo>>({
      url: '/fresh/info/update',
      data
  })
}

// 查询个人信息
export function getUserInfoHttp(data: GetFreshUserInfoRequest) {
  return httpService.get<Idata<FreshUserInfo>>({
    url: '/fresh/info/one',
    params: data
  })
}

// ======================= 简历附件 =======================
// 添加简历附件
export function addResumeHttp(data: FormData) {
  return httpService.post<Idata<ResumeInfo>>({
      url: '/fresh/resume/add',
      headers: {
          'Content-Type': 'multipart/form-data'
      },
      data
  })
}

// 删除简历附件
export function deleteResumeHttp(data: ResumeRequest) {
  return httpService.post<Idata<string>>({
      url: '/fresh/resume/delete',
      data
  })
}

// 查询简历附件列表
export function getResumeListHttp() {
  return httpService.get<Idata<ResumeInfo[]>>({
    url: '/fresh/resume/list'
  })
}

// 查询简历附件信息
export function getResumeInfoHttp(data: ResumeRequest) {
  return httpService.get<Idata<ResumeInfo>>({
    url: '/fresh/resume/one',
    params: data
  })
}

// ======================= 岗位意向 =======================
// 新增岗位意向
export function addJobPurposeHttp(data: AddJobPurposeRequest) {
  return httpService.post<Idata<JobPurposeInfo>>({
      url: '/fresh/purpose/add',
      data
  })
}

// 修改岗位意向
export function updateJobPurposeHttp(data: UpdateJobPurposeRequest) {
  return httpService.post<Idata<JobPurposeInfo>>({
      url: '/fresh/purpose/update',
      data
  })
}

// 删除岗位意向
export function deleteJobPurposeHttp(data: JobPurposeRequest) {
  return httpService.post<Idata<number>>({
      url: '/fresh/purpose/delete',
      data
  })
}

// 岗位意向列表
export function getJobPurposeListHttp() {
  return httpService.get<Idata<JobPurposeInfo>>({
    url: '/fresh/purpose/list'
  })
}

// 岗位意向回显
export function getJobPurposeOneHttp(data: JobPurposeRequest) {
  return httpService.get<Idata<JobPurposeInfo>>({
    url: '/fresh/purpose/one',
    params: data
  })
}

// ======================= 岗位投递 =======================
// 投递岗位
export function freshSendResumeHttp(data: FreshResumeSendRequest) {
  return httpService.post<Idata<ResumeSendInfo>>({
      url: '/fresh/resume/send',
      data
  })
}

// 投递进度列表
export function getFreshSendStatusListHttp(data: FreshSendStatusListRequest) {
  return httpService.get<Idata<FreshSendStatusPage>>({
    url: '/fresh/resume/send/state',
    params: data
  })
}

// 应届生获取资讯列表
export function getMessageListByFreshHttp(data: GetMessageByFreshRequest) {
  return httpService.get<Idata<GetMessageByFreshVo>>({
    url: '/fresh/message/get',
    params: data
  })
}
