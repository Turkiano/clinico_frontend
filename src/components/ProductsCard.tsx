import api from "@/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useContext } from "react"

import { GlobalContext } from "@/App"

type ProductCardProps = {
  data: Product[] | undefined
}

export function ProductsCard({ data }: ProductCardProps) {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is missing")
  const { state, handelAddToCart } = context

  // const getProducts = async () => {
  //   try {
  //     const res = await api.get("/products")
  //     return res.data
  //   } catch (error) {
  //     console.error(error)
  //     return Promise.reject(new Error("Something went wrong"))
  //   }
  // }

  // // Queries
  // const { data, error } = useQuery<Product[]>({
  //   queryKey: ["products"],
  //   queryFn: getProducts
  // })

  return (
    <div>
      <h3>Cart ({state.cart.length})</h3>
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto mb-5">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <img src={product.image} className="mb-4 h-48 object-contain" />
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>SAR {product.price}</p>
            </CardContent>
            <CardFooter>
              <Link className="w-full" to={`/product/${product.id}`}>
                <Button className="w-80%">Show Details</Button>
              </Link>
              <Link className="w-full" to="">
                <Button className="w-80%" onClick={() => handelAddToCart(product)}>
                  Add to Cart
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  )
}
