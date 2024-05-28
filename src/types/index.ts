import axios from "axios"

const isDevelopment = import.meta.env.MODE === `development`
let baseURL = "htpp://localhost:5125/api/v1"

if (!isDevelopment) {
  baseURL = "https://clinico-backend.onrender.com/api/v1"
}

const api = axios.create({
  baseURL
})

export type Product = {
  id: string
  name: string
  categoryId: number
  image: string
  description: string
  quntity: number
  price: number
}

export type Category = {
  id: string
  name: string
  products: []
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string

  nameidentifier: string
}

export const Role = {
  Customer: "Customer",
  Admin: "Admin"
} as const

export type DecodedUser = {
  aud: string
  emailaddress: string

  nameidentifier: string
  exp: number
  iss: string
  name: string
  role: keyof typeof Role
}

export type Order = {
  id: string
  userId: string
  date: string
  orderItem: string
}

export default api
