import api from "@/api"
import { Category, Product } from "@/types"
import { GlobalContext } from "@/App"
import { ChangeEvent, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { ProductsCard } from "@/components/ProductsCard"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/ui/navbar"
import { Input } from "@/components/ui/input"
import { Hero } from "@/components/component/hero"
import { Footer } from "@/components/ui/footer"

export function Home() {
  const context = useContext(GlobalContext) //consume from the Global State
  if (!context) throw Error("Context is missing")

  const [search, setSearch] = useState<string>("")
  const [filter, setFilter] = useState<string>("")

  const queryClient = useQueryClient() // the library to refresh the data

  const getProducts = async () => {
    //call
    //this is how we get the product data from the database
    try {
      // console.log(search)
      const res = await api.get(`products?limit=5&page=1&search=${search}&filter=${filter}`)
      return res.data
    } catch (error) {
      // console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const getCategories = async () => {
    //call
    //this is how we get the product data from the database
    try {
      // console.log(search)
      const res = await api.get("categories")
      return res.data
    } catch (error) {
      // console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const { data: category, error: categoryError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })
  console.log("categories from backend ", category)
  console.log("id of category ", filter)
  console.log("products when category filtered ", data)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["products"] })
    // when click search button, will refresh the lateste data based on the keywrod
  }
  const handleGetAllProducts = async () => {
    setFilter("")
    await queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  if (!data) {
    return <h1>Products list is loading</h1>
  }
  if (!category) {
    return <h1>Category is loading</h1>
  }
  return (
    <>
      <NavBar />

      <div className="overflow-hidden">
        <Hero />

        {/* this form for searh bar */}
        <form onSubmit={handleSearch} className="w-1/2 mx-auto m-10 flex">
          <Input type="search" placeholder="Search by Name" onChange={handleChange} />
          <Button className="mx-4" type="submit">
            Search
          </Button>
        </form>
        {/* this form for searh bar */}

        <ProductsCard
          data={data}
          category={category}
          setFilter={setFilter}
          handleGetAllProducts={handleGetAllProducts}
        />
      </div>

      <Footer />
    </>
  )
}
