import api from "@/api"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import NavMenu from "@/components/NavMenu"

export default function ProductDetail() {
  const params = useParams()

  const getProduct = async () => {
    try {
      if (params.productId) {
        const res = await api.get(`/products/${params.productId}`) //adjust the end-point
        return res.data
      }
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error, isLoading } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })
  // console.log(data)
  // console.log(error)

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Product not found</p>
  }
  if (!data) {
    return <p>No data</p>
  }

  return (
    <div>
      <NavMenu />
      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
        <div className="w-full md:w-1/2">
          <img
            alt="Product Image"
            className="w-full h-auto rounded-lg shadow-md"
            height={600}
            src={data.image}
            style={{
              aspectRatio: "800/600",
              objectFit: "cover"
            }}
            width={800}
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-2xl font-medium text-gray-700">$49.99</p>
          <p className="text-gray-600">
            This is a description of the product. It should be informative and engaging to the
            customer.
          </p>
          <Button className="w-full" size="lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
