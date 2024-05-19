import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Value } from "@radix-ui/react-select"
import { ChangeEvent, FormEvent, useState } from "react"

const handelChange = () => {
  return
}

export function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handelSignUp = async () => {
    //this is how we get the product data from the database
    try {
      console.log(setUser)
      const res = await api.post(`users/singup`, user)
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
    e.preventDefault()
    await handelSignUp()
  }

  return (
    <div>
      <h1>Sign Up Page</h1>

      <form className="w-full mx-auto  md: w-1/3 ">
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
          <Button className="mt-4">Signup</Button>
        </div>
      </form>
    </div>
  )
}
