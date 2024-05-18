import api from "@/api"
import { ProductsCard } from "@/components/ProductsCard"
import { ProductCreateForm } from "@/components/component/product-create-form"
import { Product } from "@/types"
import { QueryClient, useQuery } from "@tanstack/react-query"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Dashboard() {
  const queryClient = new QueryClient()

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
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  //     queryClient.invalidateQueries({ queryKey: ["products"] }) to reresh refetch  the latest data after delete

  const deleteProduct = async (id: string) => {
    console.log("id", id)
    await handleDeleteProduct(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  console.log(products)

  return (
    <>
      <div>
        <ProductCreateForm />
        {/* <ProductsCard /> */}
      </div>
      <div>
        <CardTitle>Product list</CardTitle>

        <Table>
          <TableCaption>A list of your recent Products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] text-center">Id</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Category Id</TableHead>
              <TableHead className="text-left">Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id} className="w-[100px]">
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell className="text-center">{product.name}</TableCell>
                <TableCell className="text-center">{product.categoryId}</TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "80px", height: "50px" }}
                  />
                </TableCell>
                <TableCell className="text-right">{product.quntity}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
