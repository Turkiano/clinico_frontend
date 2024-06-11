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
import { CalendarCheck, MoreHorizontal } from "lucide-react"

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

      <section className="flex flex-col md:flex-row gap-4 justify-between mx-auto mb-5 w-screen  ">
        <div className="flex flex-col md:flex-row gap-4 justify-center mx-auto mb-5   w-[75%]">
          {data?.map((product) => (
            <Card key={product.id} className="w-[350px] p-0 overflow-hidden relative">
              <img src={product.image} className="mb-4  object-contain w-full" />
              <div className=" absolute z-10 top-[77%] bg-white w-full">
                <CardHeader className="p-0 pt-6">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p>SAR {product.price}</p>
                </CardContent>

                <Link className="w-full absolute -top-5 left-0" to={`/product/${product.id}`}>
                  <Button className=" aspect-square p-0 bg-[#17a2b8] rounded-full">
                    <CalendarCheck />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
