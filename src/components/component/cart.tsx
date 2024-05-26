import { GlobalContext } from "@/App"
import { useContext } from "react"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


export function Cart() {
  const context = useContext(GlobalContext) //consume from the Global State

  if (!context) throw Error("Context is missing")
  const { state, handleDeleteFromCart } = context

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div>
          {state.cart.length === 0 && <p>No items</p>}
          {state.cart.map((product) => {
            return (
              <div className="mb-5 flex  items-center justify-center" key={product.id}>
                <img
                  src={product.image}
                  alt={product.image}
                  className="w-10 h-10 object-contain mr-5"
                />
                <span>{product.name}</span>
                <span className="ml-3 font-bold">SAR {product.price}</span>
                <span className="ml-5"> Q:{product.quntity}</span>
                <Button
                  variant="destructive"
                  className="p-2 ml-5"
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  X
                </Button>
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
