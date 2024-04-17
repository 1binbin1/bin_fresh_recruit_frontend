import httpService from '@/service'
import type { Idata } from '@/service/type'
import type { Iuser } from '@/service/user/type'

export function getDict(dict_type: number) {
  return httpService.get<Idata<String[]>>({
    url: '/dict/get',
    params: {
      dict_type
    }
  })
}

// 上传头像
export function uploadAvatar(data: FormData) {
  return httpService.post<Idata<Iuser>>({
      url: '/account/upload',
      headers: {
          'Content-Type': 'multipart/form-data'
      },
      data
  })
}
