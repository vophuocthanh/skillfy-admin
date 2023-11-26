import { request } from '@/utils/request'

export const signIn = async (email: string, password: string) => {
  return request.post(`/sign-in`, {
    email,
    password
  })
}

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
) => {
  return request.post(`/sign-up`, {
    email,
    password,
    firstName,
    lastName,
    phoneNumber
  })
}

export const getProfile = async () => {
  return request.get(`/profile`)
}
