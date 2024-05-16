export type Product = {
  id: string
  name: string
  categoryId: number
  image: string
  description: string
  quantity: number
  price: number
}

export type Category = {

  id: string
  name: string
  products :  []
  
}