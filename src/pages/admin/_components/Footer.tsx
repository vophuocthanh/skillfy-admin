import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="flex w-full items-center justify-between p-6 mt-10 shadow-sm text-xs bg-white">
      <div className="flex gap-4">
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
      </div>
      <span>
        © 2021 Hope UI, Made with ❤ by{' '}
        <Link to="#" className="text-primary">
          IQONIC Design.
        </Link>
      </span>
    </div>
  )
}
