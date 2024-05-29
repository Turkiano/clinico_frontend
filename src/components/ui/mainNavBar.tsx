/**
 * v0 by Vercel.
 * @see https://v0.dev/t/M2eTOagBwKY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { Link } from "react-router-dom"
import { Cart } from "../component/cart"

export function MainNavBar() {
  const context = useContext(GlobalContext) //this to conect to the global context
  if (!context) throw Error("Context is missing")
  const { state } = context

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white dark:bg-gray-950 shadow">
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-2 text-lg font-semibold" to="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            to="#"
          >
            Home
          </Link>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            to="#"
          >
            Shop
          </Link>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            to="#"
          >
            About
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Button className="rounded-full" size="icon" variant="ghost">
          <UserIcon className="h-6 w-6" />
          <span className="sr-only">Profile</span>
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="sr-only">Cart</span>
        </Button>
        <Button variant="outline">Login</Button>
      </div>
    </header>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

;<Cart />

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
