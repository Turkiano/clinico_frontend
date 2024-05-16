import { createBrowserRouter, RouterProvider } from "react-router-dom"

import NavMenu from "./components/NavMenu"
import { Home } from "./pages/Home"
import "./App.css"
import ProductDetail from "./pages/ProductDetail"
import { Dashboard } from "./pages/Dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/product/:productId", // this is the ProductDetails path
    element: <ProductDetail />
  },

  {
    path: "/dashboard", // this is the dashboard path
    element: <Dashboard />
  }
]) //this is the router function

type GlobalContextType = {
  state: GlobalState
  handelAddToCart: (product: Product) => void
}

type GlobalState = {
  cart: Product[]
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })
  const handelAddToCart = (product: Product) => {
    setState({
      ...state,
      cart: [...state.cart, product]
    })
    console.log(state.cart)
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handelAddToCart }}>
        <RouterProvider router={router} /> {/* //this is to invok the router function */}
      </GlobalContext.Provider>
    </div>
  )
}

export default App
