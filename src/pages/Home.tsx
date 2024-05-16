import api from "@/api"

import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import NavMenu from "@/components/NavMenu"
import { ProductsCard } from "@/components/ProductsCard"

export function Home() {
  // console.log("Context:", context)

  const getProducts = async () => {
    //this is how we get the product data from the database
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  return (
    <>
      <div>
        <NavMenu />
        <ProductsCard />
      </div>
    </>
  )
}
