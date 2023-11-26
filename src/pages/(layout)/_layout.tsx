import { Outlet } from 'react-router-dom'
import Header from './_components/Header'
import Footer from './_components/Footer'

export default function Layout() {
  return (
    <div className="">
      <div className="max-w-5xl pt-10 mx-auto">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
