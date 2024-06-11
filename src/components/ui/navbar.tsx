import { Link } from "react-router-dom"
import { GlobalContext } from "@/App"
import { useContext } from "react"
import { Role } from "@/types"

import { Cart } from "../component/cart"
import { Button } from "./button"
import { UserRoundIcon } from "lucide-react"

export function NavBar() {
  const context = useContext(GlobalContext) //this to conect to the global context
  if (!context) throw Error("Context is missing")
  const { state } = context //this is to consume the object

  // console.log("This is the global object:", state.user)

  return (
    <div className="flex justify-between items-center mx auto border-b p-3 sticky top-0 left-0 bg-background z-50">
      <div className="">
        <h3>Logo</h3>
      </div>

      <div className={`w-1/5 flex justify-around ${state.user?.role !== Role.Admin && "w-36"}`}>
        <Link to="/">Home</Link>

        <Link to=" ">About us</Link>

        {state.user?.role === Role.Admin && ( //this to hide the page from users
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>

      <div className="flex gap-3 items-center ">
        <div className=" w-36 flex justify-around ">
          {" "}
          {!state.user && <Link to="/SignUp">Sign Up</Link>}
          {/* <Link to="/SignUp"> */}
          {!state.user && <Link to="/Login">Login</Link>}
        </div>
        {/* this to add the cart as an icon */}
        <Cart />
        {/* this to add the cart as an icon */}

        <div className="flex gap-5 mr-5">
          {state.user && (
            <Link to={`/users/profile/${state.user.emailaddress}/`}>
              <Button variant="outline">
                <UserRoundIcon />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
