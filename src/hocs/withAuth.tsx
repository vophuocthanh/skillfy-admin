import { Navigate } from '@/router'
import { getToken } from '@/utils/token'

export function withAuth<Props>(Component: React.ComponentType<Props>) {
  return function (props: Props & React.HTMLAttributes<HTMLElement>) {
    const isAuth = getToken()
    if (!isAuth) {
      return <Navigate to="/login" />
    }
    return <Component {...props} />
  }
}
