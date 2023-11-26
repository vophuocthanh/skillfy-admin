import { getToken } from '@/utils/token'
import { Outlet, Navigate } from 'react-router-dom'

export default function Layout() {
  if (getToken()) {
    return <Navigate to="/admin" />
  }
  return <Outlet />
}
