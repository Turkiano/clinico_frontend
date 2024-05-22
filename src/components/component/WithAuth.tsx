import { Role } from "@/types"
import { ReactElement } from "react"
import jwt from "jwt-decode"
import { Navigate } from "react-router-dom"
import { reshapeUsher } from "@/lib/utils"

export function WithAuth({ children }: { children: ReactElement }) {
  console.log("Global Data")

  const token = localStorage.getItem("token") || "" // to collect the token from the localStore
  const decodedToken = jwt(token)
  const decodedUser: any = reshapeUsher(decodedToken)

  

  console.log(decodedUser.role,  Role.Customer);
  

  return decodedUser.role === Role.Customer ? <Navigate to="/login" /> : children
}
