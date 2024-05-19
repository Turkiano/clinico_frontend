import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"



export function Login() {

  const handelChange = () => {
    return
  }
  
  return (

    
    <div>
      <h1>Login Page</h1>

      <form className="w-full mx-auto  md: w-1/3 ">
        <Input
          name="name"
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
          <Button className="mt-4">Login</Button>
          <Button variant="link" className="mt-4 ghost">
            <Link to="/SignUp">Create new account</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
