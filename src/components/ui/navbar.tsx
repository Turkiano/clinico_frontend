import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@radix-ui/react-navigation-menu"
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
    <div className="flex justify-between mx auto">
      <div className="">
        <h3>Logo</h3>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-5 mr-5">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to=" ">
              <NavigationMenuLink>About us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {state.user?.role === Role.Admin && ( //this to hide the page from users
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink>Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {!state.user && (
            <NavigationMenuItem>
              <Link to="/SignUp">
                <NavigationMenuLink>Sign Up</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {/* <Link to="/SignUp"> */}
          {!state.user && (
            <NavigationMenuItem>
              <Link to="/Login">
                <NavigationMenuLink>Login</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      {/* this to add the cart as an icon */}
      <Cart />
      {/* this to add the cart as an icon */}

      <NavigationMenu>
        <NavigationMenuList className="flex gap-5 mr-5">
          {state.user && (
            <NavigationMenuItem>
              <Link to={`/users/profile/${state.user.emailaddress}/`}>
                <Button variant="outline">
                  <UserRoundIcon />
                </Button>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
