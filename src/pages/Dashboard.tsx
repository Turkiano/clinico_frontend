import api from "@/api"
import { ProductsCard } from "@/components/ProductsCard"
import { ProductCreateForm } from "@/components/component/product-create-form"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"

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

export function Dashboard() {
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

                <TableCell className="text-right">{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
