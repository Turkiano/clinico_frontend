import { GlobalContext } from "@/App"
import { useContext } from "react"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Cart() {
  const context = useContext(GlobalContext) //consume from the Global State

  if (!context) throw Error("Context is missing")
  const { state, handleDeleteFromCart, handleAddToCart } = context
  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id //groupuing object by id in cart
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {})

  let total = 0
  state.cart.forEach((item) => {
    total += item.price
  })

  // console.log("groups", groups)

  // const keys = Object.entries(groups)
  // console.log("keys", keys)

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
            // console.log("product", product)

            return (
              <div className="mb-5 flex  items-center justify-center" key={product.id}>
                <img
                  src={product.image}
                  alt={product.image}
                  className="w-10 h-10 object-contain mr-5"
                />
                <span>{product.name}</span>
                <span className="ml-3 font-bold">SAR {product.price}</span>
                <Button
                  variant="outline"
                  className="p-2 ml-5"
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  -
                </Button>
                <span className="ml-5"> F: ({products.length})</span>
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
      </SheetContent>
    </Sheet>
  )
}
