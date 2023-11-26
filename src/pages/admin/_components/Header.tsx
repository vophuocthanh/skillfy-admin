import Logo from '@/assets/svgs/logo-1.svg'
import { Avatar } from '@/components/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/DropdownMenu'
import { Input } from '@/components/Input'
import { Skeleton } from '@/components/Skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/Tooltip'
import clsx from 'clsx'
import { ArrowLeft, ArrowRight, LogOut, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

interface User {
  email: string
  avatarURL: string
  firstName: string
  lastName: string
}

interface Props {
  user: User
  isToggler: boolean
  onToggle: () => void
  loading?: boolean
}

export default function Header({ user, loading, isToggler, onToggle }: Props) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return (
    <div className="flex shadow-sm">
      <div
        className={clsx('py-4 px-4', {
          'w-70': isToggler,
          'w-24': !isToggler
        })}
      >
        <div className="flex items-center font-medium relative">
          <Link to="/" className="flex gap-3">
            <img src={Logo} alt="logo" />
            {isToggler && <h1 className="text-4xl">Hope Ui</h1>}
          </Link>
          <div
            onClick={onToggle}
            className="bg-primary hover:scale-105 rounded-full flex justify-center items-center h-7 w-7 absolute -right-6 cursor-pointer"
          >
            {isToggler ? (
              <ArrowLeft className="text-white" />
            ) : (
              <ArrowRight className="text-white" />
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx('flex justify-between py-4 px-4', {
          'w-[calc(100%-17.5rem)]': isToggler,
          'w-[calc(100%-6rem)]': !isToggler
        })}
      >
        <Input icon={Search} placeholder="Search" className="w-64" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex space-x-4">
                    {loading ? (
                      <>
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="w-max space-y-2">
                          <Skeleton className="h-4" />
                          <Skeleton className="h-4" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Avatar url={user.avatarURL} />
                        <div className="w-max">
                          <h2 className="text-slate-800">
                            {user.firstName + ' ' + user.lastName}
                          </h2>
                          <p className="text-xs text-gray-400">
                            Marketing Administrator
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>Account</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
