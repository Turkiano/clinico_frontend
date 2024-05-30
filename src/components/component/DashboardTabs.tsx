import api from "@/api"
import { Order, Product, User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getTokenFromStorage } from "@/lib/utils"

export function DashboardTabs() {
  const queryClient = useQueryClient()

  const getProducts = async () => {
    //this is how to get the products from the database
    try {
      const res = await api.get("/products")
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
      const res = await api.get("/users", {
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

  const getOrders = async () => {
    //this is how to get the products from the database
    try {
      const res = await api.get("/orders")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data: products, error } = useQuery<Product[]>({
    // to get products using the query
    queryKey: ["products"],
    queryFn: getProducts
  })

  const { data: users, error: uerError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  const { data: orders, error: orderError } = useQuery<Order[]>({
    // to get products using the query
    queryKey: ["orders"],
    queryFn: getOrders
  })

  const handleDeleteProduct = async (id: string) => {
    const token = getTokenFromStorage()
    console.log("token ", token)
    try {
      const res = await api.delete(`/products/${id}`, {
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

  //     queryClient.invalidateQueries({ queryKey: ["products"] }) to reresh refetch  the latest data after delete

  const deleteProduct = async (id: string) => {
    // console.log("id", id)
    await handleDeleteProduct(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      {/* Products starts here  */}
      <TabsContent value="products">
        <Card>
          <CardHeader>
            <CardTitle>Product</CardTitle>
            <CardDescription>A list of your recent Products.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] text-center">Id</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Category Id</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((product) => (
                    <TableRow key={product.id} className="w-[100px]">
                      <TableCell className="font-center">{product.id}</TableCell>
                      <TableCell className="text-center">{product.name}</TableCell>
                      <TableCell className="text-center">{product.categoryId}</TableCell>
                      <TableCell className="text-center">{product.price}</TableCell>
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
          </CardContent>
        </Card>
      </TabsContent>
      {/* Products ends here  */}
      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>A list of your recent Products.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full text-center">Id</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Category Id</TableHead>
                    <TableHead className="text-center">Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {products?.map((product) => */}
                  {users?.map((user) => (
                    <TableRow key={user.id} className="w-[100px]">
                      <TableCell className="font-center">{user.id}</TableCell>
                      <TableCell className="text-center">{user.firstName}</TableCell>
                      <TableCell className="text-center">{user.role}</TableCell>
                      <TableCell className="text-center">{user.email}</TableCell>
                      <TableCell>
                        {/* <Button onClick={() => deleteProduct(product.id)}>Delete</Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      {/* Products starts here  */}
      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>A list of recent orders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] text-center">Id</TableHead>
                    <TableHead className="text-center">User Id</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">order Item</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow key={order.id} className="w-[100px]">
                      <TableCell className="font-center">{order.id}</TableCell>
                      <TableCell className="text-center">{order.userId}</TableCell>
                      <TableCell className="text-center">{order.date}</TableCell>
                      <TableCell className="text-center">{order.orderItem}</TableCell>

                      <TableCell>
                        <Button>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      {/* Products ends here  */}
    </Tabs>
  )
}
