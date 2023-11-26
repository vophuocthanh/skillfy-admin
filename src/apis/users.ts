import type { Pagination } from '@/types/pagination'
import { request } from '@/utils/request'

export interface User {
  id: string
  country: string
  avatarURL: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export const getUsers = async ({
  search,
  country,
  page = 1,
  limit = 5
}: {
  search: string
  country: string
  page?: number
  limit?: number
}) => {
  return request.get<Pagination<User>>('/users', {
    params: {
      email: search || undefined,
      country: country || undefined,
      page: page + 1,
      limit
    }
  })
}

export const createUser = async user => {
  return request.post('/users', user)
}

export const deleteUser = async (id: string) => {
  return request.delete(`/users/${id}`)
}

export const editUser = async ({ id, ...data }: User) => {
  return request.put(`/users/${id}`, data)
}
