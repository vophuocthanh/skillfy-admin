import type { Pagination } from '@/types/pagination'
import { request } from '@/utils/request'

export interface Country {
  id: string
  name: string
}

export const getCountries = async ({
  q,
  pageParam = 1,
  limit = 10
}: {
  q?: string
  pageParam?: number
  limit?: number
}) => {
  return request.get<Pagination<Country>>('/countries', {
    params: {
      q,
      page: pageParam,
      limit
    }
  })
}
