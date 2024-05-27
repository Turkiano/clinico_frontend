import api from "@/api"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Table } from "lucide-react"
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"

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

    return (
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Product</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Product</CardTitle>
              <CardDescription>asdfasdf</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>adasdfad </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Yes Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    )
  }
}
