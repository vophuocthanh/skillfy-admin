import { signUp } from '@/apis/auth'
import bgSignUp from '@/assets/images/bg-signup.png'
import facebook from '@/assets/svgs/facebook.svg'
import gmail from '@/assets/svgs/gmail.svg'
import instagram from '@/assets/svgs/instagram.svg'
import linkedin from '@/assets/svgs/linkedin.svg'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Input } from '@/components/Input'
import { Link, useNavigate } from '@/router'
import { SignUpSchema } from '@/utils/shema'
import { setToken } from '@/utils/token'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const socials = [
  {
    name: 'gmail',
    image: gmail,
    link: 'https://accounts.google.com/v3/signin/identifier?flowName=GlifWebSignIn'
  },
  {
    name: 'facebook',
    image: facebook,
    link: 'https://www.facebook.com/'
  },
  {
    name: instagram,
    image: instagram,
    link: 'https://www.instagram.com/'
  },
  {
    name: linkedin,
    image: linkedin,
    link: 'https://www.linkedin.com/'
  }
]

type SignUpInputs = z.infer<typeof SignUpSchema>

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur'
  })
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<SignUpInputs> = async ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber
  }) => {
    try {
      const res = await signUp(
        email,
        password,
        firstName,
        lastName,
        phoneNumber
      )
      setToken(res.data.accessToken)
      toast.success('Login Success')
      navigate('/login')
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="xl:flex xl:justify-between">
      <div className="hidden xl:block">
        <img className="h-screen" src={bgSignUp} alt="background sign up" />
      </div>
      <div className="relative flex items-center justify-center h-screen xl:w-1/2 2xl:w-2/3">
        <form
          className="flex flex-col items-center w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 text-center">
            <h2 className="mb-4 text-3xl font-semibold">Sign Up</h2>
            <p className="text-gray-400">Create your Real Estate account</p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <label>
              <span className="text-gray-400">First Name</span>
              <Input placeholder="First Name" {...register('firstName')} />
              {errors.firstName && (
                <p className="mt-1 text-red-500">{errors.firstName.message}</p>
              )}
            </label>
            <label>
              <span className="text-gray-400">Last Name</span>
              <Input placeholder="Last Name" {...register('lastName')} />
              {errors.lastName && (
                <p className="mt-1 text-red-500">{errors.lastName.message}</p>
              )}
            </label>
            <label>
              <span className="text-gray-400">Email</span>
              <Input placeholder="Email" {...register('email')} />
              {errors.email && (
                <p className="mt-1 text-red-500">{errors.email.message}</p>
              )}
            </label>
            <label>
              <span className="text-gray-400">Phone No.</span>
              <Input placeholder="Phone" {...register('phoneNumber')} />
              {errors.phoneNumber && (
                <p className="mt-1 text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </label>
            <label>
              <span className="text-gray-400">Password</span>
              <Input
                placeholder="Password"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-red-500">{errors.password.message}</p>
              )}
            </label>
            <label>
              <span className="text-gray-400">Confirm password</span>
              <Input
                placeholder="Confirm Password"
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </label>
          </div>
          <label className="my-6 text-gray-400 ">
            <Checkbox name="checkbox" />
            <span className="ml-2">I agree with the terms of use</span>
          </label>
          <Button className="w-48" type="submit">
            Sign Up
          </Button>
          <div className="mt-4 text-center">
            <p>or sign up with other accounts?</p>
            <div className="flex justify-center mt-4">
              {socials.map(social => (
                <a href={social.link} key={social.name}>
                  <img src={social.image} alt={social.name} />
                </a>
              ))}
            </div>
            <p>
              Already have an Account{' '}
              <Link to="/login" className="text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
