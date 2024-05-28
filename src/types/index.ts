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
