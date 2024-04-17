/*
 * @Description: 资讯管理相关接口
 */

import httpService from '..'
import type { Idata } from '../type'
import type {} from './type'
import type {
  AddMessageRequest,
  AddMessageVo,
  DeleteMessageRequest,
  DeleteMessageVo,
  MessageListRequest,
  MessageListVo,
  UpdateMessageRequest,
  UpdateMessageVo
} from './type'

/**
 * @description: 发布资讯
 */
export function addMessage(data: AddMessageRequest) {
  return httpService.post<Idata<AddMessageVo>>({
      url: '/school/message',
      data
  })
}

/**
 * @description: 资讯列表
 */
export function listMessage(data: MessageListRequest) {
  return httpService.post<Idata<MessageListVo>>({
      url: '/school/message/list',
      data
  })
}

/**
 * @description: 资讯修改
 */
export function updateMessage(data: UpdateMessageRequest) {
  return httpService.post<Idata<UpdateMessageVo>>({
      url: '/school/message/update',
      data
  })
}

/**
 * @description: 资讯删除
 */
export function deleteMessage(data: DeleteMessageRequest) {
  return httpService.post<Idata<DeleteMessageVo>>({
      url: '/school/message/delete',
      data
  })
}
