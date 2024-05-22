import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GlobalContext } from "@/App"
import jwt from "jwt-decode"
import api from "@/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { reshapeUsher } from "@/lib/utils"

export function Login() {
  const navigate = useNavigate()
  const context = useContext(GlobalContext) //this to conect to the global context
  if (!context) throw Error("Context is missing")
  const { handleStoreUser } = context //this how to consume/use the global context

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  // console.log("user:", user) //this is to test the user object

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const handelLogin = async () => {
    //this is how we get the product data from the database
    try {
      console.log(user)
      const res = await api.post(`/users/login`, user) // to talk to the back-end using the api-post (matching the swagger Post method)
      return res.data
    } catch (error) {
      // console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() //to stop refreshing the page when submiting the form
    const response = await handelLogin()
    const decodedToken = jwt(response) //this to get the token re-formated
    const user = reshapeUsher(decodedToken) //this is to re-format (user) data

    if (response) {
      localStorage.setItem("token", response) //this to store the (Token) key and value
      localStorage.setItem("user", JSON.stringify(user)) //this to store the (user) key and value

      handleStoreUser(user)

      navigate("/") //this is to send them to the defualt/Home page
    }
    // console.log("collecting the token:", response)
  }

  return (
    <div>
      <h1>Login Page</h1>

      <form action="post" onSubmit={handleSubmit} className="w-1/2 mx-auto  md: w-1/3 ">
        <Input
          name="email"
          className="mt-4"
          type="text"
          placeholder="name"
          onChange={handelChange}
        />

        <Input
          name="password"
          className="mt-4"
          type="text"
          placeholder="Password"
          onChange={handelChange}
        />
        <div className="flex justify-between flex-col">
          <Button type="submit" className="mt-4">
            <Link to="/Home"></Link>
            Login
          </Button>
          <Button variant="link" className="mt-4 ghost">
            <Link to="/SignUp">Create new account</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
