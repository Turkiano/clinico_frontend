import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function SignUp() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    //this function to listen to the changes
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handelSignUp = async () => {
    //this is how we get the product data from the database
    try {
      // console.log(user)
      const res = await api.post(`/users/signup`, user) // to talk to the back-end using the api-post (matching the swagger Post method)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() //to stop refreshing the page when submiting the form
    const response = await handelSignUp() //to invoke the handelSIgnUp function
    // console.log("response:", response)

    if (response) {
      navigate("/login") //this is to send them to the login page, after signing up
    }
  }

  return (
    <div>
      <h1>Sign Up Page</h1>

      <form className="w-1/2 mx-auto  md: w-1/3 ">
        <Input
          name="firstName"
          className="mt-4"
          type="text"
          placeholder="First name"
          onChange={handelChange}
        />
        <Input
          name="lastName"
          className="mt-4"
          type="text"
          placeholder="Last Name"
          onChange={handelChange}
        />

        <Input
          name="email"
          className="mt-4"
          type="Eamil"
          placeholder="Email"
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
          <Button className="mt-4" onClick={handleSubmit}>
            Signup
          </Button>

          <Button variant="link" className="mt-4 ghost">
            <Link to="/Login">I have an account already</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
