import { createBrowserRouter, RouterProvider } from "react-router-dom"

import NavMenu from "./components/NavMenu"
import { Home } from "./pages/Home"
import "./App.css"
import ProductDetail from "./pages/ProductDetail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/product/:productId", // this is the ProductDetails path
    element: <ProductDetail />
  }
]) //this is the router function

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} /> {/* //this is to invok the router function */}
      {/* <h1>Product Details</h1> */}
      {/* <ProductDetail></ProductDetail> */}
    </div>
  )
}

export default App
