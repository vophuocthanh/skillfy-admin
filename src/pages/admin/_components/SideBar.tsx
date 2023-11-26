import {
  Accordion,
  AccordionContent,
  AccordionItem
} from '@/components/Accordion'
import { cn } from '@/lib/utils'
import { AccordionTrigger } from '@radix-ui/react-accordion'
import clsx from 'clsx'
import {
  BookmarkMinus,
  Building2,
  ChevronRight,
  Edit,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  User,
  Users
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const SIDER_BAR = [
  {
    label: 'Home',
    items: [
      {
        label: 'Dashboard',
        icon: <LayoutDashboard />,
        href: '/admin/'
      },
      {
        label: 'Authentication',
        icon: <ShieldCheck />,
        href: '/admin/authentication'
      },
      {
        label: 'Menu Styles',
        icon: <Settings2 />
      },
      {
        label: 'Utilities',
        icon: <BookmarkMinus />,
        children: [
          {
            label: 'User Profile',
            icon: <User />,
            href: '/admin/menu-styles'
          },
          {
            label: 'Edit User',
            icon: <Edit />,
            href: '/admin/edit-user'
          }
        ]
      }
    ]
  },
  {
    label: 'Pages',
    items: [
      {
        label: 'Users',
        icon: <Settings2 />,
        href: '/admin/users',
        children: [
          {
            label: 'User List',
            icon: <Users />,
            href: '/admin/users/'
          },
          {
            label: 'User Profile',
            icon: <User />,
            href: '/admin/users/profile'
          },
          {
            label: 'Edit User',
            icon: <Edit />,
            href: '/admin/users/edit'
          }
        ]
      },
      {
        label: 'Company',
        icon: <Building2 />,
        href: '/admin/companies'
      },
      {
        label: 'Utilities',
        icon: <BookmarkMinus />,
        children: [
          {
            label: 'User Profile',
            icon: <User />,
            href: '/admin/menu-styles'
          },
          {
            label: 'Edit User',
            icon: <Edit />,
            href: '/admin/edit-user'
          }
        ]
      }
    ]
  }
]

interface Props {
  isToggler: boolean
}

export default function SideBar({ isToggler }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div
      className={clsx('h-[calc(100vh-78px)] px-2 py-2 space-y-5 shadow-md', {
        'w-70': isToggler,
        'w-24': !isToggler
      })}
    >
      {SIDER_BAR.map(sidebar => (
        <div key={sidebar.label} className="border-b last:border-none">
          <h1 className="mb-4 font-semibold text-gray-400">{sidebar.label}</h1>
          <Accordion type="single" collapsible>
            {sidebar.items.map(item => {
              return item.children?.length > 0 ? (
                <AccordionItem key={item.label} value={item.label}>
                  <AccordionTrigger
                    className={cn(
                      '[&[data-state=open]>svg]:rotate-90 justify-between flex items-center gap-4 p-3 text-gray-400 rounded-md cursor-pointer hover:bg-primary w-full hover:text-white h-11',
                      {
                        'bg-primary text-white': location.pathname.includes(
                          item.href
                        )
                      }
                    )}
                  >
                    <div className="flex gap-4">
                      {item.icon}
                      {isToggler && <h1>{item.label}</h1>}
                    </div>
                    <ChevronRight />
                  </AccordionTrigger>
                  <AccordionContent className="pl-3">
                    {item.children.map(child => (
                      <div
                        onClick={() => navigate(child.href)}
                        key={child.label}
                        className={cn(
                          'hover:bg-primary my-1 text-gray-400 p-3 rounded-md w-full hover:text-white flex h-11 items-center cursor-pointer gap-4',
                          {
                            'bg-primary text-white':
                              child.href === location.pathname
                          }
                        )}
                      >
                        {child.icon}
                        {isToggler && <h1>{child.label}</h1>}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div
                  onClick={() => navigate(item.href)}
                  key={item.label}
                  className={cn(
                    'hover:bg-primary my-1 text-gray-400 pl-3 rounded-md w-full hover:text-white flex h-11 items-center cursor-pointer gap-4',
                    {
                      'bg-primary text-white': item.href === location.pathname
                    }
                  )}
                >
                  {item.icon}
                  {isToggler && <h1>{item.label}</h1>}
                </div>
              )
            })}
          </Accordion>
        </div>
      ))}
    </div>
  )
}
