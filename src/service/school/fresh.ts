/*
 * @Description: 应届生管理相关接口
 */

import httpService from '..'
import type {Idata} from '../type'
import type {
    AddFreshBatchRequest,
    AddFreshRequest,
    AddFreshVo,
    DeleteFreshRequest,
    GetFreshListRequest,
    GetFreshListVo,
    RateVo
} from '@/service/school/type'
import type {OutFreshDataRequest} from "@/service/school/type";

/**
 * @description: 添加应届生（单个）
 */
export function addFreshOne(data: AddFreshRequest) {
    return httpService.post<Idata<AddFreshVo>>({
        url: '/school/fresh/add_one',
        data
    })
}

/**
 * @description: 添加应届生（批量）
 */
export function addFreshBatch(data: AddFreshBatchRequest) {
    return httpService.post<Idata<AddFreshVo[]>>({
        url: '/school/fresh/add_list',
        data
    })
}

/**
 * @description: 应届生列表（分页）
 */
export function listFresh(data: GetFreshListRequest) {
    return httpService.get<Idata<GetFreshListVo>>({
        url: '/school/fresh/list',
        params: data
    })
}

/**
 * @description: 删除应届生
 */
export function deleteFresh(data: DeleteFreshRequest) {
    return httpService.post<Idata<GetFreshListVo>>({
        url: '/school/fresh/delete',
        data
    })
}

/**
 * @description: 就业率相关数据查询
 */
export function getRateData() {
    return httpService.get<Idata<RateVo[]>>({
        url: '/school/rate'
    })
}

/**
 * @description: 导出投递记录
 */
export function getOutFreshDataHttp(data: OutFreshDataRequest) {
    return httpService.post<any>({
        url: '/school/data/out',
        data,
        responseType: 'blob'
    })
}

/**
 * @description: 数量范围
 */
export function getFreshOutCountHttp(data:any) {
    return httpService.get<Idata<string[]>>({
        url: '/school/data/count',
        params: data
    })
}