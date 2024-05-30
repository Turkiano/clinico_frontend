/**
 * v0 by Vercel.
 * @see https://v0.dev/t/D8H3lURqsf7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#17a2b8] flex items-center justify-between p-4 text-white">
      <Button className="bg-[#138496]">Request Appointment</Button>
      <span className="text-xl">011 2345678</span>
      <Button className="bg-[#138496]">Meet The Doctor</Button>
    </footer>
  )
}
