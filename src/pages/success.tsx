import background from '@/assets/images/bg-circle-2.png'
import success from '@/assets/images/success.png'
import bgLogo from '@/assets/images/bg-logo.png'
import { Button } from '@/components/Button'
import { Link } from '@/router'

export default function Success() {
  return (
    <div className="relative flex items-center justify-between h-screen">
      <div className="z-0 opacity-70">
        <img
          src={bgLogo}
          alt="backgroundColor"
          className="absolute top-0 w-125 h-100 left-[29%]"
        />
      </div>
      <div className="flex flex-col items-center justify-center m-auto w-2/4">
        <div className="flex flex-col items-center justify-center m-auto ">
          <img src={success} alt="Success" className="flex w-86 h-23" />
          <h1 className="text-6xl font-bold text-blue-800 ">Success !</h1>
          <p className="w-1/2 text-center text-slate-800 mb-7">
            A email has been send to your email@domain.com. Please check for an
            email from company and click on the included link to reset your
            password.
          </p>
          <Link to="/">
            <Button className="w-48" type="button">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative z-20 w-1/2 h-screen bg-gradient-to-br from-blue-500 to-blue-900 ">
        <img
          className="absolute w-250 top-[-80px] h-screen m-0 opacity-10 right-0"
          src={background}
          alt="background"
        />
      </div>
    </div>
  )
}
