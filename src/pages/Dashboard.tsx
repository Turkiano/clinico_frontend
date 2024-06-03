import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Product, User } from "@/types"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { NavBar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { EditDialog } from "@/components/component/editDialog"
import { DashboardTabs } from "@/components/component/DashboardTabs"
import { ProductCreateForm } from "@/components/component/product-create-form"

export function Dashboard() {
  const queryClient = useQueryClient()

  const getProducts = async () => {
    //this is how to get the products from the database
    try {
      const res = await api.get("/products") //this is the get request 
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const getUsers = async () => {
    //this is how to get the Users from the database

    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", { //this is the get request using the api
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

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

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const handleDeleteProduct = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` //this is to give access to admin with token sent to the back-end
        }
      })
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

  // console.log(products)

  return (
    <>
      <NavBar />
      <DashboardTabs />

      <div>
        <ProductCreateForm />
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
                <TableCell>
                  <EditDialog product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
