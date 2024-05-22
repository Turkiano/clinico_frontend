import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTokenFromStorage() {
  const token = localStorage.getItem("token")
  if (!token) return null

  return token
}

export function reshapeUsher(decodedToken: unknown) {
  const decodedUser: any = {}

 if (decodedToken) {
    //to get the key and the value
    for (const [key, value] of Object.entries(decodedToken)) {
      //this is to format the output with the URL
      let cleanKey = ""

      if (key.startsWith("http")) {
        cleanKey = key.split("identity/claims/")[1]
      } else {
        cleanKey = key
      }
      decodedUser[cleanKey] = value
    }
  }

  return decodedUser
}