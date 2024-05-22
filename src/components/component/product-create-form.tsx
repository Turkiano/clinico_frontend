import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import api from "@/api"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { Product } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

import { useState } from "react"

export function ProductCreateForm() {
  const queryClient = new QueryClient()

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    categoryId: "",
    image: "",
    quntity: 0,
    description: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log({ name, value })
    setProduct({ ...product, [name]: value })
  }
  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
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
    <Card className="m-20 w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
        <CardDescription>Add a new product to your inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handelSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input name="name" id="name" placeholder="Enter product name" onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              id="price"
              placeholder="Enter price"
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">CategoryId</Label>
            <Input
              name="categoryId"
              id="category"
              placeholder="Enter Category Id"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              name="image"
              id="image"
              placeholder="Paste the image"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Quantity</Label>
            <Input
              name="quntity"
              id="quntity"
              placeholder="Enter the quntity"
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Description</Label>
            <Input
              name="description"
              id="description"
              placeholder="Enter the description"
              type="text"
              onChange={handleChange}
            />
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select id="category">
              <SelectTrigger>
                <SelectValue
                  placeholder="Select category"
                  name="categoryId"
                  onChange={handleChange}
                />
              </SelectTrigger>
              <SelectContent>
                {data?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          <Button className="w-1/5 mx-auto " type="submit">
            Create Product
          </Button>
          <Button className="w-1/5 mx-auto" type="reset">
            Reset
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
