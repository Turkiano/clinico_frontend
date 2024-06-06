import { GlobalContext } from "@/App"
import { useContext } from "react"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Product } from "@/types"
import api from "@/api"

type OrderItem = {
  productId: string
  quantity: number
}

type OrderCheckout = {
  items: OrderItem[]
}

export function Cart() {
  const context = useContext(GlobalContext) //consume from the Global State

  if (!context) throw Error("Context is missing")
  const { state, handleDeleteFromCart, handleAddToCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id //groupuing object by id in cart
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [productId: string]: Product[] })

  console.log("test groups:", groups)

  const total = state.cart.reduce((acc, curr) => {
    //this to get the total items' price in cart
    return acc + curr.price
  }, 0)
  // let total = 0 //this is another way to get the total items' price in cart
  // state.cart.forEach((item) => {
  //   total += item.price
  // })

  // console.log("groups", groups)

  // const keys = Object.entries(groups)
  // console.log("keys", keys)

  const checkoutOrder: OrderCheckout = {
    items: []
  }

  Object.keys(groups).forEach((key) => {
    // this to loop through the data and update the object
    const products = groups[key]
    checkoutOrder.items.push({
      //this to update the data in the items object
      productId: key,
      quantity: products.length
    })
  })

  console.log("test checkout:", checkoutOrder)

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("Order/checkout", checkoutOrder, {
        //2nd argument should be the data (checkoutOrder), since we are using post request
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <span>({Object.keys(groups).length})</span>
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div>
          {state.cart.length === 0 && <p>No items</p>}
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            // console.log("products", products)

            const product = products[0]
            console.log("product", product)
            const total = products.reduce((acc, curr) => {
              //this to get the total items' price in cart
              return acc + curr.price
            }, 0)
            return (
              <div className="mb-5 flex  items-center justify-center" key={product.id}>
                <img
                  src={product.image}
                  alt={product.image}
                  className="w-10 h-10 object-contain mr-5"
                />
                <span>{product.name}</span>
                <span className="ml-3 font-bold">SAR {total}</span>
                <Button
                  variant="outline"
                  className="p-2 ml-5"
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  -
                </Button>
                <span className="ml-5"> ({products.length})</span>
                <Button
                  variant="outline"
                  className="p-2 ml-5"
                  onClick={() => handleAddToCart(product)}
                >
                  +
                </Button>
              </div>
            )
          })}
        </div>
        <p>Total:SAR {total} </p>
        <Button onClick={handleCheckout}>Checkout</Button>
      </SheetContent>
    </Sheet>
  )
}
