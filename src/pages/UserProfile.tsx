import api from "@/api"
import { NavBar } from "@/components/ui/navbar"
import { User } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

// users/profile/:id

export function UserProfile() {
  const { email } = useParams() //to target userId
  console.log("params email", email)

  const getUser = async () => {
    //call
    //this is how we get  users data from the database
    try {
      const token = localStorage.getItem("token") //this to save the token in the sotrage when user login

      const res = await api.get(`/users/${email}`, {
        //we are targeting user email to find users
        headers: {
          Authorization: `Bearer ${token}` //this is to send the token to the back-end
        }
      }) //this to target userId
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: userData,
    error,
    isLoading
  } = useQuery<User>({
    //over writting an object name to userData
    queryKey: ["users"], //this must be unique
    queryFn: getUser
  })

  // console.log("user's info:", userData)
  // this to make sure if there is data coming from userData

  if (isLoading) {
    return <p> Loading . . .</p>
  }
  if (!userData) {
    return <p>user not found . . .</p>
  }
  return (
    <>
      <NavBar />
      <h1>{userData.firstName}</h1>
    </>
  )
}
