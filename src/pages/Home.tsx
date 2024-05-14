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
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import NavMenu from "@/components/NavMenu"
import { Link } from "react-router-dom"

export function Home() {
  const getProducts = async () => {
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
    <div>
      <NavMenu />
      <h1 className="text-2xl uppercase mb-10">Products</h1>

      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>Product Description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.categoryId}</p>
            </CardContent>
            <CardFooter>
              <Link className="w-full" to={`/product/${product.id}`}>
                <Button className="w-full">Show Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}
