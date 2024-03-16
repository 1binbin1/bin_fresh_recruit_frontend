/*
 * @Description: 岗位信息相关接口
 */
import httpService from '..'
import type {Idata} from '../type'
import {
    AddJobRequest,
    DeleteJpbRequest, FilrateRequest, FilrateVo, FreshSendListRequest, FreshSendListVo,
    JobInfoVo,
    ListJobRequest,
    ListJobRequestVo,
    UpdateJobRequest
} from "@/service/company/type";

/**
 * @description: 新增岗位信息
 */
export function addJobInfo(data: AddJobRequest) {
    return httpService.post<Idata<JobInfoVo>>({
        url: "/com/job/add",
        data
    })
}

/**
 * @description: 修改岗位信息
 */
export function updateJobInfo(data: UpdateJobRequest) {
    return httpService.post<Idata<JobInfoVo>>({
        url: "/com/job/update",
        data
    })
}

/**
 * @description: 删除岗位信息
 */
export function deleteJobInfo(data: DeleteJpbRequest) {
    return httpService.post<Idata<string>>({
        url: "/com/job/delete",
        data
    })
}

/**
 * @description: 岗位列表
 */
export function listJobInfo(data: ListJobRequest) {
    return httpService.post<Idata<ListJobRequestVo>>({
        url: "/com/job/list/company",
        data
    })
}

/**
 * @description: 简历筛选
 */
export function filrateResume(data: FilrateRequest) {
    return httpService.post<Idata<FilrateVo>>({
        url: "/com/job/filrate",
        data
    })
}

/**
 * @description: 投递列表
 */
export function freshSendList(data: FreshSendListRequest) {
    return httpService.post<Idata<FreshSendListVo>>({
        url: "/com/job/send",
        data
    })
}