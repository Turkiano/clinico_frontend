import { Input } from "@/components/ui/input"

export function Login() {
  return (
    <div>
      <h1>Login Page</h1>

      <form>
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="name"
        //   onChange={handelChange}
        />
      </form>
    </div>
  )
}
