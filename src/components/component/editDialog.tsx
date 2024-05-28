import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function EditDialog({ product }: { product: Product }) {
  const queryClient = useQueryClient()
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const updateProduct = async () => {
    //this is how to get the products from the database
    try {
      const token = localStorage.getItem("token")
      const res = await api.patch(`/products/${updatedProduct.id}`, updatedProduct,  {
        headers: {
          Authorization: `Bearer ${token}`
    }})
      
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setUpdatedProduct({
      ...updatedProduct,
      name: value
    })
    // console.log(value )
  }

  const handleUpdate = async (e) => {
    e.preventDfault()
    await updateProduct
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onClick={handleUpdate}>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue={updatedProduct.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productPrice" className="text-right">
              Price
            </Label>
            <Input
              id="productPrice"
              defaultValue={updatedProduct.price}
              className="col-span-3"
              onChange={handleChange}
              />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" >
            Save changes
          </Button>
        </DialogFooter>
              </form>
      </DialogContent>
    </Dialog>
  )
}
