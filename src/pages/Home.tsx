import api from "@/api"
import { Product } from "@/types"
import { GlobalContext } from "@/App"
import { ChangeEvent, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { ProductsCard } from "@/components/ProductsCard"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/ui/navbar"
import { Input } from "@/components/ui/input"
import { MainNavBar } from "@/components/ui/mainNavBar"

export function Home() {
  const context = useContext(GlobalContext) //consume from the Global State
  if (!context) throw Error("Context is missing")

  const [search, setSearch] = useState<string>("")

  const queryClient = useQueryClient() // the library to refresh the data

  const getProducts = async () => {
    //call
    //this is how we get the product data from the database
    try {
      console.log(search)
      const res = await api.get(`products?limit=5&page=1&search=${search}`)
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // console.log("search value when user is typing ", search)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("search button click")
    queryClient.invalidateQueries({ queryKey: ["products"] })
    // when click search button, will refresh the lateste data based on the keywrod
  }
  console.log("data ", data)

  return (
    <>
      <div>
        <NavBar />
        <MainNavBar />
        {/* <NavMenu /> */}

        {/* this form for searh bar */}
        <form onSubmit={handleSearch} className="w-1/2 mx-auto m-10 flex">
          <Input type="search" placeholder="Search by Name" onChange={handleChange} />
          <Button className="mx-4" type="submit">
            Search
          </Button>
        </form>
        {/* this form for searh bar */}

        <ProductsCard data={data} />
      </div>
    </>
  )
}
