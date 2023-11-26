import * as z from 'zod'
import { validator } from './validator'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email('Email must be valid'),
  password: z
    .string()
    .min(1, {
      message: 'Password is required'
    })
    .regex(
      validator.password,
      'Password must contain at least 8 characters, 1 letter and 1 number'
    )
})

export const SignUpSchema = LoginSchema.extend({
  firstName: z.string().min(1, {
    message: 'First Name is required'
  }),
  confirmPassword: z
    .string()
    .min(1, {
      message: 'Password is required'
    })
    .regex(
      validator.password,
      'Password must contain at least 8 characters, 1 letter and 1 number'
    ),
  lastName: z.string().min(1, {
    message: 'Last Name is required'
  }),
  phoneNumber: z
    .string()
    .min(1, {
      message: 'Phone Number is required'
    })
    .regex(validator.phone, 'Phone number is not valid')
}).refine(data => data.confirmPassword === data.password, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

export const CreateCompanySchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required'
  }),
  logo: z.string().min(1, {
    message: 'Logo is required'
  })
})
