/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4JbP687Wahj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function NavMenu() {
  return (
    <nav className="bg-[#FFA500] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <HexagonIcon className="h-10 w-10 text-white" />
          <div className="flex ml-6 space-x-4">
            <Button className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Button>
            <Button className="text-white px-3 py-2 rounded-md text-sm font-medium">Courses</Button>
            <Button className="text-white px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Button>
            <Button className="text-white px-3 py-2 rounded-md text-sm font-medium">Pricing</Button>
            <Button className="text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Button>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-white mr-8 px-3 py-2 rounded-md text-sm font-medium bg-[#000000]">
            Free Courses
            <Badge variant="secondary">Sale Ends Soon, Get It Now</Badge>
          </div>
          <Button className="text-white bg-[#FF8C00] px-4 py-2 rounded-md text-sm font-bold mr-2">
            Sign Up
          </Button>
          <Button
            className="text-white border-white px-4 py-2 rounded-md text-sm font-bold"
            variant="outline"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  )
}

function HexagonIcon(props) {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  )
}
