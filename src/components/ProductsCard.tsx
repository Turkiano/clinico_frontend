import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { Button } from "@/components/ui/button"

import api, { Category, Product } from "@/types"
import { GlobalContext } from "@/App"
import { Link } from "react-router-dom"
import { ChangeEvent, useContext, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

type ProductCardProps = {
  data: Product[]
  category: Category[]
  setFilter: React.Dispatch<React.SetStateAction<string>>
  handleGetAllProducts: () => void
}

export function ProductsCard({
  data,
  category,
  setFilter,
  handleGetAllProducts
}: ProductCardProps) {
  const context = useContext(GlobalContext) //this to conect to the global context
  if (!context) throw Error("Context is missing")
  const { state, handleAddToCart } = context

  const queryClient = useQueryClient()

  // const filterProduct = async () => {
  //   //call
  //   //this is how we get the product data from the database
  //   try {
  //     // console.log(search)
  //     const res = await api.get(`products?limit=5&page=1&search=${filter}`)
  //     return res.data
  //   } catch (error) {
  //     // console.error(error)
  //     return Promise.reject(new Error("Something went wrong"))
  //   }
  // }

  const handleFilterCategory = async (id: string) => {
    // if (id) {
    //   setFilter(id)
    //   await queryClient.invalidateQueries({ queryKey: ["products"] })
    // } else {
    //   setFilter("")
    //   await queryClient.invalidateQueries({ queryKey: ["products"] })
    // }
    await setFilter(id)
    await queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  return (
    <div>
      {/* <h3>Cart ({state.cart.length})</h3> */}
      <h1 className="text-2xl uppercase mb-1">Our Doctors</h1>
      <p className="mb-10 col-gray">More than 20 years of experience in their field</p>

      <div className="flex justify-center items-center mx auto w-full">
        <div className="flex justify-between w-auto mb-5">
          <Button
            variant="link"
            onClick={() => {
              handleGetAllProducts()
            }}
          >
            {" "}
            All
          </Button>
          {category.map((item) => {
            return (
              <Button
                key={item.id}
                variant="link"
                onClick={() => {
                  handleFilterCategory(item.id)
                }}
              >
                {item.name}
              </Button>
            )
          })}
        </div>
      </div>

      <section className="flex flex-col md:flex-row gap-4 justify-between mx-auto mb-5 w-screen overflow-x-scroll ">
        <div className="flex flex-col md:flex-row gap-4 justify-between mx-auto mb-5  overflow-x-scroll  w-[75%]">
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
                  <Button className="w-80%" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
