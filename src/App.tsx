import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import "./App.css"

import { Home } from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import { Dashboard } from "./pages/Dashboard"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { WithAuth } from "./components/component/WithAuth"
import { UserProfile } from "./pages/UserProfile"
import UsersDashboard from "./pages/UsersDashboard"

const router = createBrowserRouter([
  //this is the router function
  {
    path: "/", // this is the Home page path
    element: <Home />
  },
  {
    path: "/SignUp", // this is the sign up path
    element: <SignUp />
  },
  {
    path: "/Login", // this is the login path
    element: <Login />
  },

  {
    path: "/users/profile/:email/", // this is the user's profile path
    element: <UserProfile />
  },

  {
    path: "/product/:productId", // this is the ProductDetails path
    element: <ProductDetail />
  },

  {
    path: "/dashboard", // this is the dashboard path
    element: (
      <WithAuth>
        <Dashboard />
      </WithAuth>
    )
  },

  {
    path: "/dashboard/users",
    element: <UsersDashboard />
  }
])

type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleStoreUser: (user: DecodedUser) => void
  handleDeleteFromCart: (id: string) => void
}

type GlobalState = {
  //here to choose what to sotre (data type)
  cart: Product[]
  user: DecodedUser | null //store the entire users, or use the {decodedUser}
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  //here we can listen and record data
  const [state, setState] = useState<GlobalState>({
    cart: [], //listening to cart (product)
    user: null // we can make it null, since we set it at the data type to null
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return

    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleDeleteFromCart = (id: string) => {
    const filteredCart = state.cart.filter((item) => item.id !== id)

    setState({
      ...state,
      cart: filteredCart //this is the update product list (after deleting)
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }

  // console.log(state.cart) //this to count the array inside the cart s

  return (
    <div className="App">
      <GlobalContext.Provider
        value={{ state, handleAddToCart, handleStoreUser, handleDeleteFromCart }}
      >
        <RouterProvider router={router} /> {/* //this is to invok the router function */}
      </GlobalContext.Provider>
    </div>
  )
}

export default App
