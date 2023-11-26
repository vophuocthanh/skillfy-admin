import React from 'react'
import avatar from '@/assets/images/avatar.png'
import bgLogo from '@/assets/images/bg-logo.png'
import { Button } from '@/components/Button'
import { useNavigate } from '@/router'
import background from '@/assets/images/bg-circle.png'
import { Input } from '@/components/Input'
import { toast } from 'sonner'

export default function Lock() {
  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const password = data.get('password')
    if (password === '123456') {
      localStorage.setItem('isAuth', 'true')
      navigate('/')
      toast.success('Login successfully')
    } else {
      toast.error('Email or password is incorrect')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="z-0 opacity-70">
        <img
          src={bgLogo}
          alt="background-color-lock-screen"
          className="absolute top-[-100px] left-[-195px]"
        />
      </div>
      <div className="flex justify-start w-2/5 mr-auto">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center m-auto w-98"
        >
          <div className="flex flex-col items-center justify-center m-auto w-98">
            <img src={avatar} alt="avatar-user" className="flex w-100 h-100 " />
            <h1 className="text-3xl font-medium text-slate-800 ">
              Hi ! Austin Robertson
            </h1>
            <p className="text-center text-gray-400 w-125 mb-7">
              Enter your password to access the admin.
            </p>
            <div className="">
              <label
                htmlFor="password"
                className="flex mb-2 text-gray-400 cursor-pointer w-25"
              >
                Password
              </label>
              <Input
                placeholder="Password"
                className="mb-8 w-88"
                type="password"
                id="password"
                name="password"
              />
            </div>
            <Button className="w-48" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
      <div className="relative w-[60%] h-screen bg-gradient-to-br from-blue-500 to-blue-900 ">
        <img
          className="absolute top-0 h-screen m-0 ml-40 opacity-10 right 0"
          src={background}
          alt="background"
        />
      </div>
    </div>
  )
}
